import type { ShoeStructure } from "../types";

export interface ShoesRepositoryStructure {
  getShoes: () => Promise<ShoeStructure[]>;
}
