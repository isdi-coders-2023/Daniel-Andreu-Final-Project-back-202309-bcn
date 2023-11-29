import type { ShoeDataStructure } from "../types";

const shoesMock: ShoeDataStructure[] = [
  {
    title: "Nike Blazer Blancas",
    image: "https://i.ibb.co/bW5YQZ3/1.webp",
    price: 70,
    size: 38,
    brand: "Nike",
    shoeStatus: "Como nuevo",
    description:
      "Vendo bambas Nike Blazer originales blancas, las he usado una única ve…",
    isBoxIncluded: true,
    isChangesAccepted: true,
    name: "Daniel Andreu",
    phone: "659377296",
    location: "Cornella de Llobregat",
  },
  {
    title: "Air Jordan Retro 1",
    image: "https://i.ibb.co/2crCbW0/2.webp",
    price: 65,
    size: 40,
    brand: "Nike",
    shoeStatus: "Sin estrenar",
    description:
      "Me las regalaron por cumpleaños pero no son mi estilo, no he llegado a…",
    isBoxIncluded: true,
    isChangesAccepted: false,
    name: "Bárbara Gimeno",
    phone: "617863387",
    location: "El Vendrell",
  },
];

export default shoesMock;
