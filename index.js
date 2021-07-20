const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Get all posts
app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
});

// Get all users
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
})

// Create a post
app.post('/posts', async (req, res) => {
    const { title, content, authorEmail } = req.body;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { email: authorEmail }}
        }
    });

    res.json(newPost);
});

// Create a user
app.post('/users', async (req, res) => {
    const { name, email, posts } = req.body;

    const postData = posts.map(post => {
        return { title: post.title, content: post.content };
    });

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            posts: {
                create: postData
            }
        }
    });

    res.json(newUser);
});

// Update a post
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content }
    });

    res.json(updatedPost);
});

// Update a user
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { email, name }
    });

    res.json(updatedUser);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;

    const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
    });

    res.json(deletedPost);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    const deletedPosts = prisma.post.deleteMany({
        where: { authorId: Number(id) }
    })

    const deletedUser = prisma.user.delete({
        where: { id: Number(id) }
    });

    const transaction = await prisma.$transaction([deletedPosts, deletedUser]);

    res.json(transaction);
});

app.listen(3000, () => {
    console.log('The server is listening at port 3000.');
});

