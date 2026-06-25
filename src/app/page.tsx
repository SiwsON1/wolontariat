import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/PostCard";
import { getAllCities } from "@/lib/cities";
import { content } from "@/lib/content";
import { volunteerTypes } from "@/lib/volunteer-types";

const faqItems = [
  {
    question: "Czy wolontariat jest płatny?",
    answer:
      "Wolontariat jest z definicji dobrowolny i nieodpłatny. Organizacja może pokryć koszty związane z pomocą, na przykład dojazdy czy szkolenia, jeśli tak ustalicie w porozumieniu.",
  },
  {
    question: "Od ilu lat można zostać wolontariuszem?",
    answer:
      "Wolontariuszami mogą być także osoby niepełnoletnie, ale do działania potrzebują zgody rodzica lub opiekuna. Część organizacji ma własne progi wiekowe przy konkretnych zadaniach. Szczegóły ustalisz z koordynatorem.",
  },
  {
    question: "Czy potrzebuję umowy?",
    answer:
      "Przy dłuższej współpracy organizacja powinna zawrzeć z Tobą porozumienie wolontariackie. Określa ono zakres, czas i warunki pomocy. Przy krótkich akcjach często wystarcza zgłoszenie.",
  },
  {
    question: "Czy wolontariat liczy się w CV?",
    answer:
      "Tak. To realne doświadczenie: pokazuje odpowiedzialność, pracę z ludźmi i konkretne umiejętności. W CV opisz, co robiłeś i czego się nauczyłeś, bez koloryzowania.",
  },
  {
    question: "Jak znaleźć wolontariat blisko siebie?",
    answer:
      "Zacznij od organizacji, które działają w Twojej okolicy i w temacie, który Cię interesuje. Napisz albo zadzwoń i zapytaj o aktualne potrzeby. Wkrótce ułatwi to nasza wyszukiwarka organizacji po mieście.",
  },
];

