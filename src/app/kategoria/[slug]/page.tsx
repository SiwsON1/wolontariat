import type { Metadata } from "next";
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
    <main className="site-shell py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
            Kategoria
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            {category.name}
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-ink-soft">
          {category.description}
        </p>
      </div>

      <div className="mt-14">
        {lead ? <PostCard post={lead} variant="lead" priority /> : null}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        {rest.map((post, index) => (
          <div key={post.slug} className={index % 2 ? "md:mt-12" : ""}>
            <PostCard post={post} variant={index % 3 === 2 ? "compact" : "standard"} />
          </div>
        ))}
      </div>
    </main>
  );
}
