import dotenv from "dotenv"
dotenv.config()
import { User } from "../models/user"
import { connect, cleanData, disconnect } from "../mongodbMemoryServer/mongodb-memory-test-helper"
import supertest from "supertest"
import app from "../app"

jest.mock("../api/googleOauth2")
import getIdToken from "../api/googleOauth2"

const testApp = supertest(app)

const testData = {
    testUserInitial: {
        sub: "123456789",
        assets: [{ name: "Grove street house", location: "San Andreas" }]
    },
    authCodes: {
        expired: "4/F0AVHEtk4tnMrx0KUac5lUpGKACnuvwA9BtDa3ijHjpGTQ-TaasAYWgmYZm1BBHTEnN3anPQ",
        corrupted: "4/F0AVHEtk4tnMrxKUac5lUpGKACnuvwA9BtDa3ijHjpTQ-TaasAYWgmYZmBBHTEnN3anPQ"
    },
    id_tokens: {
        sufficient: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJlbWFpbCI6InRlc3QtdXNlckBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCBVc2VyIiwicGljdHVyZSI6Imh0dHBzOi8vdGVzdC11c2VyLXBpY3R1cmUuY29tIiwiaWF0IjoxNjgxNTY0MDkxfQ.Qz7S5DrAFVxCwL1YIjed0Cb4X9ZvGYGP9azBLlKrRYA",
        insufficient: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkiLCJwaWN0dXJlIjoiaHR0cHM6Ly90ZXN0LXVzZXItcGljdHVyZS5jb20iLCJpYXQiOjE2ODE1NjQwOTF9.XDs1__eWxPhgT3O_v4zpAb76U3r2_VIyRcvREUPfUEs"
    }
}


describe("Testing request headers: not allowed HTTP methods", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 405 when sending request with not allowed method (GET) to /api/login", async () => {

        // when
        const response = await testApp.get("/api/login")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PUT) to /api/login", async () => {

        // when
        const response = await testApp.put("/api/login")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/login", async () => {

        // when
        const response = await testApp.patch("/api/login")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (DELETE) to /api/login", async () => {

        // when
        const response = await testApp.delete("/api/login")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(405)
    })
})


describe("Testing requests with missing or wrong format body", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 400 and not create user when sending POST request without body to /api/login", async () => {

        // given no body

        // when
        const response = await testApp.post("/api/login")

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(400)
    })

    it("should return 400 and not create user when sending POST request with invalid body (incorrect property name) to /api/login", async () => {

        // given
        const authcode = "property's name should be 'code', value type should be string"

        // when
        const response = await testApp.post("/api/login").send({ authcode })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(400)
    })

    it("should return 400 and not create user when sending POST request with invalid body (incorrect value type) to /api/login", async () => {

        // given
        const code = 123456

        // when
        const response = await testApp.post("/api/login").send({ code })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(400)
    })
})


describe("Testing server behavior when sending expired or corrupted authcode to MOCKED Google Api", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should return 401 and not create user when sending POST request with expired authcode to /api/login (Mocked Google Api)", async () => {

        // given
        const mockedGetIdToken = jest.mocked(getIdToken)
        mockedGetIdToken.mockReturnValueOnce(Promise.resolve(null))

        // when
        const response = await testApp.post("/api/login")
            .send({ code: testData.authCodes.expired })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })

    it("should return 401 and not create user when sending POST request with corrupted authcode to /api/login (Mocked Google Api)", async () => {

        // given
        const mockedGetIdToken = jest.mocked(getIdToken)
        mockedGetIdToken.mockReturnValueOnce(Promise.resolve(null))

        // when
        const response = await testApp.post("/api/login")
            .send({ code: testData.authCodes.corrupted })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })
})


describe("Testing login and database handling behavior after successful authentication WITH MOCKED Google Api", () => {

    beforeAll(connect)
    beforeEach(cleanData)
    afterAll(disconnect)

    it("should create new user and return 200 + session token when sending POST request with valid authcode to /api/login (Mocked Google Api)", async () => {

        // given
        const mockedGetIdToken = jest.mocked(getIdToken)
        mockedGetIdToken.mockReturnValueOnce(Promise.resolve(testData.id_tokens.sufficient))

        // when
        const response = await testApp.post("/api/login")
            .send({ code: "Give me sufficient id_token please" })

        // then
        expect(response.body.sessionToken).not.toBeUndefined()
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(1)
        expect(response.status).toBe(200)
    })

    it("should not duplicate existing user and return 200 + session token when sending POST request with valid authcode to /api/login (Mocked Google Api)", async () => {

        // given
        await User.create({
            sub: "123456789",
            assets: [{ name: "Grove street house", location: "San Andreas" }]
        })
        const mockedGetIdToken = jest.mocked(getIdToken)
        mockedGetIdToken.mockReturnValueOnce(Promise.resolve(testData.id_tokens.sufficient))

        // when
        const response = await testApp.post("/api/login")
            .send({ code: "Give me sufficient id_token please" })

        // then
        expect(response.body.sessionToken).not.toBeUndefined()
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(1)
        expect(response.status).toBe(200)
    })

    it("should not create user and return 503 when gets insufficient id_token (no name, no email) from Google (Mocked Google Api)", async () => {

        // given
        const mockedGetIdToken = jest.mocked(getIdToken)
        mockedGetIdToken.mockReturnValueOnce(Promise.resolve(testData.id_tokens.insufficient))

        // when
        const response = await testApp.post("/api/login")
            .send({ code: "Give me insufficient id_token please" })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(503)
    })
})





