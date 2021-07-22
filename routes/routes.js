const express = require('express');
const router = express.Router();

const { getPosts, createPost, updatePost, deletePost } = require('../controllers/posts');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');

router.get('/posts', getPosts);
router.get('/users', getUsers);
router.post('/posts', createPost);
router.post('/users', createUser);
router.put('/posts/:id', updatePost);
router.put('/users/:id', updateUser);
router.delete('/posts/:id', deletePost);
router.delete('/users/:id', deleteUser);

module.exports = router;
