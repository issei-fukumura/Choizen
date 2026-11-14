const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const {validatePost, isLoggedIn, isAuthor} = require('../middleware');
const ExpressError = require('../utils/ExpressError');
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;




router.route('/')
    .get(posts.index)
    .post(isLoggedIn, validatePost, posts.createPost);

router.get('/new',isLoggedIn, posts.newPostForm);

router.route('/:id')
     .get(posts.showPost)
     .put(isLoggedIn, isAuthor, validatePost, posts.updatePost)
     .delete(isLoggedIn, isAuthor, posts.deletePost);

router.get('/:id/edit', isLoggedIn, isAuthor, posts.editPostForm);

router.post('/:id/like', isLoggedIn, posts.toggleLike);


router.param('id', (req, res, next, id) => {
  if (!UUID_RE.test(id)) {
    return next(new ExpressError('投稿が見つかりません', 404));
  }
  next();
});



module.exports = router;

