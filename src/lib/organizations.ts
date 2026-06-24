import data from "@/data/organizations.json";

export type Organization = {
  name: string;
  krs: string;
  powiat: string;
  wojewodztwo: string;
};

type OrgData = {
  meta: { source: string; cities: Record<string, number> };
  byCity: Record<string, Organization[]>;
};

const orgData = data as OrgData;

export function getOrganizations(citySlug: string): Organization[] {
  return orgData.byCity[citySlug] ?? [];
}

export function getOrganizationCount(citySlug: string): number {
  return orgData.byCity[citySlug]?.length ?? 0;
}

export function getOrganizationsSource(): string {
  return orgData.meta.source;
}
