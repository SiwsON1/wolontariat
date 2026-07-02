import Link from "next/link";
import { content } from "@/lib/content";
import { Logo } from "@/components/Logo";

export async function Footer() {
  const categories = await content.getCategories();

  return (
    <footer className="mt-24 bg-green-deep text-paper">
      <div className="mx-auto grid max-w-[1240px] gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] md:px-8">
        <div>
          <Link href="/" className="font-serif text-3xl font-semibold tracking-[-0.02em]">
            <Logo onDark markSize={36} />
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-paper/78">
            Redakcyjny portal o wolontariacie w Polsce. Piszemy spokojnie,
            rzeczowo i bez patosu, z myślą o osobach zaczynających pomagać oraz
            o organizacjach.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/60">
            O portalu
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-paper/82">
            <Link href="/o-nas">Redakcja</Link>
            <Link href="/blog">Artykuły</Link>
            <Link href="/o-nas#kontakt">Kontakt</Link>
            <Link href="/zglos-organizacje">Zgłoś organizację</Link>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/60">
            Kategorie
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-paper/82">
            {categories.map((category) => (
              <Link key={category.slug} href={`/kategoria/${category.slug}`}>
                {category.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-paper/60">
            Prawo i źródła
          </h2>
          <p className="mt-4 text-sm leading-6 text-paper/78">
            Przy tekstach prawnych odsyłamy do ustawy o działalności pożytku
            publicznego i o wolontariacie oraz oficjalnych źródeł. Nie wpisujemy
            stawek, które mogą się zdezaktualizować.
          </p>
        </div>
      </div>
      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-2 px-5 py-5 text-xs text-paper/60 md:flex-row md:justify-between md:px-8">
          <p>© 2026 wolontariat.org.pl</p>
          <p>Materiały mają charakter informacyjny i nie stanowią porady prawnej.</p>
        </div>
      </div>
    </footer>
  );
}
