import type { ShoeDataStructure, ShoeStructure } from "../types";

export interface ShoesRepositoryStructure {
  getShoes: () => Promise<ShoeStructure[]>;
  deleteShoe: (shoeId: string) => Promise<void>;
  addShoe: (shoe: ShoeDataStructure) => Promise<ShoeStructure>;
  getShoeById: (id: string) => Promise<ShoeStructure>;
}
