import shoesMock from "../../mocks/shoesMock";
import type { ShoesRepositoryStructure, ShoeDataStructure } from "../../types";
import ShoesController from "../ShoesController";
import type { Response, Request } from "express";

beforeEach(() => {
  jest.restoreAllMocks();
});

describe("Given a ShoesController's getShoes method", () => {
  const shoesRepository: Pick<ShoesRepositoryStructure, "getShoes"> = {
    getShoes: jest.fn().mockResolvedValue(shoesMock),
  };
  const shoesController = new ShoesController(shoesRepository);

  describe("When it receives a response", () => {
    const req = {};
    const res: Pick<Response, "status" | "json"> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    test("Then it should call it's method status with a 200 status code", async () => {
      const expectedStatusCode = 200;

      await shoesController.getShoes(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call its method json with 2 shoes in it's body: 'Nike Blazer Blancas' and 'Air Jordan Retro 1'", async () => {
      const expectedJsonBody = { shoes: shoesMock };

      await shoesController.getShoes(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith(expectedJsonBody);
    });
  });
});
