import dotenv from "dotenv"
dotenv.config()
import { User } from "../models/user"
import supertest from "supertest"
import { connect, cleanData, disconnect } from "../mongodbMemoryServer/mongodb-memory-test-helper"
import app from "../app"

const testApp = supertest(app)

const testData = {
    testUserInitial: {
        sub: "123456789",
        assets: [{ name: "Grove street house", location: "San Andreas" }]
    },
    testUserUpdated: {
        sub: "123456789",
        assets: [
            {
                name: "Grove street house",
                location: "San Andreas",
                notes: "House of my granny",
                activities: [
                    {
                        name: "gas man todos",
                        todos: "review boyler, review gas heater, review gas meter"
                    },
                    {
                        name: "gardener todos",
                        todos: "purne trees, fertilize flowers"
                    }
                ]
            },
            {
                name: "Los Santos flat",
                location: "Los Santos",
                notes: "Home sweet home",
                machines: [
                    {
                        name: "air conditioner",
                        todos: "cleaning filter, disinfect condenser, unclog condensate drain tube"
                    },
                    { name: "water filter" }
                ]
            }
        ]
    },
    sessionTokens: {
        valid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwic3ViIjoiMTIzNDU2Nzg5IiwiZW1haWwiOiJ0ZXN0LXVzZXJAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyLXBpY3R1cmUuY29tIiwiaWF0IjoxNjgxNDcxNzExfQ.IC2OAsC9NfXR-rrJt4_kfUHyQQ1SNvOT5uaRIB46KN8",                   // existing user, can't expire, valid format and signature
        expired: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwic3ViIjoiMTIzNDU2Nzg5IiwiZW1haWwiOiJ0ZXN0LXVzZXJAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyLXBpY3R1cmUuY29tIiwiaWF0IjoxNjgxNDcxNzExLCJleHAiOjE2ODE0NzE3MTV9.HPshjsJK9XyG20gPA_wh35vg3IPw-esLSiTzoKHOXVc",
        invalidSignature: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwic3ViIjoiMTIzNDU2Nzg5IiwiZW1haWwiOiJ0ZXN0LXVzZXJAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyLXBpY3R1cmUuY29tIiwiaWF0IjoxNjgxNDcxNzExfQ.1IXI6IHaW7Bw1ZR-crV4YLFy4Qk1FsxUoAkeRh_29W4",
        invalidPayload: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyIiwiaWF0IjoxNjgxNDcxNzExfQ.fo92xga3kZABy-cyAkD6cBKXMuSMrVKnluskaQktvHg",
        nonExistingUserSub: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVGVzdCBVc2VyIiwic3ViIjoiMDAwMDAwMDAwIiwiZW1haWwiOiJ0ZXN0LXVzZXJAZ21haWwuY29tIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyLXBpY3R1cmUuY29tIiwiaWF0IjoxNjgxNDcxNzExfQ.6xdfIKMj0hvAg9wrff5sBIMp9KUlI21GEKYhvGZvOe0",
    }
}


describe("Testing request headers: not allowed HTTP methods", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 405 when sending request with not allowed method (POST) to /api/user", async () => {

        // when
        const response = await testApp.post("/api/user")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/user", async () => {

        // when
        const response = await testApp.patch("/api/user")

        // then
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

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 401 when sending GET request with expired session token to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.expired

        // when
        const response = await testApp.get("/api/user").set({ authorization: sessionToken })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 401 when sending GET request with invalid signatured session token to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.invalidSignature

        // when
        const response = await testApp.get("/api/user").set({ authorization: sessionToken })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 400 when sending GET request with invalid payload (missing name, sub, email properties) session token to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.invalidPayload

        // when
        const response = await testApp.get("/api/login").set({ authorization: sessionToken })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(400)
    })
})


describe("Testing GET user object", () => {

    beforeAll(connect)
    beforeEach(async () => { await User.create(testData.testUserInitial) })
    afterEach(cleanData)
    afterAll(disconnect)

    it("should return 200 and user object when sending GET request to /api/user", async () => {
        // given
        const sessionToken = testData.sessionTokens.valid

        // when
        const response = await testApp.get("/api/user").set({ "authorization": sessionToken })

        // then
        expect(response.body).not.toBe({})
        expect(response.body.assets[0].name).toBe("Grove street house")
        expect(response.status).toBe(200)
    })

    it("should return 404 when sending GET request with non-existing user sub to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.nonExistingUserSub

        // when
        const response = await testApp.get("/api/user").set({ "authorization": sessionToken })

        // then
        expect(JSON.stringify(response.body)).toBe("{}")
        expect(response.status).toBe(404)
    })
})


describe("Testing modify (PUT) user object", () => {

    beforeAll(connect)
    beforeEach(async () => { await User.create(testData.testUserInitial) })
    afterEach(cleanData)
    afterAll(disconnect)

    it("should return 200 and updated user object when sending PUT request to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.valid
        const update = testData.testUserUpdated

        //when
        const response = await testApp.put("/api/user")
            .send(update)
            .set({ "authorization": sessionToken, "Content-Type": "application/json" })

        // then
        expect(response.body.assets[1].machines[0].name).toBe("air conditioner")
        expect(response.status).toBe(200)
    })

    it("should return 404 when sending PUT request with non-existing user sub to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.nonExistingUserSub
        const update = testData.testUserUpdated

        //when
        const response = await testApp.put("/api/user")
            .send(update)
            .set({ "authorization": sessionToken, "Content-Type": "application/json" })

        // then
        expect(response.status).toBe(404)
    })
})


describe("Testing DELETE user object", () => {

    beforeAll(connect)
    beforeEach(async () => { await User.create(testData.testUserInitial) })
    afterEach(cleanData)
    afterAll(disconnect)

    it("should return 204 when sending DELETE request with existing user sub to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.valid

        // when
        const response = await testApp.delete("/api/user")
            .set({ "authorization": sessionToken })

        // then
        const testUser = await User.find()
        expect(testUser).toHaveLength(0)
        expect(response.status).toBe(204)
    })

    it("should return 404 when sending DELETE request with non-existing user sub to /api/user", async () => {

        // given
        const sessionToken = testData.sessionTokens.nonExistingUserSub

        // when
        const response = await testApp.delete("/api/user").set({ "authorization": sessionToken })

        // then
        const testUser = await User.find()
        expect(testUser).toHaveLength(1)
        expect(response.status).toBe(404)
    })
})