import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/CategoryPill";
import { PostCard } from "@/components/PostCard";
import { Prose } from "@/components/Prose";
import { content } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export async function generateStaticParams() {
  const posts = await content.getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await content.getPostBySlug(slug);

  if (!post) {
    return {
      title: "Nie znaleziono artykułu",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await content.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = (await content.getPostsByCategory(post.category.slug))
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  return (
    <main>
      <header className="site-shell py-14 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <CategoryPill category={post.category} />
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-6 text-xl leading-8 text-ink-soft">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-faint">
              <span>{post.author.name}</span>
              <span>{post.author.role}</span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>{post.readingMinutes} min czytania</span>
            </div>
          </div>
          <div className="image-reveal relative aspect-[16/10] overflow-hidden rounded-[8px] bg-paper-sunken shadow-[var(--shadow-soft)]">
            <Image
              src={post.coverImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </header>

      <div className="site-shell grid gap-12 lg:grid-cols-[minmax(0,68ch)_1fr]">
        <Prose html={post.contentHtml} />
        <aside className="h-fit rounded-[8px] border border-line bg-paper-raised p-6 lg:sticky lg:top-28">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
            Źródła i aktualność
          </p>
          <p className="mt-3 text-sm leading-6 text-ink-soft">
            Teksty prawne traktuj jako redakcyjny punkt startu. Przy decyzjach
            formalnych sprawdź aktualne brzmienie ustawy o działalności pożytku
            publicznego i o wolontariacie oraz oficjalne źródła właściwego
            organu.
          </p>
          {post.updatedAt ? (
            <p className="mt-4 text-sm text-ink-faint">
              Aktualizacja: {formatDate(post.updatedAt)}
            </p>
          ) : null}
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="site-shell py-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
                Powiązane artykuły
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em]">
                Z tej samej kategorii.
              </h2>
            </div>
            <Link href={`/kategoria/${post.category.slug}`} className="button-secondary w-fit">
              Zobacz kategorię
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
            {related.map((item, index) => (
              <PostCard
                key={item.slug}
                post={item}
                variant={index === 2 ? "compact" : "standard"}
              />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
