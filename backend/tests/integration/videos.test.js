const request = require("supertest");
const app = require("../server");

describe("CRUD de Vídeos", () => {
  let token;
  let categoryId;
  let videoId;

  beforeAll(async () => {
    // Criar uma categoria para os vídeos
    const categoryRes = await request(app).post("/categories").send({
      name: "Ação",
    });
    categoryId = categoryRes.body.category.id;

    // Criar um usuário e autenticar para obter token
    await request(app).post("/users").send({
      name: "Teste",
      email: "teste@email.com",
      password: "123456",
    });

    const loginRes = await request(app).post("/login").send({
      email: "teste@email.com",
      password: "123456",
    });

    token = loginRes.body.token;
  });

  test("POST /videos - Deve criar um vídeo", async () => {
    const res = await request(app)
      .post("/videos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Filme Teste",
        url: "https://www.youtube.com/watch?v=test",
        categoryId: categoryId,
        description: "Descrição do vídeo",
      });

    expect(res.status).toBe(201);
    videoId = res.body.video.id;
  });

  test("GET /videos - Deve listar vídeos", async () => {
    const res = await request(app).get("/videos");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("DELETE /videos/:id - Deve deletar um vídeo", async () => {
    const res = await request(app)
      .delete(`/videos/${videoId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Vídeo deletado!");
  });
});
