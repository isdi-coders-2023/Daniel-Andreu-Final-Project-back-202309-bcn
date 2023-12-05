import type { ShoeStructure } from "../types";

export interface ShoesRepositoryStructure {
  getShoes: () => Promise<ShoeStructure[]>;
  deleteShoe: (shoeId: string) => Promise<void>;
}
