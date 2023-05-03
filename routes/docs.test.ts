import dotenv from "dotenv"
dotenv.config()
import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


describe("Testing request headers: not allowed HTTP methods", () => {

    it("should return 405 when sending request with not allowed method (POST) to /api/docs", async () => {

        // when
        const response = await testApp.post("/api/docs")

        // then
        expect(response.status).toBe(405)
    })

    it("should return 405 when sending request with not allowed method (PATCH) to /api/docs", async () => {

        // when
        const response = await testApp.patch("/api/docs")

        // then
        expect(response.status).toBe(405)
    })
})


describe("Testing GET request", () => {

    it("should return 200 and serving OpenApi 3.0 documentation via Swagger UI when sending GET request to /api/docs", async () => {

        // when
        const response = await testApp.get("/api/docs")

        // then
        expect(response.status).toBe(301)
    })
})