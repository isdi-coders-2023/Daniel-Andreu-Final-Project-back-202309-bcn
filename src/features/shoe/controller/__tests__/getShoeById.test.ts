import type { Request, Response, NextFunction } from "express";
import type ShoesMongooseRepository from "../../repository/ShoesMongooseRepository";
import shoesMock from "../../mocks/shoesMock";
import ShoesController from "../ShoesController";
import { type ShoeStructure } from "../../types";
import type CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a ShoesController's getShoeById method", () => {
  const req: Pick<Request<{ shoeId: string }>, "params"> = {
    params: { shoeId: "93661f02b15321760f51c6" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct shoe id", () => {
    const shoesRepository: Pick<ShoesMongooseRepository, "getShoeById"> = {
      getShoeById: jest.fn().mockResolvedValue(shoesMock[0]),
    };

    test("Then it should call the response's status method with a 200 status code", async () => {
      const expectedStatusCode = 200;
      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.getShoeById(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with 'Nike Blazer Blancas' in its body", async () => {
      const expectedShoe: ShoeStructure = shoesMock[0];
      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.getShoeById(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ shoe: expectedShoe });
    });
  });

  describe("When it receives a request but an error occurs", () => {
    test("Then it should call its next function with a custom error", async () => {
      const expectedError: Partial<CustomError> = {
        message: "Error finding the shoe",
        statusCode: 400,
      };

      const shoesRepository: Pick<ShoesMongooseRepository, "getShoeById"> = {
        getShoeById: jest.fn().mockRejectedValue(null),
      };

      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.getShoeById(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
