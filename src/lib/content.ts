import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

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
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  coverImage: string;
  featured?: boolean;
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

function readPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, filename);
  const file = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(file);
  const frontMatter = data as FrontMatter;
  const contentHtml = marked.parse(content, { async: false }) as string;

  return {
    slug,
    title: frontMatter.title,
    excerpt: frontMatter.excerpt,
    contentHtml,
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

// TODO v-prod: WordPressSource via WPGraphQL implementujacy ten sam interfejs.
export const content: ContentSource = mockSource;
