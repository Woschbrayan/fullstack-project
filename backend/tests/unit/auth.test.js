const bcrypt = require("bcrypt");
const fastify = require("fastify");

const app = fastify();
app.register(require("@fastify/jwt"), { secret: "supersecret" });

describe("Auth Functions", () => {
  test("Deve gerar um hash de senha e validá-lo corretamente", async () => {
    const senha = "123456";
    const hash = await bcrypt.hash(senha, 10);
    const senhaValida = await bcrypt.compare(senha, hash);
    expect(senhaValida).toBe(true);
  });

  test("Deve gerar um token JWT válido", async () => {
    await app.ready(); // Certifica que o plugin JWT está carregado
    const payload = { id: 1, email: "teste@email.com" };
    const token = app.jwt.sign(payload);
    expect(typeof token).toBe("string");
  });
});
