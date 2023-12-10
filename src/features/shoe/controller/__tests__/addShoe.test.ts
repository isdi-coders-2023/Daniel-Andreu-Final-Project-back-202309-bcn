import shoesMock from "../../mocks/shoesMock";
import type { ShoesRepositoryStructure } from "../../repository/types";
import type { ShoeCreateRequest } from "../../types";
import type { NextFunction, Response } from "express";
import ShoesController from "../ShoesController";
import type CustomError from "../../../../CustomError/CustomError";
import type ShoesMongooseRepository from "../../repository/ShoesMongooseRepository";

afterEach(() => {
  jest.clearAllMocks();
});

describe("Given a ShoeController's addShoe method", () => {
  const { _id, ...newShoeData } = shoesMock[0];

  const req: Pick<ShoeCreateRequest, "body"> = {
    body: newShoeData,
  };

  const res: Pick<Response, "status" | "json"> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };

  const next: NextFunction = jest.fn();

  describe("When it receives a request with a correct shoe Data in its body", () => {
    const shoesRepository: Pick<ShoesRepositoryStructure, "addShoe"> = {
      addShoe: jest.fn().mockResolvedValue(newShoeData),
    };

    const shoesController = new ShoesController(
      shoesRepository as ShoesRepositoryStructure,
    );

    test("Then it should call the method status with a 201", async () => {
      const expectedStatusCode = 201;

      await shoesController.addShoe(
        req as ShoeCreateRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with the new shoe", async () => {
      const expectedShoe = newShoeData;

      await shoesController.addShoe(
        req as ShoeCreateRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ shoe: expectedShoe });
    });
  });

  describe("When it receives a request and there is an error", () => {
    test("Then it should call the Next function with the message 'Error creating the new shoe'", async () => {
      const shoesRepository: Pick<ShoesMongooseRepository, "addShoe"> = {
        addShoe: jest.fn().mockRejectedValue(null),
      };

      const shoesController = new ShoesController(
        shoesRepository as ShoesMongooseRepository,
      );

      await shoesController.addShoe(
        req as ShoeCreateRequest,
        res as Response,
        next,
      );

      const expectedError: Partial<CustomError> = {
        message: "Error creating the new shoe",
        statusCode: 400,
      };

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
