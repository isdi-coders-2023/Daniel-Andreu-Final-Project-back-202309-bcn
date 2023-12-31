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
    } catch (error) {
      const customError = new CustomError("Error deleting the shoe", 400);

      next(customError);
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
      const customError = new CustomError("Error creating the new shoe", 400);

      next(customError);
    }
  };

  public getShoeById = async (
    req: Request<{ shoeId: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { shoeId } = req.params;

      const shoe = await this.shoesRepository.getShoeById(shoeId)!;

      res.status(200).json({ shoe });
    } catch {
      const customError = new CustomError("Error finding the shoe", 400);

      next(customError);
    }
  };
}

export default ShoesController;
