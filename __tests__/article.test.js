const app = require("../app");
const request = require("supertest");
const { ObjectId } = require("mongodb");
const Article = require("../models/article");
const { sign } = require("../helpers/jwt");
const database = require("../config/db");

let access_token_user;

beforeAll(async () => {
  const analyticData = {
    _id: new ObjectId("867867867686768768676867"),
    title: "Test title",
    description: "Test description",
    date: "12 April 2024",
    imageUrl: "test.png",
    source: "test.com",
  };

  await Article.collection().insertOne(analyticData);

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
  const analyticsId = "867867867686768768676867";
  await Article.collection().findOneAndDelete({ _id: new ObjectId(analyticsId) });
});

describe("GET /articles", () => {
  describe("Success", () => {
    test("should get articles data", async () => {
      let response = await request(app)
        .get("/articles")
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
    });
  });
});