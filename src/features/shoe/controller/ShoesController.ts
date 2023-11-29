import type { Request, Response } from "express";
import type { ShoesRepositoryStructure } from "../types";

class ShoesController {
  constructor(private readonly shoesRepository: ShoesRepositoryStructure) {}

  public getShoes = async (req: Request, res: Response): Promise<void> => {
    const shoes = await this.shoesRepository.getShoes();

    res.status(200).json({ shoes });
  };
}

export default ShoesController;
