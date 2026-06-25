import type {
  Author,
  Category,
  ContentSource,
  HomeContent,
  Post,
  TableOfContentsItem,
} from "./content";
import { DEFAULT_HOME } from "./content";
import { getCover } from "./covers";

// Headless WordPress przez WPGraphQL. Ten sam interfejs co mockSource,
// wiec front nie wie skad bierze tresc. URL sterowany env.
const WP_GRAPHQL_URL =
  process.env.WP_GRAPHQL_URL ?? "http://localhost:8088/graphql";

type WpPost = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  date: string;
  modified: string | null;
  authorName: string | null;
  featuredImage?: { node?: { sourceUrl?: string | null } | null } | null;
  categories?: {
    nodes: { name: string; slug: string; description: string | null }[];
  } | null;
};

async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL HTTP ${res.status}`);
  }

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };

  if (json.errors?.length) {
    throw new Error(`WPGraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  if (!json.data) {
    throw new Error("WPGraphQL: brak danych");
  }

  return json.data;
}

function slugifyHeading(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// WP zwraca h2 bez id. Dodajemy id i budujemy spis tresci (jak w mockSource).
function withHeadingIds(html: string): {
  contentHtml: string;
  tableOfContents: TableOfContentsItem[];
} {
  const tableOfContents: TableOfContentsItem[] = [];
  const used = new Map<string, number>();

  const contentHtml = html.replace(
    /<h2(?:\s[^>]*)?>([\s\S]*?)<\/h2>/g,
    (_match, inner: string) => {
      const title = stripTags(inner);
      const base = slugifyHeading(title) || "sekcja";
      const count = used.get(base) ?? 0;
      const id = count === 0 ? base : `${base}-${count + 1}`;
      used.set(base, count + 1);
      tableOfContents.push({ id, title });
      return `<h2 id="${id}">${inner}</h2>`;
    },
  );

  return { contentHtml, tableOfContents };
}

function readingMinutes(html: string): number {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function toAuthor(node: WpPost): Author {
  return {
    name: node.authorName?.trim() || "Redakcja wolontariat.org.pl",
    role: "Redakcja wolontariat.org.pl",
  };
}

function toCategory(node: WpPost): Category {
  const cat = node.categories?.nodes?.[0];
  return {
    slug: cat?.slug ?? "rodzaje-wolontariatu",
    name: cat?.name ?? "Wolontariat",
    description: cat?.description ?? "",
  };
}

function toPost(node: WpPost, index: number): Post {
  const rawContent = node.content ?? "";
  const { contentHtml, tableOfContents } = withHeadingIds(rawContent);

  return {
    slug: node.slug,
    title: node.title,
    excerpt: stripTags(node.excerpt ?? ""),
    contentHtml,
    tableOfContents,
    category: toCategory(node),
    author: toAuthor(node),
    publishedAt: node.date,
    updatedAt: node.modified ?? undefined,
    readingMinutes: readingMinutes(rawContent),
    coverImage: node.featuredImage?.node?.sourceUrl ?? getCover(node.slug),
    featured: index === 0,
  };
}

const POST_FIELDS = `
  title
  slug
  excerpt
  content
  date
  modified
  authorName
  featuredImage { node { sourceUrl } }
  categories { nodes { name slug description } }
`;

let postsCache: Post[] | null = null;

async function fetchAllPosts(): Promise<Post[]> {
  if (postsCache) return postsCache;

  const data = await gql<{ posts: { nodes: WpPost[] } }>(`
    query AllPosts {
      posts(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
        nodes { ${POST_FIELDS} }
      }
    }
  `);

  postsCache = data.posts.nodes.map(toPost);
  return postsCache;
}

export const wordpressSource: ContentSource = {
  async getAllPosts() {
    return fetchAllPosts();
  },

  async getPostBySlug(slug: string) {
    const posts = await fetchAllPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  },

  async getCategories() {
    const data = await gql<{
      categories: { nodes: { name: string; slug: string; description: string | null }[] };
    }>(`
      query AllCategories {
        categories(first: 50, where: { hideEmpty: true }) {
          nodes { name slug description }
        }
      }
    `);

    return data.categories.nodes.map((node) => ({
      slug: node.slug,
      name: node.name,
      description: node.description ?? "",
    }));
  },

  async getCategory(slug: string) {
    const categories = await this.getCategories();
    return categories.find((category) => category.slug === slug) ?? null;
  },

  async getPostsByCategory(slug: string) {
    const posts = await fetchAllPosts();
    return posts.filter((post) => post.category.slug === slug);
  },

  async getFeaturedPost() {
    const posts = await fetchAllPosts();
    return posts.find((post) => post.featured) ?? posts[0] ?? null;
  },

  async getHomeContent(): Promise<HomeContent> {
    try {
      const data = await gql<{ homeContent: Partial<HomeContent> | null }>(`
        query HomeContent {
          homeContent {
            heroEyebrow
            heroHeadline
            heroLead
            missionLabel
            missionText
          }
        }
      `);
      const h = data.homeContent;
      if (!h) return DEFAULT_HOME;
      return {
        heroEyebrow: h.heroEyebrow || DEFAULT_HOME.heroEyebrow,
        heroHeadline: h.heroHeadline || DEFAULT_HOME.heroHeadline,
        heroLead: h.heroLead || DEFAULT_HOME.heroLead,
        missionLabel: h.missionLabel || DEFAULT_HOME.missionLabel,
        missionText: h.missionText || DEFAULT_HOME.missionText,
      };
    } catch {
      return DEFAULT_HOME;
    }
  },
};
