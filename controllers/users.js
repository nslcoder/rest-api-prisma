const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all users
const getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

// Create a user
const createUser = async (req, res) => {
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
};

// Update a user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, name } = req.body;

    const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { email, name }
    });

    res.json(updatedUser);
};


// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;

    const deletedPosts = prisma.post.deleteMany({
        where: { authorId: Number(id) }
    })

    const deletedUser = prisma.user.delete({
        where: { id: Number(id) }
    });

    const transaction = await prisma.$transaction([deletedPosts, deletedUser]);

    res.json(transaction);
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}