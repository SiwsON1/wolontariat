import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Informacje o redakcji wolontariat.org.pl, sposobie pracy ze źródłami i kontakcie.",
};

const editors = [
  {
    name: "Anna Wysocka",
    role: "redaktorka prowadząca, koordynatorka wolontariatu",
  },
  {
    name: "Michał Krawczyk",
    role: "redaktor poradników dla organizacji",
  },
  {
    name: "Katarzyna Nowak",
    role: "redaktorka tematów społecznych",
  },
];

export default function AboutPage() {
  return (
    <main className="site-shell py-16 md:py-20">
      <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
            O portalu
          </p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
            Redakcja, źródła i odpowiedzialność.
          </h1>
        </div>
        <p className="max-w-2xl text-lg leading-8 text-ink-soft">
          wolontariat.org.pl to portal redakcyjny o wolontariacie w Polsce.
          Naszym celem jest pomaganie czytelnikom w podjęciu dobrej decyzji:
          gdzie zacząć, o co zapytać i jakie zasady znać przed wejściem w
          działanie.
        </p>
      </div>

      <section className="mt-16 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-serif text-4xl font-semibold tracking-[-0.02em]">
          Jak pracujemy
        </h2>
        <div className="grid gap-5 text-lg leading-8 text-ink-soft">
          <p>
            Piszemy prostym językiem i unikamy patosu. Wolontariat opisujemy jako
            relację, zobowiązanie i praktyczne działanie, nie jako hasło do
            kampanii.
          </p>
          <p>
            Przy tekstach prawnych wskazujemy podstawę w ustawie o działalności
            pożytku publicznego i o wolontariacie. Nie podajemy konkretnych
            stawek urzędowych ani danych, które mogą szybko się zdezaktualizować.
          </p>
          <p>
            Teksty aktualizujemy, gdy zmieniają się przepisy albo praktyka
            organizacji. Jeśli widzisz nieścisłość, napisz do redakcji.
            Poprawimy i dopiszemy, czego brakuje.
          </p>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
            Redakcja
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em]">
            Autorzy i role
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-[1fr_1.15fr_0.85fr]">
          {editors.map((editor, index) => (
            <article
              key={editor.name}
              className={`rounded-[8px] border border-line bg-paper-raised p-6 ${
                index === 1 ? "md:mt-10" : ""
              }`}
            >
              <h3 className="font-serif text-3xl font-semibold">{editor.name}</h3>
              <p className="mt-3 leading-7 text-ink-soft">{editor.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="kontakt" className="mt-16 grid gap-8 rounded-[8px] bg-green-tint p-8 md:grid-cols-[0.8fr_1.2fr] md:p-10">
        <h2 className="font-serif text-4xl font-semibold tracking-[-0.02em]">
          Kontakt i korekty
        </h2>
        <div className="grid gap-4 leading-7 text-ink-soft">
          <p>
            Jeśli tekst wymaga aktualizacji, doprecyzowania albo korekty, napisz
            do redakcji. W wersji produkcyjnej ten blok zostanie połączony z
            właściwym formularzem kontaktowym.
          </p>
          <p className="font-semibold text-ink">redakcja@wolontariat.org.pl</p>
        </div>
      </section>
    </main>
  );
}
