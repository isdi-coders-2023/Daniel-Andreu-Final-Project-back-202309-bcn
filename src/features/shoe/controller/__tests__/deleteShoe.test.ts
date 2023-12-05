import type { Request, Response, NextFunction } from "express";
import type ShoesMongooseRepository from "../../repository/ShoesMongooseRepository";
import ShoesController from "../ShoesController";
import type CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a ShoeController's deleteShoe method", () => {
  const req: Pick<Request<{ shoeId: string }>, "params"> = {
    params: { shoeId: "93661f02b15321760f51c6" },
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct shoe id", () => {
    const shoesRepository: Pick<ShoesMongooseRepository, "deleteShoe"> = {
      deleteShoe: jest.fn(),
    };

    test("Then it should call the response's status method with a 200 status code", async () => {
      const expectedStatusCode = 200;

      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.deleteShoe(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call the response's json method with an '{}'", async () => {
      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.deleteShoe(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({});
    });
  });

  describe("When it receives a request with an incorrect shoe id", () => {
    test("Then it should call its next function with a custom error", async () => {
      const shoesRepository: Pick<ShoesMongooseRepository, "deleteShoe"> = {
        deleteShoe: jest.fn().mockRejectedValue(null),
      };

      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.deleteShoe(
        req as Request<{ shoeId: string }>,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        message: "Error deleting the shoe",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
