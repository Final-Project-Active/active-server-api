const request = require("supertest")
const app = require('../app')
const { v4 : uuidv4 } = require('uuid');

let globalPostId;

describe("GET /post", () => {
    test("should return status code 200 and array of post", async () => {
        let response = await request(app).get("/post").set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA`); 
        expect(response.status).toBe(200)
    })
})

describe("POST /post", () => {
    test("should create a new post and return status code 201", async () => {
        const postData = {
            thumbnail: `http://example.com/${uuidv4()}.jpg`,
            caption: `This is a test ${uuidv4()}`
        };

        let response = await request(app)
            .post("/post")
            .send(postData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA`); 

        globalPostId = response.body.id
        // console.log(globalPostId);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
    })
})

describe("PUT /comment", () => {
    test("should return add comment for post and return code status 201", async () => {
        const commentData = {
            postId: '6625d1ebd3449de797f3b550', 
            userId: '6625d5dfd725fac84be5cae0', 
            comment: 'Ini adalah komentar bagus!'
        };

        let response = await request(app)
            .put("/comment") 
            .send(commentData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDVkZmQ3MjVmYWM4NGJlNWNhZTAiLCJpYXQiOjE3MTM3NTU2Mzh9.m8KUH8ee6AHFJQh2FRdBEAFIet6ZJoPX-8pNq9th4OM`); 

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('status', true); 
    });

    test("should return code status 400", async () => {
        const commentData = {
            
            postId: '6625d1ebd3449de797f3b770',
            comment: 'Ini adalah komentar bagus!'
        };

        let response = await request(app)
            .put("/comment")
            .send(commentData)
            .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDVkZmQ3MjVmYWM4NGJlNWNhZTAiLCJpYXQiOjE3MTM3NTU2Mzh9.m8KUH8ee6AHFJQh2FRdBEAFIet6ZJoPX-8pNq9th4OM`); 

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error');
    });
});

describe("GET /post/:postId", () => {
    test("should return status code 200 and the post data when the post is found", async () => {
        const postId = '6625d1ebd3449de797f3b550'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA'; 
        let response = await request(app)
            .get(`/post/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', postId);
    });

    test("should return status code 404 when the post is not found", async () => {
        const postId = '6625d1ebd3449de797f3b551'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA';

        let response = await request(app)
            .get(`/post/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Data not found');
    });

    test("should return status code 500 on server errors", async () => {
        const postId = '990dbe456'; 
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA'; 

        let response = await request(app)
            .get(`/post/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal server error');
    });
});

describe('DELETE /post/:postId', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDE5MWZkNDU3N2U5ZWI0ODc2NDQiLCJpYXQiOjE3MTM3NTQ1NTh9.bmpTs6gihTpgJGmYNGWBWFuKo1Vf5dhFDgeZpkt_oKA';
    const invalidTokenOwner = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjI1ZDVkZmQ3MjVmYWM4NGJlNWNhZTAiLCJpYXQiOjE3MTM4ODYzNjl9.Bc6zJq1vbQFaP2COivkS875KSY6MudyNxbb85zQB5UQ'
    test('should return status code 401 when trying to delete a post not owned by the user', async () => {
        const postId = globalPostId 
        let response = await request(app)
            .delete(`/post/${postId}`)
            .set('Authorization', `Bearer ${invalidTokenOwner}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Unauthorized');
    });

    test('should delete a post and return status code 200 when authorized', async () => {
        const postId = globalPostId;
        let response = await request(app)
            .delete(`/post/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', true);
    });

    test('should handle server errors and return status code 500', async () => {
        const postId = '32567abc456789'; 
        let response = await request(app)
            .delete(`/post/${postId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Internal server error');
    });
});
  
afterAll(done => {
    done()
})
  