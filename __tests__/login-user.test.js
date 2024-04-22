const app = require("../app");
const request = require("supertest");

let dataUser = {
  email: "user1@mail.com",
  password: "user123",
};

describe("POST /login", () => {
    
  describe("Success Login", () => {
    test("should able register user", async () => {
      const response = await request(app).post("/login").send(dataUser);

      expect(response.status).toBe(200);
    });
  });

  describe("Failed Login", () => {
    test("user not found", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "emailsalah@mail.com", password: "password" });

      expect(response.status).toBe(401);
    });

    test("invalid password", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "ninjacode@mail.com", password: "passwordsalah" });

      expect(response.status).toBe(401);
    });
  });
});
