import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { content } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await content.getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await content.getCategory(slug);

  if (!category) {
    return {
      title: "Nie znaleziono kategorii",
    };
  }

  return {
    title: category.name,
    description: category.description,
    alternates: {
      canonical: `/kategoria/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await content.getCategory(slug);

  if (!category) {
    notFound();
  }

  const posts = await content.getPostsByCategory(category.slug);
  const [lead, ...rest] = posts;

  return (
    <main className="site-shell py-12 md:py-20">
      <nav
        aria-label="Ścieżka"
        className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-6 text-ink-faint"
      >
        <Link href="/" className="story-link text-ink-soft">
          Strona główna
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/blog" className="story-link text-ink-soft">
          Blog
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-ink">
          {category.name}
        </span>
      </nav>

      <header className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="section-label">Kategoria</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            {category.name}
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-lg leading-8 text-ink-soft">
            {category.description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/blog" className="button-secondary">
              Zobacz wszystkie artykuły
            </Link>
          </div>
        </div>
      </header>

      <section className="mt-14">
        {lead ? <PostCard post={lead} variant="lead" priority /> : null}
      </section>
      <section className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        {rest.map((post, index) => (
          <div key={post.slug} className={index % 2 ? "md:mt-12" : ""}>
            <PostCard post={post} variant={index % 3 === 2 ? "compact" : "standard"} />
          </div>
        ))}
      </section>

      <section className="mt-16 border-t border-line pt-8">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="section-label">Cały blog</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-ink md:text-4xl">
              Potrzebujesz szerszego przeglądu tematów?
            </h2>
          </div>
          <Link href="/blog" className="button-primary w-fit">
            Przejdź do bloga
          </Link>
        </div>
      </section>
    </main>
  );
}
