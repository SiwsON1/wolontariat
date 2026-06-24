export type City = {
  slug: string;
  name: string;
  locative: string;
  region: string;
};

export const cities: City[] = [
  { slug: "wroclaw", name: "Wrocław", locative: "we Wrocławiu", region: "dolnośląskie" },
  { slug: "warszawa", name: "Warszawa", locative: "w Warszawie", region: "mazowieckie" },
  { slug: "krakow", name: "Kraków", locative: "w Krakowie", region: "małopolskie" },
  { slug: "poznan", name: "Poznań", locative: "w Poznaniu", region: "wielkopolskie" },
  { slug: "gdansk", name: "Gdańsk", locative: "w Gdańsku", region: "pomorskie" },
  { slug: "lodz", name: "Łódź", locative: "w Łodzi", region: "łódzkie" },
  { slug: "szczecin", name: "Szczecin", locative: "w Szczecinie", region: "zachodniopomorskie" },
  { slug: "lublin", name: "Lublin", locative: "w Lublinie", region: "lubelskie" },
  { slug: "katowice", name: "Katowice", locative: "w Katowicach", region: "śląskie" },
  { slug: "bydgoszcz", name: "Bydgoszcz", locative: "w Bydgoszczy", region: "kujawsko-pomorskie" },
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getAllCities() {
  return cities;
}
