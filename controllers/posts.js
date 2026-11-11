const Post = require('../models/post');



module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render('posts/index', { posts });
};

module.exports.newPostForm = (req, res) => {
  res.render('posts/new');
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/show', { post });
}


module.exports.editPostForm = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('posts/edit', { post });
};

module.exports.createPost = async (req, res) => {
  const newPost = req.body;
  const post = new Post(newPost);
  await post.save();
  res.redirect('/posts');
}













