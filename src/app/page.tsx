import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { content } from "@/lib/content";

export default async function Home() {
  const [posts, categories, featured] = await Promise.all([
    content.getAllPosts(),
    content.getCategories(),
    content.getFeaturedPost(),
  ]);
  const lead = featured ?? posts[0];
  const latest = posts.filter((post) => post.slug !== lead?.slug).slice(0, 5);

  return (
    <>
      <section className="site-shell grid min-h-[100dvh] items-center gap-12 py-16 md:grid-cols-[0.92fr_1.08fr] md:py-24">
        <div>
          <p
            className="reveal mb-5 w-fit rounded-full bg-green-tint px-4 py-2 text-sm font-semibold text-green-deep"
            style={{ animationDelay: "40ms" }}
          >
            Redakcyjny portal o wolontariacie w Polsce
          </p>
          <h1
            className="reveal max-w-3xl font-serif text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink"
            style={{ animationDelay: "95ms" }}
          >
            Pomaganie zaczyna się od konkretnego pierwszego kroku.
          </h1>
          <p
            className="reveal mt-6 max-w-2xl text-lg leading-8 text-ink-soft"
            style={{ animationDelay: "150ms" }}
          >
            Piszemy dla osób, które chcą wejść w wolontariat bez patosu i bez
            zgadywania. Znajdziesz tu ścieżki startu, prawa wolontariusza i
            poradniki dla organizacji.
          </p>
          <div
            className="reveal mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: "205ms" }}
          >
            <Link href="/kategoria/pierwsze-kroki" className="button-primary">
              Zacznij od podstaw
            </Link>
            <Link href="/blog" className="button-secondary">
              Czytaj artykuły
            </Link>
          </div>
        </div>
        <div className="relative min-h-[520px] reveal" style={{ animationDelay: "95ms" }}>
          <div className="absolute right-0 top-2 h-[68%] w-[78%] overflow-hidden rounded-[8px] bg-paper-sunken shadow-[var(--shadow-soft)]">
            <Image
              src="https://picsum.photos/seed/wolontariat-hero/1200/800"
              alt=""
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              priority
              className="warm-cover"
            />
          </div>
          <div className="absolute bottom-8 left-0 h-[42%] w-[54%] overflow-hidden rounded-[8px] border-8 border-paper bg-paper-sunken shadow-[var(--shadow-soft)]">
            <Image
              src="https://picsum.photos/seed/wolontariat-ludzie/900/700"
              alt=""
              fill
              sizes="(min-width: 768px) 28vw, 80vw"
              className="warm-cover"
            />
          </div>
          <div className="absolute bottom-0 right-8 max-w-[18rem] rounded-[8px] bg-green-deep p-5 text-paper shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/62">
              Misja
            </p>
            <p className="mt-2 font-serif text-2xl leading-tight">
              Mniej haseł, więcej jasnych decyzji.
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell pb-20 md:pb-24">
        <div className="border-y border-line py-5">
          <p className="max-w-4xl text-sm leading-6 text-ink-soft">
            Portal ma charakter redakcyjny i opiera opracowania formalne na
            ustawie o działalności pożytku publicznego i o wolontariacie.{" "}
            <Link href="/o-nas" className="text-clay-deep underline underline-offset-[3px]">
              Zobacz, jak pracujemy.
            </Link>
          </p>
        </div>
      </section>

      <section className="site-shell py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-label">
              Od czego zacznij
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Wybierz ścieżkę, która pasuje do twojej sytuacji.
            </h2>
          </div>
          <div className="grid gap-7 md:gap-8">
            {[
              {
                index: "01",
                title: "Młodzież",
                text: "Zacznij od szkoły, lokalnej organizacji albo krótkiej akcji. Sprawdź, kto będzie opiekunem i czego oczekuje.",
                href: "/kategoria/rodzaje-wolontariatu",
                accent: "text-clay",
              },
              {
                index: "02",
                title: "Dorośli",
                text: "Wybierz obszar, w którym umiesz być regularnie. Dwie godziny w tygodniu bywają bardziej pomocne niż jednorazowy zryw.",
                href: "/kategoria/pierwsze-kroki",
                accent: "text-green",
              },
              {
                index: "03",
                title: "Seniorzy",
                text: "Wolontariat może być spokojny, lokalny i dopasowany do zdrowia. Najpierw porozmawiaj z koordynatorem o rytmie pracy.",
                href: "/kategoria/rodzaje-wolontariatu",
                accent: "text-clay",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                className={`reveal border-t border-line pt-6 ${
                  index === 1 ? "md:ml-16" : index === 2 ? "md:ml-8" : "md:mr-12"
                }`}
                style={{ animationDelay: `${140 + index * 55}ms` }}
              >
                <div className="grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-start">
                  <p
                    className={`font-serif text-[clamp(4.5rem,10vw,7.25rem)] font-semibold leading-none tracking-[-0.035em] ${item.accent}`}
                    aria-hidden="true"
                  >
                    {item.index}
                  </p>
                  <div className="pt-1 sm:pt-4">
                    <h3 className="font-serif text-3xl font-semibold leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-7 text-ink-soft">{item.text}</p>
                    <Link href={item.href} className="micro-link mt-5">
                      <span>Zobacz, jak zacząć</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        className="h-4 w-4"
                        fill="none"
                      >
                        <path
                          d="M3 8h9m0 0L8.5 4.5M12 8l-3.5 3.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-20 md:py-24">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">
              Najnowsze teksty
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Przewodniki bez nadęcia.
            </h2>
          </div>
          <Link href="/blog" className="button-secondary w-fit">
            Wszystkie artykuły
          </Link>
        </div>
        {lead ? (
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="reveal" style={{ animationDelay: "80ms" }}>
              <PostCard post={lead} variant="lead" priority />
            </div>
            <div className="grid content-start gap-7">
              {latest.slice(0, 3).map((post, index) => (
                <div
                  key={post.slug}
                  className="reveal"
                  style={{ animationDelay: `${135 + index * 55}ms` }}
                >
                  <PostCard post={post} variant="compact" />
                </div>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-10 grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          {latest.slice(3, 5).map((post, index) => (
            <div
              key={post.slug}
              className="reveal"
              style={{ animationDelay: `${300 + index * 55}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell py-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="section-label">
              Kategorie
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em]">
              Czytaj według potrzeby.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                href={`/kategoria/${category.slug}`}
                className={`editorial-card rounded-[8px] border border-line bg-paper-raised p-6 ${
                  index === 1 ? "md:mt-10" : index === 2 ? "md:-mt-2" : ""
                }`}
              >
                <h3 className="font-serif text-2xl font-semibold">{category.name}</h3>
                <p className="mt-3 leading-7 text-ink-soft">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-20 md:py-24">
        <div className="grid gap-8 rounded-[8px] bg-clay-tint p-8 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <h2 className="font-serif text-4xl font-semibold tracking-[-0.02em]">
              Chcesz zacząć od jednego dobrego tekstu?
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-ink-soft">
              Przeczytaj przewodnik startowy i zapisz pytania, które chcesz
              zadać koordynatorowi przed pierwszym dyżurem.
            </p>
          </div>
          <Link href="/blog/jak-zostac-wolontariuszem" className="button-primary w-fit">
            Przewodnik startowy
          </Link>
        </div>
      </section>
    </>
  );
}
