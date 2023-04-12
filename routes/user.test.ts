import supertest from "supertest"
import app from "../app"

const testApp = supertest(app)


// *  NOT ALLOWED METHOD SENT: POST, PATCH => 405

// it("gets the /api/user endpoint and sends request with not allowed method: POST", async () => {
//     const response = await testApp.post("/api/user")
//     expect(response.status).toBe(405)
// })

// it("gets the /api/user endpoint and sends request with not allowed method: PATCH", async () => {
//     const response = await testApp.patch("/api/user")
//     expect(response.status).toBe(405)
// })


// * REQUEST SENT WITHOUT SESSION TOKEN => 401

// it("gets the /api/user endpoint and sends GET request without session token", async () => {
//     const response = await testApp.get("/api/user")
//     expect(response.status).toBe(401)
// })

// * REQUEST SENT WITH EXPIRED SESSION TOKEN => 401

// it("gets the /api/user endpoint and sends GET request with expired session token", async () => {
//     const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEyODIwLCJleHAiOjE2ODEzMTI4MzB9.qH-ww7FIBwwMkdBfmoX5-GQK3TFMtRUDg6xJRrwQ6Vg"
//     const response = await testApp.get("/api/user")
//     .set({ authorization: expiredToken })
//     expect(response.status).toBe(401)
// })

// * REQUEST SENT WITH INVALID SIGNATURE SESSION TOKEN => 401

// it("gets the /api/user endpoint and sends GET request with invalid signature session token", async () => {
//     const signatureInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C07gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
//     const response = await testApp.get("/api/user")
//     .set({ authorization: signatureInvalidToken })
//     expect(response.status).toBe(401)
// })

// * REQUEST SENT WITH INVALID PAYLOAD SESSION TOKEN (missing name property) => 400

// it("gets the /api/user endpoint and sends GET request with invalid payload (missing name property) session token", async () => {
//     const payloadInvalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.ymnacZEbNOLvO-jrno4C8dKRvP9id6C2xZPGxDeu8TA"
//     const response = await testApp.get("/api/login")
//     .set({ authorization: payloadInvalidToken })
//     expect(response.status).toBe(400)
// })


// PUT wrong body => 400

// it("gets the /api/user endpoint and sends PUT request with valid body (missing name property) session token", async () => {
//     const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw"
//     const validBody = {
//         sub: "111342953279647966425",
//         assets: [
//             {
//                 name: "Grove street",
//                 location: "San Andreas",
//                 notes: "My granny's house",
//                 activities: [
//                     {
//                         name: "activity one",
//                         todos: "nem szarni a szoba közepére"
//                     },
//                     { name: "activity two" }
//                 ]
//             },
//             {
//                 name: "Kertvárosi lakás",
//                 location: "Kertváros",
//                 notes: "Home sweet home",
//                 machines: [
//                     {
//                         name: "machine one",
//                         todos: "befújni WD40-nel"
//                     },
//                     { name: "machine two" }
//                 ]
//             }
//         ]
//     }
//     const response = await testApp.put("/api/user")
//         .send(validBody)
//         .set({
//              "authorization": validToken,
//              "Content-Type": "application/json"
//          })
//     expect(response.status).toBe(200)
// })
// ? Átmegy a middleware-eken, de nem ír a db-be






// ! A GOOD TOKEN (can't expire): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2Fib3IgTmV1YmF1ZXIiLCJzdWIiOiIxMTEzNDI5NTMyNzk2NDc5NjY0MjUiLCJlbWFpbCI6ImdhYm9ybmV1YmF1ZXIuaGRhQGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BR05teXhhU0FjNGNJMHJ1YU4xZHlweDZIaFVNRHoxSkpNRGs1dmNWT0pBYjF3PXM5Ni1jIiwiaWF0IjoxNjgxMzEzMDY2fQ.dytCjUA3C0V7gzDnz5axpWiqfay1OzHPk77IAQlg4nw


    // * Test scenarios
    
    // GET => 200 + {user}  -- write - read db
    // PUT => 200 + {user} + write to db  -- write - read db
    // DELETE => 204 + Delete from db  -- write - delete db


