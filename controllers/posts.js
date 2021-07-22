const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts
const getPosts = async (req, res) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
};

// Create a post
const createPost = async (req, res) => {
    const { title, content, authorEmail } = req.body;

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            author: { connect: { email: authorEmail }}
        }
    });

    res.json(newPost);
};


// Update a post
const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await prisma.post.update({
        where: { id: Number(id) },
        data: { title, content }
    });

    res.json(updatedPost);
};

// Delete a post
const deletePost = async (req, res) => {
    const { id } = req.params;

    const deletedPost = await prisma.post.delete({
        where: { id: Number(id) }
    });

    res.json(deletedPost);
};

module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost
};