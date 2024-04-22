const request = require("supertest")
const app = require('../app')

describe.skip("GET /post", () => {
    test("should return status code 200 and array of post", async () => {
        let response = await request(app).get("/post")
        expect(response.status).toBe(200)
    })
})

describe.skip("POST /post", () => {
    test("should create a new post and return status code 201", async () => {
        const postData = {
            thumbnail: 'http://example.com/thumbnail.jpg',
            caption: 'This is a test caption'
        };

        let response = await request(app)
            .post("/post")
            .send(postData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA`); 

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    })
})

describe("PUT /comment", () => {
    test("seharusnya menambahkan komentar pada postingan dan mengembalikan status code 201", async () => {
        const commentData = {
            postId: '6625d1ebd3449de797f3b550', 
            userId: '6625d5dfd725fac84be5cae0', 
            comment: 'Ini adalah komentar bagus!'
        };

        let response = await request(app)
            .put("/comment") 
            .send(commentData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDVkZmQ3MjVmYWM4NGJlNWNhZTAiLCJpYXQiOjE3MTM3NTU2Mzh9.m8KUH8ee6AHFJQh2FRdBEAFIet6ZJoPX-8pNq9th4OM`); // Ganti 'token_anda' dengan token yang valid

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', true); 
    });

    test("seharusnya mengembalikan status code 400 untuk input yang tidak valid", async () => {
        const commentData = {
            
            postId: 'abc',
            comment: 'Ini adalah komentar bagus!'
        };

        let response = await request(app)
            .put("/comment")
            .send(commentData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDVkZmQ3MjVmYWM4NGJlNWNhZTAiLCJpYXQiOjE3MTM3NTU2Mzh9.m8KUH8ee6AHFJQh2FRdBEAFIet6ZJoPX-8pNq9th4OM`); // Gunakan token yang valid

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});