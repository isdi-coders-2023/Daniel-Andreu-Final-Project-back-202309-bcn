import type { NextFunction, Request, Response } from "express";
import type { ShoesRepositoryStructure } from "../repository/types";
import CustomError from "../../../CustomError/CustomError";

class ShoesController {
  constructor(private readonly shoesRepository: ShoesRepositoryStructure) {}

  public getShoes = async (req: Request, res: Response): Promise<void> => {
    const shoes = await this.shoesRepository.getShoes();

    res.status(200).json({ shoes });
  };

  public deleteShoe = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { shoeId } = req.params;
    try {
      await this.shoesRepository.deleteShoe(shoeId);
      res.status(200).json({});
    } catch {
      const error = new CustomError("Error deleting the shoe", 400);
      next(error);
    }
  };
}

export default ShoesController;
