const request = require("supertest");
const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    require("dotenv").config();
    await connectMongo(process.env.CONNECTION_URL);
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test GET /v1/launches ", () => {
    test("should respond with 200 status code", async () => {
      await request(app)
        .get("/v1/launches")
        .expect(200)
        .expect("content-type", /json/);
    });
  });

  describe("Test POST /v1/launches", () => {
    const completeLaunchData = {
      mission: "Tellatubby to the mars",
      rocket: "martian roverion",
      target: "Kepler-296 e",
      launchDate: "19 April, 2027",
    };

    const launchDataWithoutDate = {
      mission: "Tellatubby to the mars",
      rocket: "martian roverion",
      target: "Kepler-296 e",
    };

    const launchDataWithInvalidDate = {
      ...completeLaunchData,
      launchDate: "Hello",
    };

    test("should respond with 201 created status code", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect(201)
        .expect("content-type", /json/);

      const responseDate = new Date(response.body.launchDate).valueOf();
      const requestDate = new Date(completeLaunchData.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        err: "Launch properties missing!",
      });
    });

    test("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithInvalidDate)
        .expect(400);

      expect(response.body).toStrictEqual({
        err: "Invalid Date value!!",
      });
    });
  });
});
