const request = require("supertest");
const app = require("../server"); // Importa o servidor Fastify

describe("API Endpoints", () => {
  test("GET / - Deve retornar status 200 e mensagem de sucesso", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("API is working!");
  });

  test("POST /users - Deve criar um usuário e retornar 201", async () => {
    const res = await request(app).post("/users").send({
      name: "Teste",
      email: "teste@email.com",
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Usuário criado com sucesso!");
  });

  test("POST /login - Deve autenticar um usuário e retornar um token", async () => {
    const res = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
