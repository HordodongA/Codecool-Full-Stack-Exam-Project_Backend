import dotenv from "dotenv"
dotenv.config()
import supertest from "supertest"
import { cleanData, connect, disconnect } from "../mongodbMemoryServer/mongodb-memory-test-helper"
import app from "../app"

const testApp = supertest(app)


describe("Testing request headers: not allowed HTTP methods", () => {

    it("should return 405 when sending request with not allowed method (POST) to /api/ready", async () => {

        // when
        const response = await testApp.post("/api/ready")

        // then
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/ready", async () => {

        // when
        const response = await testApp.patch("/api/ready")

        // then
        expect(response.status).toBe(405)
    })
})


describe("Testing GET request with memory database connected", () => {

    beforeAll(connect)
    afterEach(cleanData)
    afterAll(disconnect)

    it("should return 200 if database is connected at the moment when sending GET request to /api/ready", async () => {

        // when
        const response = await testApp.get("/api/ready")

        // then
        expect(response.status).toBe(200)
    })
})


describe("Testing GET request without memory database connected", () => {

    it("should return 503 if database is not connected at the moment when sending GET request to /api/ready", async () => {

        // when
        const response = await testApp.get("/api/ready")

        // then
        expect(response.status).toBe(503)
    })
})