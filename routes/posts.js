const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const user = require('../controllers/users');
const {validatePost,validateUser} = require('../middleware');
const mongoose = require('mongoose');
const ExpressError = require('../utils/ExpressError');




router.route('/')
    .get(posts.index)
    .post(validatePost, posts.createPost);

router.get('/new', posts.newPostForm);

router.route('/:id')
     .get(posts.showPost)
     .put(validatePost, posts.updatePost)
     .delete(posts.deletePost);

router.get('/:id/edit', posts.editPostForm);



router.param('id', (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return next(new ExpressError('投稿が見つかりません', 404));
  }
  next();
});



module.exports = router;

