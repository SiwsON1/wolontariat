import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell grid min-h-[70dvh] place-items-center py-20">
      <div className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-clay-deep">
          404
        </p>
        <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight tracking-[-0.03em] md:text-7xl">
          Ta strona nie jest już pod tym adresem.
        </h1>
        <p className="mt-6 text-lg leading-8 text-ink-soft">
          Możesz wrócić do strony głównej albo przejść do biblioteki artykułów o
          wolontariacie.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="button-primary">
            Strona główna
          </Link>
          <Link href="/blog" className="button-secondary">
            Artykuły
          </Link>
        </div>
      </div>
    </main>
  );
}
