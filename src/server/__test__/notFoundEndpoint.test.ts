import request from "supertest";
import app from "../app";

describe("Given a GET /fasdf endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should response with a 404 'Endoint not found' error", async () => {
      const path = "/fasdf";
      const expectedStatusCode = 404;
      const expectedErrorMessage = "Endpoint not found";

      const response = await request(app).get(path).expect(expectedStatusCode);

      const responseBody = response.body as { error: string };

      expect(responseBody.error).toBe(expectedErrorMessage);
    });
  });
});
