const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');




router.get('/',posts.home);

router.get('/new', posts.newPostForm);

router.get('/:id', posts.showPost);

router.get('/:id/edit', posts.editPostForm);





module.exports = router;