const quickTopics = [
  {
    label: "Kto może zostać wolontariuszem",
    href: "/blog/kto-moze-zostac-wolontariuszem",
  },
  {
    label: "Wolontariat dla młodzieży",
    href: "/blog/wolontariat-szkolny-mlodziez",
  },
  {
    label: "Hospicyjny",
    href: "/blog/wolontariat-hospicyjny",
  },
  {
    label: "Ze zwierzętami",
    href: "/blog/wolontariat-w-schronisku-dla-zwierzat",
  },
  {
    label: "Dla seniorów",
    href: "/blog/wolontariat-seniorow",
  },
  {
    label: "Za granicą",
    href: "/blog/wolontariat-za-granica",
  },
  {
    label: "Prawa wolontariusza",
    href: "/blog/prawa-wolontariusza",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default async function Home() {
  const cities = getAllCities();
  const [posts, categories, featured, home] = await Promise.all([
    content.getAllPosts(),
    content.getCategories(),
    content.getFeaturedPost(),
    content.getHomeContent(),
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
            {home.heroEyebrow}
          </p>
          <h1
            className="reveal max-w-3xl font-serif text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-ink"
            style={{ animationDelay: "95ms" }}
          >
            {home.heroHeadline}
          </h1>
          <p
            className="reveal mt-6 max-w-2xl text-lg leading-8 text-ink-soft"
            style={{ animationDelay: "150ms" }}
          >
            {home.heroLead}
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
              src="/img/vol-group-food.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 52vw, 100vw"
              priority
              className="warm-cover"
            />
          </div>
          <div className="absolute bottom-8 left-0 h-[42%] w-[54%] overflow-hidden rounded-[8px] border-8 border-paper bg-paper-sunken shadow-[var(--shadow-soft)]">
            <Image
              src="/img/vol-embrace.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 28vw, 80vw"
              className="warm-cover"
            />
          </div>
          <div className="absolute bottom-0 right-8 max-w-[18rem] rounded-[8px] bg-green-deep p-5 text-paper shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/62">
              {home.missionLabel}
            </p>
            <p className="mt-2 font-serif text-2xl leading-tight">
              {home.missionText}
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

      <section className="site-shell pb-20 md:pb-24">
        <div className="grid gap-8 md:grid-cols-[0.78fr_1.22fr] md:items-center">
          <div className="reveal">
            <p className="section-label">Czego szukasz?</p>
            <h2 className="mt-3 max-w-xl font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Wejdź od razu w swój temat
            </h2>
          </div>
          <div className="reveal flex flex-col gap-5" style={{ animationDelay: "80ms" }}>
            <div className="flex flex-wrap gap-3">
              {quickTopics.map((topic) => (
                <Link key={topic.href} href={topic.href} className="quick-topic-pill">
                  {topic.label}
                </Link>
              ))}
            </div>
            <Link href="/wolontariat" className="button-primary w-fit">
              Znajdź wolontariat w swoim mieście
            </Link>
          </div>
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
        <div className="grid gap-10 md:grid-cols-[0.74fr_1.26fr]">
          <div className="reveal">
            <p className="section-label">Rodzaje wolontariatu</p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Wybierz obszar, który jest Ci bliski
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {volunteerTypes.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`editorial-card reveal group min-h-[13rem] rounded-[8px] border border-line bg-paper-raised p-6 ${
                  index === 0
                    ? "sm:col-span-2 lg:col-span-3 lg:min-h-[17rem]"
                    : index === 1
                      ? "lg:col-span-3 lg:mt-10"
                      : index === 2
                        ? "lg:col-span-2"
                        : index === 3
                          ? "lg:col-span-2 lg:mt-8"
                          : index === 4
                            ? "lg:col-span-2 lg:-mt-2"
                            : "sm:col-span-2 lg:col-span-6"
                }`}
                style={{ animationDelay: `${90 + index * 45}ms` }}
              >
                <span className="font-serif text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-none tracking-[-0.03em] text-clay">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xl leading-7 text-ink-soft">{item.text}</p>
                <span className="micro-link mt-5">
                  <span>Czytaj artykuł</span>
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
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="reveal grid gap-8 rounded-[8px] border border-line bg-green-tint p-8 md:grid-cols-[0.82fr_1fr_auto] md:items-center md:p-10">
          <div>
            <p className="section-label">Zacznij tutaj</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Nie wiesz, czy możesz?
            </h2>
          </div>
          <p className="max-w-2xl leading-7 text-ink-soft">
            Sprawdź, kto może zostać wolontariuszem i o co zapytać organizację
            przed pierwszym zgłoszeniem.
          </p>
          <Link
            href="/blog/kto-moze-zostac-wolontariuszem"
            className="button-primary w-fit"
          >
            Kto może zostać wolontariuszem
          </Link>
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

      <section className="site-shell py-20 md:py-24">
        <div className="mb-10 grid gap-6 md:grid-cols-[0.78fr_1.22fr] md:items-end">
          <div>
            <p className="section-label">Wolontariat lokalnie</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Wolontariat w Twoim mieście
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-ink-soft">
              Sprawdź lokalne poradniki dla największych miast i zacznij od
              organizacji, które działają blisko Ciebie.
            </p>
            <Link href="/wolontariat" className="micro-link mt-5">
              <span>Zobacz wszystkie</span>
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cities.slice(0, 10).map((city, index) => (
            <Link
              key={city.slug}
              href={`/wolontariat/${city.slug}`}
              className={`editorial-card rounded-[8px] border border-line bg-paper-raised p-5 ${
                index % 5 === 1 || index % 5 === 3 ? "lg:mt-8" : ""
              }`}
            >
              <span className="section-label">{city.region}</span>
              <h3 className="mt-4 font-serif text-2xl font-semibold leading-tight">
                Wolontariat {city.locative}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="site-shell py-20 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div className="reveal">
            <p className="section-label">FAQ</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Najczęstsze pytania
            </h2>
          </div>
          <div className="reveal divide-y divide-line rounded-[8px] border border-line bg-paper-raised">
            {faqItems.map((item) => (
              <details key={item.question} className="group">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 font-serif text-2xl font-semibold leading-tight marker:hidden">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-base text-clay transition-transform duration-200 ease-out group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 leading-7 text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
