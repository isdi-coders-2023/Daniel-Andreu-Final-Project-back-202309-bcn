import type { Request, Response } from "express";
import type CustomError from "../../../../CustomError/CustomError";
import { notFound } from "../errorsMiddleware";

describe("Given a notFoundError middleware", () => {
  describe("When it receivees a next function", () => {
    test("Then it should call next function with a 404 'Enpoint not found' error", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedError: Partial<CustomError> = {
        message: "Endpoint not found",
        statusCode: 404,
      };

      notFound(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.objectContaining(expectedError));
    });
  });
});
