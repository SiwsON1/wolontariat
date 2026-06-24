import type { Metadata } from "next";
import { PostCard } from "@/components/PostCard";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Artykuły",
  description:
    "Poradniki o wolontariacie, prawach wolontariusza, formach pomocy i pracy koordynatorów.",
};

export default async function BlogPage() {
  const posts = await content.getAllPosts();
  const [lead, second, ...rest] = posts;

  return (
    <main className="site-shell py-16 md:py-20">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
          Artykuły
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
          Biblioteka spokojnych poradników.
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink-soft">
          Zebraliśmy teksty dla osób zaczynających wolontariat, wolontariuszy
          szukających swojej formy pomocy oraz organizacji pracujących z ludźmi.
        </p>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
        {lead ? <PostCard post={lead} variant="lead" priority /> : null}
        {second ? <PostCard post={second} /> : null}
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-[0.85fr_1.15fr] lg:grid-cols-[0.9fr_1.1fr]">
        {rest.map((post, index) => (
          <div key={post.slug} className={index % 3 === 1 ? "lg:mt-12" : ""}>
            <PostCard post={post} variant={index % 3 === 2 ? "compact" : "standard"} />
          </div>
        ))}
      </div>
    </main>
  );
}
