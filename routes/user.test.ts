import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


describe("Testing HTTP methods", ()=> {

    it("gets the /api/user endpoint and sends request with not allowed method: POST", async () => {
        const response = await testApp.post("/api/user")
        expect(response.status).toBe(405)
    })

    it("gets the /api/user endpoint and sends request with not allowed method: PATCH", async () => {
        const response = await testApp.patch("/api/user")
        expect(response.status).toBe(405)
    })
})


describe("Testing the session token in authorization headers", ()=> {

    it("gets the /api/user endpoint and sends GET request without session token", async () => {
        const response = await testApp.get("/api/user")
        expect(response.status).toBe(401)
    })

    it("gets the /api/user endpoint and sends GET request with expired session token", async () => {
        const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEyODIwLCJleHAiOjE2ODEzMTI4MzB9.qH-ww7FIBwwMkdBfmoX5-GQK3TFMtRUDg6xJRrwQ6Vg"
        const response = await testApp.get("/api/user")
        .set({ authorization: expiredToken })
        expect(response.status).toBe(401)
    })

    it("gets the /api/user endpoint and sends GET request with invalid signature session token", async () => {
        const signatureInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C07gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
        const response = await testApp.get("/api/user")
        .set({ authorization: signatureInvalidToken })
        expect(response.status).toBe(401)
    })

    it("gets the /api/user endpoint and sends GET request with invalid payload (missing name property) session token", async () => {
        const payloadInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.ymnacZEbNOLvO-jrno4C8dKRvP9id6C2xZPGxDeu8TA"
        const response = await testApp.get("/api/login")
        .set({ authorization: payloadInvalidToken })
        expect(response.status).toBe(400)
    })
})


// ! PUT valid body => 400
// describe("modify user object tests", ()=> {
//     it("gets the /api/user endpoint and sends PUT request with valid body", async () => {
//         const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
//         const validBody = {
//             sub: "111342953279647966425",
//             assets: [
//                 {
//                     name: "Grove street",
//                     location: "San Andreas",
//                     notes: "My granny's house",
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
//                  "authorization": validToken,
//                  "Content-Type": "application/json"
//              })
//         expect(response.status).toBe(200)
//     })
//     // ? Átmegy a middleware-eken, de nem ír a db-be
// })


// GET with valid token
// describe("get user object tests", ()=> {
    // it("gets the /api/user endpoint and sends GET request", async () => {
    //     const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
    //     const response = await testApp.get("/api/user")
    //         .set({
    //              "authorization": validToken
    //          })
    //     expect(response.status).toBe(200)
    // })
    // ? 
// })




// ! A VALID TOKEN (can't expire): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw

// * Test scenarios
// GET => 200 + {user}  -- write - read db
// PUT => 200 + {user} + write to db  -- write - read db
// DELETE => 204 + Delete from db  -- write - delete db


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