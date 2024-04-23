const app = require("../app");
const request = require("supertest");
const { sign } = require("../helpers/jwt");
const database = require("../config/db");

let access_token_user;
let loginUser;

beforeAll(async () => {
  let dataUser = {
    email: "user99@mail.com",
    password: "user99",
  };

  loginUser = await database
    .collection("users")
    .findOne({ email: dataUser.email });
  access_token_user = sign({ _id: loginUser._id.toString() });
});

describe("GET /user", () => {
  describe("Success", () => {
    test("should get user data", async () => {
      let response = await request(app)
        .get("/user")
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
    });
  });
});

describe("GET /user/:userId", () => {
  describe("Success", () => {
    test("should get user data by userId", async () => {
      const userId = "6627d517bd74d497e32d716f";
      let response = await request(app)
        .get(`/user/${userId}`)
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id", userId);
    });
  });

  describe("Failed", () => {
    test("should return 404 when user is not found", async () => {
      const userId = "609f41f2f0dce645a80e8d94";
      let response = await request(app)
        .get(`/user/${userId}`)
        .set("Authorization", "Bearer " + access_token_user);

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error", "User not found");
    });
  });
});
