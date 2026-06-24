import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/PostCard";
import { content } from "@/lib/content";
import { getAllCities, getCity } from "@/lib/cities";
import { volunteerTypes } from "@/lib/volunteer-types";

type PageProps = {
  params: Promise<{ miasto: string }>;
};

const siteUrl = "https://wolontariat.org.pl";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateStaticParams() {
  return getAllCities().map((city) => ({ miasto: city.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { miasto } = await params;
  const city = getCity(miasto);

  if (!city) {
    return {
      title: "Nie znaleziono miasta",
    };
  }

  return {
    title: `Wolontariat ${city.name}`,
    description: `Jak zacząć wolontariat ${city.locative}: od czego zacząć, rodzaje wolontariatu i jak znaleźć organizację blisko siebie.`,
    alternates: {
      canonical: `/wolontariat/${city.slug}`,
    },
  };
}

export default async function CityPage({ params }: PageProps) {
  const { miasto } = await params;
  const city = getCity(miasto);

  if (!city) {
    notFound();
  }

  const [posts, cities] = await Promise.all([
    content.getAllPosts(),
    Promise.resolve(getAllCities()),
  ]);
  const relatedSlugs = [
    "jak-zostac-wolontariuszem",
    "prawa-wolontariusza",
    "wolontariat-a-cv-i-kariera",
    "wolontariat-szkolny-mlodziez",
  ];
  const relatedPosts = relatedSlugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter((post) => post !== undefined);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Wolontariat",
        item: `${siteUrl}/wolontariat`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `${siteUrl}/wolontariat/${city.slug}`,
      },
    ],
  };

  return (
    <main>
      <JsonLdScript data={breadcrumbJsonLd} />
      <header className="site-shell py-12 md:py-20">
        <nav
          aria-label="Ścieżka"
          className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-6 text-ink-faint"
        >
          <Link href="/" className="story-link text-ink-soft">
            Strona główna
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/wolontariat" className="story-link text-ink-soft">
            Wolontariat
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">
            {city.name}
          </span>
        </nav>
        <div className="grid gap-10 md:grid-cols-[0.88fr_1.12fr] md:items-end">
          <div>
            <p className="section-label">Wolontariat lokalnie</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-7xl">
              Wolontariat {city.locative}
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-soft">
            Chcesz pomagać {city.locative}? Zebraliśmy praktyczne wskazówki: od
            czego zacząć, jakie formy wolontariatu wybrać i jak znaleźć
            organizację blisko siebie.
          </p>
        </div>
      </header>

      <section className="site-shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="section-label">Start</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Od czego zacząć
            </h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-ink-soft">
              Zacznij od tematu, który jest Ci bliski, i od formy, na którą
              realnie masz czas. Wolontariat {city.locative} prowadzą fundacje,
              stowarzyszenia, schroniska, hospicja, domy kultury i lokalne
              centra wolontariatu. Skontaktuj się z wybraną organizacją, zapytaj
              o aktualne potrzeby i zasady współpracy. Przy dłuższym
              zaangażowaniu poproś o porozumienie wolontariackie.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kategoria/pierwsze-kroki" className="button-primary">
                Zacznij od podstaw
              </Link>
              <Link href="/blog/prawa-wolontariusza" className="button-secondary">
                Poznaj prawa wolontariusza
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.74fr_1.26fr]">
          <div>
            <p className="section-label">Rodzaje wolontariatu {city.locative}</p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Rodzaje wolontariatu, które znajdziesz {city.locative}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {volunteerTypes.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`editorial-card group min-h-[13rem] rounded-[8px] border border-line bg-paper-raised p-6 ${
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
        <div className="grid gap-8 rounded-[8px] bg-paper-sunken p-8 md:grid-cols-[10rem_1fr_auto] md:items-center md:p-10">
          <div
            aria-hidden="true"
            className="grid h-28 w-28 place-items-center rounded-full bg-green-tint text-green-deep"
          >
            <svg viewBox="0 0 48 48" className="h-14 w-14" fill="none">
              <path
                d="M14 17.5c0-3.6 2.9-6.5 6.5-6.5 1.4 0 2.7.5 3.8 1.2A6.5 6.5 0 0 1 35 17.5c0 8.8-11 15.8-11 15.8S14 26.3 14 17.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M24 16v9M19.5 20.5h9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <p className="section-label">Baza organizacji</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Baza organizacji {city.locative}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-ink-soft">
              Bazę organizacji {city.locative} przygotowujemy. Opieramy ją na
              publicznych, oficjalnych źródłach, żeby dane były wiarygodne i
              aktualne. Prowadzisz organizację albo znasz taką, która szuka
              wolontariuszy {city.locative}? Napisz do nas, dodamy ją do bazy.
            </p>
          </div>
          <Link href="/zglos-organizacje" className="button-primary w-fit">
            Zgłoś organizację
          </Link>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">Powiązane artykuły</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] md:text-5xl">
              Przeczytaj przed pierwszym zgłoszeniem
            </h2>
          </div>
          <Link href="/blog" className="button-secondary w-fit">
            Wszystkie artykuły
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          {relatedPosts.map((post, index) => (
            <div key={post.slug} className={index % 2 ? "md:mt-12" : ""}>
              <PostCard post={post} variant={index === 2 ? "compact" : "standard"} />
            </div>
          ))}
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="border-t border-line pt-8">
          <div className="mb-7">
            <p className="section-label">Miasta</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-4xl">
              Wolontariat w innych miastach
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((item) => (
              <Link
                key={item.slug}
                href={`/wolontariat/${item.slug}`}
                className={`category-pill ${
                  item.slug === city.slug ? "bg-clay-tint text-clay-deep" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
