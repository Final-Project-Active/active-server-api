const app = require("../app");
const database = require("../config/db");
const request = require("supertest");

const new_user = {
  name: "lunar agustine",
  username: "lunarAg",
  email: "lunar11@mail.com",
  password: "lunar123",
  imageUrl: "test.png",
  age: "25",
  weight: "65 kg",
  gender: "Female",
  height: "166 cm",
  goal: "Get Fitter",
  physicalActivity: "Beginner",
};

describe("POST /register", () => {

  describe("Succes Register", () => {
    test("should able register user", async () => {
      const response = await request(app).post("/register").send(new_user);

      expect(response.status).toBe(201);
    });
  });

  describe("Failed Register", () => {
    test("returning required name error", async () => {
      const response = await request(app).post("/register").send({
        username: " ",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required username errorr", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: " ",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required email error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: " ",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required password error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: " ",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required imageurl error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: " ",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required age error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: " ",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required weight error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: " ",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required gender error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: " ",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required height error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: " ",
        goal: "Get Fitter",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required goal error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: " ",
        physicalActivity: "Beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required physicalactivity error", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: " ",
      });

      expect(response.status).toBe(400);
    });

    test("returning required username is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required Age is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required weight is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required height is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        goal: "Get Fitter",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required gender is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        height: "166 cm",
        goal: "Get Fitter",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required goal  is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        physicalActivity: "beginner",
      });

      expect(response.status).toBe(400);
    });

    test("returning required physicalactivity is missing", async () => {
      const response = await request(app).post("/register").send({
        name: "lunar agustine",
        username: "lunarAg",
        email: "lunar11@mail.com",
        password: "lunar123",
        imageUrl: "test.png",
        age: "25",
        weight: "65 kg",
        gender: "Female",
        height: "166 cm",
        goal: "Get Fitter",
      });

      expect(response.status).toBe(400);
    });
  });
});

afterAll(async () => {
  await database.collection("users").deleteOne({ name: new_user.name });
});
