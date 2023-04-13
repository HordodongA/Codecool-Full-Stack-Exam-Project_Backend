import dotenv from "dotenv"
dotenv.config()
import supertest from "supertest"
import { connect, cleanData, disconnect } from "../mongodbMemoryServer/mongodb-memory-test-helper"
import { User } from "../models/user"
import app from "../app"

const testApp = supertest(app)


describe("Testing request headers: not allowed HTTP methods", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 405 when sending request with not allowed method (POST) to /api/user", async () => {

        // when
        const response = await testApp.post("/api/user")

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/user", async () => {

        // when
        const response = await testApp.patch("/api/user")

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })
})


describe("Testing the session token in authorization headers", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)


    it("should return 401 when sending GET request without session token to /api/user", async () => {

        // given no token

        // when
        const response = await testApp.get("/api/user")

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 401 when sending GET request with expired session token to /api/user", async () => {

        // given
        const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEyODIwLCJleHAiOjE2ODEzMTI4MzB9.qH-ww7FIBwwMkdBfmoX5-GQK3TFMtRUDg6xJRrwQ6Vg"

        // when
        const response = await testApp.get("/api/user").set({ authorization: expiredToken })

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 401 when sending GET request with invalid signature session token to /api/user", async () => {

        // given
        const signatureInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C07gzDnz5axpWiqfay1OzHPk77IAQlg4nw"

        // when
        const response = await testApp.get("/api/user").set({ authorization: signatureInvalidToken })

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 400 when sending GET request with invalid payload (missing name property) session token to /api/user", async () => {

        // given
        const payloadInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.ymnacZEbNOLvO-jrno4C8dKRvP9id6C2xZPGxDeu8TA"

        // when
        const response = await testApp.get("/api/login").set({ authorization: payloadInvalidToken })

        //then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(400)
    })
})




// * PUT valid body => 400
// ! need to transform: before all: login & chane db connection to memory server
// describe("modify user object test", () => {
//     it("gets the /api/user endpoint and sends PUT request with valid body", async () => {
//         const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
//         const validBody = {
//             sub: "111342953279647966425",
//             assets: [
//                 {
//                     name: "Grove street",
//                     location: "San Andreas",
//                     notes: "My granny"s house",
//                     activities: [
//                         {
//                             name: "activity one",
//                             todos: "nem szarni a szoba közepére"
//                         },
//                         { name: "activity two" }
//                     ]
//                 },
//                 {
//                     name: "Kertvárosi lakás",
//                     location: "Kertváros",
//                     notes: "Home sweet home",
//                     machines: [
//                         {
//                             name: "machine one",
//                             todos: "befújni WD40-nel"
//                         },
//                         { name: "machine two" }
//                     ]
//                 }
//             ]
//         }
//         const response = await testApp.put("/api/user")
//             .send(validBody)
//             .set({
//                 "authorization": validToken,
//                 "Content-Type": "application/json"
//             })
//         expect(response.status).toBe(200)
//     })
// })

// * DELETE with valid token
// ! need to transform: before all: login, save to db, after delete: find in db & chane db connection to memory server
// describe("delete user object test", () => {
//     it("gets the /api/user endpoint and sends DELETE request", async () => {
//         const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
//         const response = await testApp.delete("/api/user")
//             .set({ "authorization": validToken })
//         expect(response.status).toBe(204)
//     })
// })






describe("Testing GET user object", () => {

    beforeAll(connect)
    beforeEach(async () => {
        const testUser = {
            sub: "111342953279647966425",                                    // ! cserélni a subot itt és a tokenben
            assets: [{ name: "Grove street", location: "San Andreas" }]
        }
        await User.create(testUser)
    })
    afterEach(cleanData)
    afterAll(disconnect)

    it("should return 404 when sending GET request with non-existing user sub to /api/user", async () => {

        // given
        const nonExistingSubToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTM0Mjk1MzI3OTY0Nzk2NjQyNiIsImVtYWlsIjoiZ2Fib3JuZXViYXVlci5oZGFAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFTQWM0Y0kwcnVhTjFkeXB4NkhoVU1EejFKSk1EazV2Y1ZPSkFiMXc9czk2LWMiLCJpYXQiOjE2ODEzMTMwNjZ9.AKMtmwGkvDWU8-drSAa-REN1E80C70saEpsC-QJaDgk"

        //when
        const response = await testApp.get("/api/user").set({ "authorization": nonExistingSubToken })

        // then
        expect(JSON.stringify(response.body)).toBe("{}")
        expect(response.status).toBe(404)
    })

    it("should return 200 and user object when sending GET request to /api/user", async () => {
        // given
        // ! set demo token's sub to demo user's sub
        const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"

        //when
        const response = await testApp.get("/api/user").set({ "authorization": validToken })

        // then
        expect(response.body).not.toBe({})
        expect(response.body.assets[0].name).toBe("Grove street")
        expect(response.status).toBe(200)
    })
})



// * PUT non-existing sub => 503
// ! need to transform: before all: login & chane db connection to memory server
describe("Testing modify user object", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 503 when sending PUT request with non-existing user sub to /api/user", async () => {

        // given
        const nonExistingSubToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTM0Mjk1MzI3OTY0Nzk2NjQyNiIsImVtYWlsIjoiZ2Fib3JuZXViYXVlci5oZGFAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFTQWM0Y0kwcnVhTjFkeXB4NkhoVU1EejFKSk1EazV2Y1ZPSkFiMXc9czk2LWMiLCJpYXQiOjE2ODEzMTMwNjZ9.AKMtmwGkvDWU8-drSAa-REN1E80C70saEpsC-QJaDgk"
        const validBody = { sub: "111342953279647966425", assets: [{ name: "Grove street" }] }

        //when
        const response = await testApp.put("/api/user")
            .send(validBody)
            .set({
                "authorization": nonExistingSubToken,
                "Content-Type": "application/json"
            })

        // then
        expect(response.status).toBe(503)
    })
})



// * DELETE a non-existing document
// ! need to transform: before all: login, save to db, after delete: find in db & chane db connection to memory server

describe("Testing delete user object", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 503 when sending DELETE request with non-existing user sub to /api/user", async () => {

        // given
        const nonExistingSubToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTM0Mjk1MzI3OTY0Nzk2NjQyNiIsImVtYWlsIjoiZ2Fib3JuZXViYXVlci5oZGFAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FHTm15eGFTQWM0Y0kwcnVhTjFkeXB4NkhoVU1EejFKSk1EazV2Y1ZPSkFiMXc9czk2LWMiLCJpYXQiOjE2ODEzMTMwNjZ9.AKMtmwGkvDWU8-drSAa-REN1E80C70saEpsC-QJaDgk"

        // when
        const response = await testApp.delete("/api/user").set({ "authorization": nonExistingSubToken })

        // then
        expect(response.status).toBe(503)
    })
})


// ? polish: it should return 400 when ..., env.test if needed, given: set data- when: response-then:expect

// ! A VALID TOKEN (can"t expire): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw


    // given
    //when
    // then


// ? HTTP status codes
// 200 OK
// 201 Created
// 204 No content
// 400 Bad request
// 401 Unauthorized
// 403 Forbidden
// 404 Not found
// 405 Method not allowed
// 500 Internal server error
// 503 Service not availabla (e. g. Mongo DB)