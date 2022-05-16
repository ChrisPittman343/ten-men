const request = require("supertest");
const app = require("../app");
const config = require("../config");

test("Server is running", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
});

test("Correct password logs in successfully", async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ password: config.password });
  expect(res.statusCode).toBe(418);
});

test("Bad password fails login", async () => {
  const res = await request(app)
    .post("/api/login")
    .send({ password: "An incorrect password" });
  expect(res.statusCode).toBe(403);
});

test("Recognizes an admin session", async () => {
  await request(app).post("/api/login").send({ password: config.password });
  const res = await request(app).get("/api/isAdmin");
  console.log(res.headers);
  expect(res.statusCode).toBe(200);
});

test("Recognizes a NON-admin session", async () => {
  const res = await request(app).get("/api/isAdmin");
  expect(res.statusCode).toBe(401);
});

afterAll(() => {
  app.close();
});
