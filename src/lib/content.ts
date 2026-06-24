import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { wordpressSource } from "./wordpress";

export type Author = {
  name: string;
  role: string;
  avatar?: string;
};

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  tableOfContents: TableOfContentsItem[];
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  coverImage: string;
  featured?: boolean;
};

export type TableOfContentsItem = {
  id: string;
  title: string;
};

export interface ContentSource {
  getAllPosts(): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | null>;
  getPostsByCategory(slug: string): Promise<Post[]>;
  getFeaturedPost(): Promise<Post | null>;
}

const postsDirectory = path.join(process.cwd(), "src/content/posts");

const categories: Category[] = [
  {
    slug: "pierwsze-kroki",
    name: "Pierwsze kroki",
    description:
      "Przewodniki dla osób, które chcą zacząć wolontariat spokojnie i bez zgadywania.",
  },
  {
    slug: "rodzaje-wolontariatu",
    name: "Rodzaje wolontariatu",
    description:
      "Opis różnych form pomagania, od szkoły i hospicjum po wyjazdy i działania kryzysowe.",
  },
  {
    slug: "prawo-i-formalnosci",
    name: "Prawo i formalności",
    description:
      "Najważniejsze zasady, porozumienia i obowiązki opisane prostym językiem.",
  },
  {
    slug: "dla-organizacji",
    name: "Dla organizacji",
    description:
      "Poradniki dla koordynatorów, fundacji, stowarzyszeń i instytucji pracujących z wolontariuszami.",
  },
];

type FrontMatter = {
  title: string;
  excerpt: string;
  category: string;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  coverImage: string;
  featured?: boolean;
};

function getCategoryOrThrow(slug: string): Category {
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    throw new Error(`Unknown category slug: ${slug}`);
  }

  return category;
}

function estimateReadingMinutes(markdown: string): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function slugifyHeading(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function renderMarkdown(markdown: string): {
  contentHtml: string;
  tableOfContents: TableOfContentsItem[];
} {
  const tableOfContents: TableOfContentsItem[] = [];
  const usedIds = new Map<string, number>();
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const title = this.parser.parseInline(tokens);

    if (depth !== 2) {
      return `<h${depth}>${title}</h${depth}>\n`;
    }

    const plainTitle = this.parser.parseInline(tokens, this.parser.textRenderer);
    const baseId = slugifyHeading(plainTitle) || "sekcja";
    const count = usedIds.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    usedIds.set(baseId, count + 1);
    tableOfContents.push({ id, title: plainTitle });

    return `<h2 id="${id}">${title}</h2>\n`;
  };

  return {
    contentHtml: marked.parse(markdown, { async: false, renderer }) as string,
    tableOfContents,
  };
}

function readPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, filename);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const frontMatter = data as FrontMatter;
  const { contentHtml, tableOfContents } = renderMarkdown(content);

  return {
    slug,
    title: frontMatter.title,
    excerpt: frontMatter.excerpt,
    contentHtml,
    tableOfContents,
    category: getCategoryOrThrow(frontMatter.category),
    author: frontMatter.author,
    publishedAt: frontMatter.publishedAt,
    updatedAt: frontMatter.updatedAt,
    readingMinutes: estimateReadingMinutes(content),
    coverImage: frontMatter.coverImage,
    featured: frontMatter.featured,
  };
}

function sortByDateDesc(posts: Post[]): Post[] {
  return [...posts].sort(
    (first, second) =>
      new Date(second.publishedAt).getTime() -
      new Date(first.publishedAt).getTime(),
  );
}

export const mockSource: ContentSource = {
  async getAllPosts() {
    const files = fs
      .readdirSync(postsDirectory)
      .filter((filename) => filename.endsWith(".md"));

    return sortByDateDesc(files.map(readPost));
  },

  async getPostBySlug(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    return readPost(`${slug}.md`);
  },

  async getCategories() {
    return categories;
  },

  async getCategory(slug: string) {
    return categories.find((category) => category.slug === slug) ?? null;
  },

  async getPostsByCategory(slug: string) {
    const posts = await this.getAllPosts();
    return posts.filter((post) => post.category.slug === slug);
  },

  async getFeaturedPost() {
    const posts = await this.getAllPosts();
    return posts.find((post) => post.featured) ?? posts[0] ?? null;
  },
};

// Zrodlo tresci wybierane przez env:
//   CONTENT_SOURCE=wp  -> headless WordPress (WPGraphQL)
//   inaczej            -> lokalne pliki .md (mock)
export const content: ContentSource =
  process.env.CONTENT_SOURCE === "wp" ? wordpressSource : mockSource;
