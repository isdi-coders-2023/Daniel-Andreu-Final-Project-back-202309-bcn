import request from "supertest";
import app from "../../../../server/app";
import shoesMock from "../../mocks/shoesMock";
import Shoe from "../../model/Shoe";
import type { ShoeStructure } from "../../types";

describe("Given a GET /:shoeId endpoint", () => {
  describe("When it receives a request with a correct shoe id like the one of 'Nike Blazer Blancas'", () => {
    test("Then it should respond with a 200 status code and with the 'Nike Blazer Blancas' on its body", async () => {
      const expectedStatusCode = 200;
      const { _id, ...newShoeData } = shoesMock[0];

      const shoe = await Shoe.create(newShoeData);
      const path = `/shoes/${shoe._id}`;

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { shoe: ShoeStructure };
      const {
        brand,
        description,
        image,
        isBoxIncluded,
        isChangesAccepted,
        location,
        name,
        phone,
        price,
        shoeStatus,
        size,
        title,
      } = responseBody.shoe;

      expect(brand).toBe(newShoeData.brand);
      expect(description).toBe(newShoeData.description);
      expect(image).toBe(newShoeData.image);
      expect(isBoxIncluded).toBe(newShoeData.isBoxIncluded);
      expect(isChangesAccepted).toBe(newShoeData.isChangesAccepted);
      expect(location).toBe(newShoeData.location);
      expect(name).toBe(newShoeData.name);
      expect(phone).toBe(newShoeData.phone);
      expect(price).toBe(newShoeData.price);
      expect(shoeStatus).toBe(newShoeData.shoeStatus);
      expect(size).toBe(newShoeData.size);
      expect(title).toBe(newShoeData.title);
    });
  });

  describe("When it receives a request with an incorrect shoe id", () => {
    test("Then it should respond with a 400 status code and an error message", async () => {
      const expectedStatusCode = 400;
      const incorrectPath = "/shoes/wrongpath";
      const expectedErrorMessage = "Error finding the shoe";

      const response = await request(app)
        .get(incorrectPath)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toHaveProperty("error", expectedErrorMessage);
    });
  });
});
