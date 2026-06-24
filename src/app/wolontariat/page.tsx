import type { Metadata } from "next";
import Link from "next/link";
import { getAllCities } from "@/lib/cities";

const siteUrl = "https://wolontariat.org.pl";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Wolontariat w Twoim mieście",
    description:
      "Znajdź poradniki o wolontariacie lokalnym i sprawdź, od czego zacząć pomaganie blisko siebie.",
    alternates: {
      canonical: "/wolontariat",
    },
  };
}

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function CitiesPage() {
  const cities = getAllCities();
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
    ],
  };

  return (
    <main className="site-shell py-12 md:py-20">
      <JsonLdScript data={breadcrumbJsonLd} />
      <nav
        aria-label="Ścieżka"
        className="mb-10 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm leading-6 text-ink-faint"
      >
        <Link href="/" className="story-link text-ink-soft">
          Strona główna
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-ink">
          Wolontariat
        </span>
      </nav>

      <header className="grid gap-10 md:grid-cols-[0.84fr_1.16fr] md:items-end">
        <div>
          <p className="section-label">Miasta</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            Wolontariat w Twoim mieście
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-ink-soft">
          Wybierz miasto i sprawdź, jak zacząć wolontariat lokalnie, jakie formy
          pomocy są dostępne i gdzie szukać organizacji blisko siebie.
        </p>
      </header>

      <section className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cities.map((city, index) => (
          <Link
            key={city.slug}
            href={`/wolontariat/${city.slug}`}
            className={`editorial-card rounded-[8px] border border-line bg-paper-raised p-6 ${
              index % 3 === 1 ? "lg:mt-10" : index % 3 === 2 ? "lg:mt-4" : ""
            }`}
          >
            <span className="section-label">{city.region}</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink">
              Wolontariat {city.locative}
            </h2>
            <span className="micro-link mt-5">
              <span>Przejdź do miasta</span>
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
      </section>
    </main>
  );
}
