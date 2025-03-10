const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
const jwt = require('@fastify/jwt');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();
const prisma = new PrismaClient();

const app = fastify;

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(jwt, { secret: process.env.JWT_SECRET || 'supersecret' });


app.decorate("authenticate", async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        return reply.code(401).send({ error: "Token inválido ou não fornecido" });
    }
});


app.get('/', async (request, reply) => {
    return { message: 'API is working!' };
});



app.post('/users', async (request, reply) => {
    const { name, email, password } = request.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });
        return reply.code(201).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao criar usuário' });
    }
});

app.get("/users", async (request, reply) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true
            }
        });
        return reply.send(users);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return reply.code(500).send({ error: "Erro ao buscar usuários" });
    }
});

app.put('/users/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    const { name, email, password } = request.body; // Senha pode ser opcional na atualização
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return reply.code(404).send({ error: 'Usuário não encontrado' });
        }

        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, password: password ? await bcrypt.hash(password, 10) : user.password }, // Atualiza a senha se fornecida
        });
        return reply.send({ message: 'Usuário atualizado!', updatedUser });
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error);
        return reply.code(400).send({ error: 'Erro ao atualizar usuário' });
    }
});

app.delete('/users/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    try {
        const user = await prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user) {
            return reply.code(404).send({ error: 'Usuário não encontrado' });
        }

        await prisma.user.delete({ where: { id: Number(id) } });
        return reply.send({ message: 'Usuário deletado!' });
    } catch (error) {
        console.error("Erro ao excluir o usuário:", error);
        return reply.code(400).send({ error: 'Erro ao deletar usuário' });
    }
});



app.post('/categories', { preHandler: app.authenticate }, async (request, reply) => {
    const { name } = request.body;
    try {
        const category = await prisma.category.create({ data: { name } });
        return reply.code(201).send({ message: 'Categoria criada!', category });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao criar categoria' });
    }
});

app.get('/categories', async (request, reply) => {
    try {
        const categories = await prisma.category.findMany();
        return reply.send(categories);
    } catch (error) {
        return reply.code(500).send({ error: 'Erro ao buscar categorias' });
    }
});

app.put('/categories/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    const { name } = request.body;
    try {
        const category = await prisma.category.update({ where: { id: Number(id) }, data: { name } });
        return reply.send({ message: 'Categoria atualizada!', category });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao atualizar categoria' });
    }
});

app.delete('/categories/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    try {
        await prisma.category.delete({ where: { id: Number(id) } });
        return reply.send({ message: 'Categoria deletada!' });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao deletar categoria' });
    }
});

app.post('/videos', { preHandler: app.authenticate }, async (request, reply) => {
    const { title, url, categoryId, description } = request.body;

    console.log(" Recebendo dados para inserção:", request.body);


    if (!title || !url || !categoryId || !description) {
        console.log(" Erro: Campos obrigatórios faltando!");
        return reply.code(400).send({ error: 'Todos os campos são obrigatórios!' });
    }

    try {

        const categoryExists = await prisma.category.findUnique({
            where: { id: Number(categoryId) }
        });

        if (!categoryExists) {
            console.log("Erro: Categoria não encontrada!", categoryId);
            return reply.code(400).send({ error: 'Categoria não encontrada!' });
        }


        const video = await prisma.video.create({
            data: {
                title,
                description,
                url,
                categoryId: Number(categoryId),
            }
        });

        console.log("Vídeo criado com sucesso!", video);
        return reply.code(201).send({ message: 'Vídeo cadastrado com sucesso!', video });

    } catch (error) {
        console.error(" Erro ao cadastrar vídeo:", error);
        return reply.code(500).send({ error: 'Erro ao cadastrar vídeo' });
    }
});


app.get('/videos', async (request, reply) => {
    try {
        const videos = await prisma.video.findMany({
            include: { category: true }
        });
        return reply.send(videos);
    } catch (error) {
        return reply.code(500).send({ error: 'Erro ao buscar vídeos' });
    }
});

app.put('/videos/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    const { title, url, categoryId } = request.body;
    try {
        const video = await prisma.video.update({
            where: { id: Number(id) },
            data: { title, url, categoryId: Number(categoryId) }
        });
        return reply.send({ message: 'Vídeo atualizado!', video });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao atualizar vídeo' });
    }
});

app.delete('/videos/:id', { preHandler: app.authenticate }, async (request, reply) => {
    const { id } = request.params;
    try {
        await prisma.video.delete({ where: { id: Number(id) } });
        return reply.send({ message: 'Vídeo deletado!' });
    } catch (error) {
        return reply.code(400).send({ error: 'Erro ao deletar vídeo' });
    }
});


app.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return reply.code(400).send({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return reply.code(400).send({ error: 'Senha incorreta' });
    }

    const token = app.jwt.sign({ id: user.id, email: user.email });

    return reply.send({ token });
});


const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
