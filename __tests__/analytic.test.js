const app = require("../app");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const Analytic = require("../models/analytics");
const { sign } = require("../helpers/jwt");
const database = require("../config/db");

let access_token_user;

beforeAll(async () => {
  const analyticData = {
    _id: new ObjectId("867867867686768768676867"),
    currentWeight: 77,
    duration: 3,
    intensity: "medium",
    userId: "662669e2e2ecf792dcebb77d",
  };

  await Analytic.collection().insertOne(analyticData);

  let dataUser = {
    email: "user1@mail.com",
    password: "user123",
  };

  const loginUser = await database
    .collection("users")
    .findOne({ email: dataUser.email });
  access_token_user = sign({ _id: loginUser._id.toString() });
});

afterAll(async () => {
  const workoutId = "867867867686768768676867";
  await Analytic.collection().deleteOne({ _id: new ObjectId(workoutId) });
});

describe("GET /analytics", () => {
  describe("Success", () => {
    test("should get analytics data", async () => {
      let response = await request(app)
        .get("/analytics")
        .set("Authorization", "Bearer " + access_token_user);
      expect(response.status).toBe(200);
    });
  });
});

describe("POST /analytics", () => {
  test("should create a new package", async () => {
    const new_analytics_data = {
        currentWeight: 88,
        duration: 2,
        intensity: "high",
        userId: "662669e2e2ecf792dcebb77d",
    };
    const response = await request(app)
      .post("/analytics")
      .send(new_analytics_data)
      .set("Authorization", "Bearer " + access_token_user);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("currentWeight")
    expect(response.body).toHaveProperty("duration")
    expect(response.body).toHaveProperty("intensity")
  });
});