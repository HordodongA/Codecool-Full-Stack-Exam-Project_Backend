import dotenv from "dotenv"
dotenv.config()
import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


describe("Testing request headers: not allowed HTTP methods", () => {

    it("should return 405 when sending request with not allowed method (POST) to /api/health", async () => {

        // when
        const response = await testApp.post("/api/health")

        // then
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/health", async () => {

        // when
        const response = await testApp.patch("/api/health")

        // then
        expect(response.status).toBe(405)
    })
})


describe("Testing GET request", () => {

    it("should return 200 when sending GET request to /api/health", async () => {

        // when
        const response = await testApp.get("/api/health")

        // then
        expect(response.status).toBe(200)
    })
})