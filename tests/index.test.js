const request = require("supertest");
const express = require("express");
const router = require("../routes/index");

const fetchMock = require("jest-fetch-mock");
global.fetch = fetchMock;

const worldCurrencies = require("./fixtures/worldCurrencies");
const europeCurrencies = require("./fixtures/europeCurrencies");

const app = express();
app.use("/", router);

describe("index.js", () => {
  describe("GET /region/:region", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(europeCurrencies));
    });

    it("should return a list of countries with corresponding currency ", async () => {
      const response = await request(app).get("/region/europe");
      expect(response.status).toBe(200);
      expect(response.body).toMatchSnapshot();
    });

    it("should return response of same length as fetched data", async () => {
      const response = await request(app).get("/region/europe");
      expect(response.body.length).toBe(europeCurrencies.length);
    });

    it("should respond with error for invalid region", async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify({ status: 404, message: "Not Found" })
      );
      const response = await request(app).get("/region/invalid");
      expect(response.status).toBe(404);
      expect(response.text).toBe("Not Found");
    });
  });

  describe("GET /all", () => {
    beforeEach(() => {
      fetchMock.mockResponse(JSON.stringify(worldCurrencies));
    });

    it("should return a list of currencies with corresponding countries using the currency", async () => {
      const response = await request(app).get("/all");
      expect(response.status).toBe(200);
      expect(response.body).toMatchSnapshot();
    });
  });
});
