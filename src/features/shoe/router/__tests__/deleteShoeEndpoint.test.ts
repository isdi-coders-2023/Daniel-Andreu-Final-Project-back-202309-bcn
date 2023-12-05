import request from "supertest";
import app from "../../../../server/app";
import shoesMock from "../../mocks/shoesMock";
import Shoe from "../../model/Shoe";

describe("Given a DELETE /:shoeId endpoint", () => {
  describe("When it receives a request with a correct shoe id", () => {
    test("Then it should respond with a 200 status code and an empty json object in its body", async () => {
      const expectedStatusCode = 200;
      const { _id, ...shoeMockData } = shoesMock[0];

      const shoe = await Shoe.create(shoeMockData);
      const path = `/shoes/${shoe._id}`;

      const response = await request(app)
        .delete(path)
        .expect(expectedStatusCode);

      expect(response.body).toStrictEqual({});
    });
  });

  describe("When it receives a request with an incorrect shoe id", () => {
    test("Then it should respond with a 400 status code and an error message", async () => {
      const expectedStatusCode = 400;
      const incorrectPath = "/shoes/wrongpath";
      const expectedErrorMessage = "Error deleting the shoe";

      const response = await request(app)
        .delete(incorrectPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
