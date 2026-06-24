import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://wolontariat.org.pl";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "Zgłoś organizację",
    description:
      "Zgłoś organizację do bazy wolontariatu. Dodajemy miejsca na podstawie publicznych źródeł i zgłoszeń od organizacji oraz wolontariuszy.",
    alternates: {
      canonical: "/zglos-organizacje",
    },
  };
}

export default function ReportOrganizationPage() {
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
        name: "Zgłoś organizację",
        item: `${siteUrl}/zglos-organizacje`,
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
          <span aria-current="page" className="text-ink">
            Zgłoś organizację
          </span>
        </nav>
        <div className="grid gap-10 md:grid-cols-[0.86fr_1.14fr] md:items-end">
          <div className="reveal">
            <p className="section-label">Baza organizacji</p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.035em] md:text-7xl">
              Zgłoś organizację do bazy
            </h1>
          </div>
          <p
            className="reveal max-w-2xl text-lg leading-8 text-ink-soft"
            style={{ animationDelay: "80ms" }}
          >
            Budujemy bazę organizacji, które szukają wolontariuszy, opartą na
            publicznych, oficjalnych źródłach. Jeśli prowadzisz organizację albo
            znasz taką, która potrzebuje pomocy, daj nam znać. Dodamy ją i
            opiszemy rzetelnie.
          </p>
        </div>
      </header>

      <section className="site-shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.72fr_1.28fr]">
          <div className="reveal">
            <p className="section-label">Jak budujemy bazę</p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Wiarygodne dane przed kontaktem
            </h2>
          </div>
          <div
            className="reveal rounded-[8px] border border-line bg-paper-raised p-8 md:p-10"
            style={{ animationDelay: "80ms" }}
          >
            <p className="max-w-3xl text-lg leading-8 text-ink-soft">
              Bazę opieramy na publicznych rejestrach (KRS, wykaz organizacji
              pożytku publicznego) i na zgłoszeniach od organizacji oraz
              wolontariuszy. Dzięki temu dane są wiarygodne, a Ty masz pewność,
              że trafiasz na realne miejsca.
            </p>
          </div>
        </div>
      </section>

      <section className="site-shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-[0.74fr_1.26fr]">
          <div className="reveal">
            <p className="section-label">Zgłoszenie</p>
            <h2 className="mt-3 max-w-lg font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
              Co warto podać w zgłoszeniu
            </h2>
          </div>
          <div
            className="reveal grid gap-7 rounded-[8px] bg-green-tint p-8 md:grid-cols-[1fr_auto] md:items-end md:p-10"
            style={{ animationDelay: "80ms" }}
          >
            <ul className="grid gap-4 text-lg leading-8 text-ink-soft">
              <li>nazwa organizacji i miasto;</li>
              <li>czym się zajmuje;</li>
              <li>jakich wolontariuszy szuka;</li>
              <li>dane kontaktowe;</li>
              <li>link do strony lub profilu.</li>
            </ul>
            <Link
              href="mailto:kontakt@wolontariat.org.pl?subject=Zg%C5%82oszenie%20organizacji"
              className="button-primary w-fit"
            >
              Napisz do nas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
