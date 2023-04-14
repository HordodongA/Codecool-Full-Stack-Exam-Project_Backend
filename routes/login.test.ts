import dotenv from "dotenv"
dotenv.config()
import { connect, cleanData, disconnect } from "../mongodbMemoryServer/mongodb-memory-test-helper"
import { User } from "../models/user"
import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


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


describe("Testing request body: missing, wrong format, expired Google authcode", () => {

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
        const authcode = "property's name should be code, the value should be string"

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

    it("should return 401 when gets the /api/login endpoint and sending POST request with expired authcode", async () => {

        // given
        const code = "4/F0AVHEtk4tnMrx0KUac5lUpGKACnuvwA9BtDa3ijHjpGTQ-TaasAYWgmYZm1BBHTEnN3anPQ"

        // when
        const response = await testApp.post("/api/login")
            .send({ code })

        // then
        const createdUser = await User.find()
        expect(createdUser).toHaveLength(0)
        expect(response.status).toBe(401)
    })
})

// ? polish: bring here test data, add mocked login

// * Test scenarios
// ? mocking

// can't safeParse Google's respnse object => 401
// can't safeParse Google's id_token - invalid payload => 503

// ? Mocking + memory server

// good auth code, user exists => 200 + jwt
// good auth code, new user, save user to db => 200 + jwt




