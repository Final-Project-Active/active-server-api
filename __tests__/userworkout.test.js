const app = require("../app");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const Workout = require("../models/workouts");
const { sign } = require("../helpers/jwt");
const database = require("../config/db");
const UserWorkouts = require("../models/userworkouts");

let access_token_user;

beforeAll(async () => {
  const workoutData = {
    _id: new ObjectId("212121212121212121212121"),
    name: "Jogging",
    duration: "test.png",
    thumbnail: "Test thumbnail",
    calory: "Test calory",
    time: "Night",
    category: "Beginner",
    videos: [
      {
        videoUrl: "video.mp4",
        title: "Lari-lari",
        description: "Test description",
      },
    ],
  };

  await Workout.collection().insertOne(workoutData);

  let dataUser = {
    email: "user99@mail.com",
    password: "user99",
  };

  const loginUser = await database
    .collection("users")
    .findOne({ email: dataUser.email });
  access_token_user = sign({ _id: loginUser._id.toString() });

});

afterAll(async () => {
  const workoutId = "212121212121212121212121";
  await Workout.collection().findOneAndDelete({ _id: new ObjectId(workoutId) });
  await UserWorkouts.collection().findOneAndDelete({ workoutId: new ObjectId(workoutId) });
});

describe("POST /userworkouts", () => {
  describe("Success", () => {
    test("should create new userworkout", async () => {
      response = await request(app)
        .post(`/userworkout/212121212121212121212121`)
        .set("Authorization", "Bearer " + access_token_user);
      expect(response.status).toBe(201);
    });
  });

  describe("Fail", () => {
    test("should return 404 when workout not found", async () => {
      response = await request(app)
        .post(`/userworkout/212121212121212121212122`)
        .set("Authorization", "Bearer " + access_token_user);
      expect(response.status).toBe(404);
    });

    test("should return 401 when workout already added", async () => {
      response = await request(app)
        .post(`/userworkout/212121212121212121212121`)
        .set("Authorization", "Bearer " + access_token_user);
      expect(response.status).toBe(401);
    });
  });
});

describe("GET /userworkouts", () => {
  describe("Success", () => {
    test("should get userworkout data", async () => {
      let response = await request(app)
        .get("/userworkout")
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
    });
  });

  describe("Fail", () => {
    test("should return 403 when Authorization not found", async () => {
      response = await request(app)
        .get("/userworkout")
        
      expect(response.status).toBe(403);
    });
    test("should return 403 when Authorization not found", async () => {
      response = await request(app)
        .get("/userworkout")
        .set("Authorization", "Bearerss " + access_token_user);
      expect(response.status).toBe(403);
    });
  });
});