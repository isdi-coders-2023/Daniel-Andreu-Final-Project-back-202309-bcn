import request from "supertest";
import app from "../../../../server/app";
import type { ShoeStructure } from "../../types";
import shoesMock from "../../mocks/shoesMock";

describe("Given a GET /shoes endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and with 2 shoes in it's body: 'Nike Blazer Blancas' and 'Air Jordan Retro 1' ", async () => {
      const path = "/shoes";
      const expectedStatusCode = 200;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { shoes: ShoeStructure[] };

      responseBody.shoes.forEach((shoe, shoePosition) => {
        expect(shoe).toHaveProperty("title", shoesMock[shoePosition].title);
      });
    });
  });
});
