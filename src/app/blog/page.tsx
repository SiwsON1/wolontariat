import type { Metadata } from "next";
import Link from "next/link";
import { CategoryPill } from "@/components/CategoryPill";
import { PostCard } from "@/components/PostCard";
import { content } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Artykuły o wolontariacie",
    description:
      "Poradniki o wolontariacie, prawach wolontariusza, formach pomocy i pracy koordynatorów.",
    alternates: {
      canonical: "/blog",
    },
  };
}

export default async function BlogPage() {
  const [posts, categories, featured] = await Promise.all([
    content.getAllPosts(),
    content.getCategories(),
    content.getFeaturedPost(),
  ]);
  const lead = featured ?? posts[0];
  const rest = posts.filter((post) => post.slug !== lead?.slug);

  return (
    <main className="site-shell py-14 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-label">Artykuły</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            Biblioteka spokojnych poradników.
          </h1>
        </div>
        <div className="max-w-2xl lg:justify-self-end">
          <p className="text-lg leading-8 text-ink-soft">
            Zebraliśmy teksty dla osób zaczynających wolontariat, wolontariuszy
            szukających swojej formy pomocy oraz organizacji pracujących z ludźmi.
          </p>
          <nav
            aria-label="Kategorie bloga"
            className="mt-7 flex flex-wrap gap-2"
          >
            <Link
              href="/blog"
              aria-current="page"
              className="category-pill bg-clay-tint text-clay-deep"
            >
              Wszystkie
            </Link>
            {categories.map((category) => (
              <CategoryPill key={category.slug} category={category} />
            ))}
          </nav>
        </div>
      </div>

      <section className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        {lead ? <PostCard post={lead} variant="lead" priority /> : null}
        <div className="grid content-start gap-8">
          {rest.slice(0, 2).map((post, index) => (
            <PostCard
              key={post.slug}
              post={post}
              variant={index === 1 ? "compact" : "standard"}
            />
          ))}
        </div>
      </section>
      <section className="mt-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr] lg:grid-cols-[0.9fr_1.1fr]">
        {rest.slice(2).map((post, index) => (
          <div key={post.slug} className={index % 3 === 1 ? "lg:mt-12" : ""}>
            <PostCard post={post} variant={index % 3 === 2 ? "compact" : "standard"} />
          </div>
        ))}
      </section>
    </main>
  );
}
