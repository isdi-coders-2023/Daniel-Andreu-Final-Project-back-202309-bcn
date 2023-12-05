import Shoe from "../model/Shoe.js";
import type { ShoeStructure } from "../types.js";
import type { ShoesRepositoryStructure } from "./types.js";

class ShoesMongooseRepository implements ShoesRepositoryStructure {
  public async getShoes(): Promise<ShoeStructure[]> {
    const shoes = await Shoe.find();

    return shoes;
  }

  public async deleteShoe(shoeId: string): Promise<void> {
    try {
      await Shoe.findByIdAndDelete(shoeId);
    } catch (error) {
      throw new Error("Error deleting the shoe" + (error as Error).message);
    }
  }
}
export default ShoesMongooseRepository;
