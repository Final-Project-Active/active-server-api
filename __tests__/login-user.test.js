const app = require("../app");
const request = require("supertest");

let dataUser = {
  email: "user99@mail.com",
  password: "user99",
};

describe("POST /login", () => {
    
  describe("Success Login", () => {
    test("should able login user", async () => {
      const response = await request(app).post("/login").send(dataUser);

      expect(response.status).toBe(200);
    });
  });

  describe("Failed Login", () => {
    test("user not found", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "emailsalah@mail.com", password: "user99" });

      expect(response.status).toBe(401);
    });

    test("invalid password", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "user99@mail.com", password: "passwordsalah" });

      expect(response.status).toBe(401);
    });
  });
});
