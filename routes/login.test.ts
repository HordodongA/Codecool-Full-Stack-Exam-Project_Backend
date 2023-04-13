import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


describe("Testing request headers: not allowed HTTP methods", ()=> {

    it("gets the /api/login endpoint and sends request with not allowed method: GET", async () => {
        const response = await testApp.get("/api/login")
        expect(response.status).toBe(405)
    })

    it("gets the /api/login endpoint and sends request with not allowed method: PUT", async () => {
        const response = await testApp.put("/api/login")
        expect(response.status).toBe(405)
    })

    it("gets the /api/login endpoint and sends request with not allowed method: PATCH", async () => {
        const response = await testApp.patch("/api/login")
        expect(response.status).toBe(405)
    })

    it("gets the /api/login endpoint and sends request with not allowed method: DELETE", async () => {
        const response = await testApp.delete("/api/login")
        expect(response.status).toBe(405)
    })
})


describe("Testing request body: missing or invalid bodies", ()=> {

    it("gets the /api/login endpoint and sends POST request without body", async () => {
        const response = await testApp.post("/api/login")
        expect(response.status).toBe(400)
    })

    it("gets the /api/login endpoint and sends POST request with invalid body: incorrect property name", async () => {
        const response = await testApp.post("/api/login").send({
            authcode: "property's name should be code, the value should be string",
        })
        expect(response.status).toBe(400)
    })

    it("gets the /api/login endpoint and sends POST request with invalid body: incorrect value type", async () => {
        const response = await testApp.post("/api/login")
            .send({
                code: 123456
            })
        expect(response.status).toBe(400)
    })
})



// * Test scenarios
// ? mocking
// expired or wrong authcode => 401
// can't safeParse Google's respnse object => 401

// can't safeParse Google's id_token - invalid payload => 503
// ? Mocking + memory server
// good auth code, user exists => 200 + jwt
// good auth code, new user, save user to db => 200 + jwt




