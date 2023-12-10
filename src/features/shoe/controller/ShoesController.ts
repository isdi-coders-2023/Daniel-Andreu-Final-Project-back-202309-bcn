import type { NextFunction, Request, Response } from "express";
import type { ShoesRepositoryStructure } from "../repository/types";
import CustomError from "../../../CustomError/CustomError.js";
import { type ShoeCreateRequest } from "../types";

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

  public addShoe = async (
    req: ShoeCreateRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const shoeData = req.body;
    try {
      const newShoe = await this.shoesRepository.addShoe(shoeData);
      res.status(201).json({ shoe: newShoe });
    } catch (error) {
      const customError = new CustomError("Error creating the new shoe", 500);
      next(customError);
    }
  };
}

export default ShoesController;
