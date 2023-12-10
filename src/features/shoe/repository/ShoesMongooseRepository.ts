import Shoe from "../model/Shoe.js";
import type { ShoeDataStructure, ShoeStructure } from "../types.js";
import type { ShoesRepositoryStructure } from "./types.js";

class ShoesMongooseRepository implements ShoesRepositoryStructure {
  public async getShoes(): Promise<ShoeStructure[]> {
    const shoes = await Shoe.find().sort({ _id: -1 }).limit(10);

    return shoes;
  }

  public async deleteShoe(shoeId: string): Promise<void> {
    try {
      await Shoe.findByIdAndDelete(shoeId);
    } catch (error) {
      throw new Error("Error deleting the shoe" + (error as Error).message);
    }
  }

  public async addShoe(shoe: ShoeDataStructure): Promise<ShoeStructure> {
    try {
      const newShoe = await Shoe.create(shoe);

      return newShoe;
    } catch (error) {
      throw new Error(
        "Error creating the new shoe: " + (error as Error).message,
      );
    }
  }
}
export default ShoesMongooseRepository;
