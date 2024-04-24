const app = require("../app");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const Workout = require("../models/workouts");
const { sign } = require("../helpers/jwt");
const database = require("../config/db");

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
});

describe("GET /workout", () => {
  describe("Success", () => {
    test("should get workout data", async () => {
      let response = await request(app)
        .get("/workout")
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
    });
  });
});

describe("GET /workout/:workoutId", () => {
  describe("Success", () => {
    test("should get workout data by workoutId", async () => {
      const workoutId = "212121212121212121212121";
      let response = await request(app)
        .get(`/workout/${workoutId}`)
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("duration");
      expect(response.body).toHaveProperty("thumbnail");
      expect(response.body).toHaveProperty("calory");
      expect(response.body).toHaveProperty("category");
      expect(response.body).toHaveProperty("videos");
    });
  });
});
