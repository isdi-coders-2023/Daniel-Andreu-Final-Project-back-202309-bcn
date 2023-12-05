import Shoe from "../model/Shoe.js";
import type { ShoeStructure } from "../types";
import type { ShoesRepositoryStructure } from "./types.js";

class ShoesMongooseRepository implements ShoesRepositoryStructure {
  public async getShoes(): Promise<ShoeStructure[]> {
    const shoes = await Shoe.find();

    return shoes;
  }
}
export default ShoesMongooseRepository;
