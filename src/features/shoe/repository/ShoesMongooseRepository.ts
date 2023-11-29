import Shoe from "../model/Shoe.js";
import type { ShoeStructure, ShoesRepositoryStructure } from "../types";

class ShoesMongooseRepository implements ShoesRepositoryStructure {
  public async getShoes(): Promise<ShoeStructure[]> {
    const shoes = await Shoe.find();

    return shoes;
  }
}
export default ShoesMongooseRepository;
