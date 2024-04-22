// const {test, expect} = require("jest")
const request = require("supertest")
const app = require('../app')
// const { request } = require("express")

describe.skip("GET /articles", () => {
    test("should return status code 200 and array of articles", async () => {
        let response = await request(app).get("/articles")

        expect(response.status).toBe(200)
    })
})