import shoesMock from "../../mocks/shoesMock";
import request from "supertest";
import app from "../../../../server/app";
import { type ShoeStructure } from "../../types";
import { server } from "../../../../setupTests";

describe("Given a POST /shoes endpoint", () => {
  describe("When it receives a request with a correct shoe data", () => {
    test("Then it should respond with a 201 status code and the new shoe in it's json body", async () => {
      const expectedStatusCode = 201;
      const { _id, ...newShoeData } = shoesMock[0];
      const path = "/shoes";

      const response = await request(app)
        .post(path)
        .send(newShoeData)
        .expect(expectedStatusCode);

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

  describe("When it receives a request and there is a problem", () => {
    test("Then it should respond with a 400 status code and aand error message", async () => {
      const expectedStatusCode = 400;
      const { _id, ...newShoeData } = shoesMock[0];
      const path = "/shoes";
      const expectedError = {
        error: "Error creating the new shoe",
      };

      await server.stop();

      const response = await request(app)
        .post(path)
        .send(newShoeData)
        .expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody).toStrictEqual(expectedError);
    });
  });
});
