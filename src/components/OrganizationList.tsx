"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";

type OrganizationListProps = {
  organizations: { name: string; krs: string }[];
  cityName: string;
  source: string;
};

const pageSize = 60;

export function OrganizationList({
  organizations,
  cityName,
  source,
}: OrganizationListProps) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(pageSize);
  const normalizedQuery = query.trim().toLowerCase();

  const filteredOrganizations = useMemo(() => {
    if (!normalizedQuery) {
      return organizations;
    }

    return organizations.filter((organization) =>
      organization.name.toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery, organizations]);

  const visibleOrganizations = filteredOrganizations.slice(0, visible);
  const hasQuery = normalizedQuery.length > 0;
  const resultLabel = hasQuery
    ? `${filteredOrganizations.length} z ${organizations.length}`
    : `${organizations.length} organizacji`;

  return (
    <div className="mt-10">
      <div className="grid gap-4 border-t border-line pt-6 md:grid-cols-[minmax(0,28rem)_1fr] md:items-end">
        <div>
          <label
            htmlFor={searchId}
            className="block text-sm font-semibold text-ink"
          >
            Szukaj organizacji
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setVisible(pageSize);
            }}
            placeholder="Wpisz nazwę organizacji"
            aria-label={`Szukaj organizacji w mieście ${cityName}`}
            className="mt-2 w-full rounded-[8px] border border-line bg-paper-raised px-4 py-3 text-base leading-6 text-ink outline-none placeholder:text-ink-faint focus-visible:border-clay focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          />
        </div>
        <p className="text-sm font-semibold tabular-nums text-ink-soft md:justify-self-end">
          {resultLabel}
        </p>
      </div>

      {filteredOrganizations.length > 0 ? (
        <>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleOrganizations.map((organization) => (
              <li key={organization.krs} className="border-t border-line pt-3">
                <span className="block font-medium leading-snug text-ink lowercase first-letter:uppercase">
                  {organization.name}
                </span>
                <span className="mt-1 block text-sm tabular-nums text-ink-faint">
                  KRS {organization.krs}
                </span>
              </li>
            ))}
          </ul>

          {filteredOrganizations.length > visible ? (
            <button
              type="button"
              className="button-secondary mt-8"
              onClick={() => setVisible((current) => current + pageSize)}
            >
              Pokaż więcej
            </button>
          ) : null}
        </>
      ) : (
        <div className="mt-8 rounded-[8px] border border-line bg-paper-raised p-6">
          <p className="max-w-2xl leading-7 text-ink-soft">
            Nie znaleziono organizacji dla tej frazy. Sprawdź pisownię albo{" "}
            <Link href="/zglos-organizacje" className="story-link text-clay-deep">
              zgłoś brakującą organizację
            </Link>
            .
          </p>
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-ink-faint">Źródło: {source}.</p>
    </div>
  );
}
