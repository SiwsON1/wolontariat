// Mapowanie slug -> obraz cover. Uzywane gdy zrodlem tresci jest WordPress
// (ktory nie przechowuje naszych zdjec z public/img). Dzieki temu artykuly
// maja te same, tematyczne zdjecia niezaleznie od zrodla.
const covers: Record<string, string> = {
  "jak-zostac-wolontariuszem": "/img/vol-group-food.jpg",
  "wolontariat-a-cv-i-kariera": "/img/students-project.jpg",
  "wolontariat-hospicyjny": "/img/senior-tender.jpg",
  "wolontariat-szkolny-mlodziez": "/img/students-class.jpg",
  "wolontariat-za-granica": "/img/vol-aid-outdoor.jpg",
  "prawa-wolontariusza": "/img/handshake.jpg",
  "wolontariat-seniorow": "/img/senior-intergen.jpg",
  "wolontariat-w-schronisku-dla-zwierzat": "/img/shelter-dog.jpg",
  "wolontariat-kryzysowy-pomoc": "/img/vol-aid-outdoor.jpg",
  "jak-pozyskac-wolontariuszy-poradnik-dla-ngo": "/img/vol-cleaning.jpg",
  "kto-moze-zostac-wolontariuszem": "/img/vol-outreach.jpg",
  "rodzaje-wolontariatu": "/img/vol-embrace.jpg",
  "gdzie-szukac-wolontariatu": "/img/vol-outreach.jpg",
  "wolontariat-w-domu-dziecka": "/img/vol-embrace.jpg",
  "miedzynarodowy-dzien-wolontariusza": "/img/vol-group-food.jpg",
  "wolontariat-w-szpitalu": "/img/nurse-hand.jpg",
  "wolontariat-online": "/img/online-call.jpg",
  "czy-wolontariat-jest-platny": "/img/vol-boxes.jpg",
  "zaswiadczenie-o-wolontariacie": "/img/handshake.jpg",
  "centrum-wolontariatu": "/img/vol-cleaning.jpg",
  "korpus-solidarnosci": "/img/vol-outreach.jpg",
  "wolontariat-ekologiczny": "/img/vol-cleaning.jpg",
  "wolontariat-sportowy": "/img/vol-group-food.jpg",
  "cechy-dobrego-wolontariusza": "/img/vol-embrace.jpg",
};

const FALLBACK = "/img/vol-group-food.jpg";

export function getCover(slug: string): string {
  return covers[slug] ?? FALLBACK;
}
