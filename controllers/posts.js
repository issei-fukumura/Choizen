const Post = require('../models/post');
const ExpressError = require('../utils/ExpressError');


module.exports.index = async (req, res) => {
  const posts = await Post.find({});
  res.render('posts/index', { posts });
};

module.exports.newPostForm = (req, res) => {
  res.render('posts/new');
};

module.exports.showPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ExpressError('投稿が見つかりません', 404);
  res.render('posts/show', { post });
}


module.exports.editPostForm = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) throw new ExpressError('投稿が見つかりません', 404);
  res.render('posts/edit', { post });
};

module.exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = new Post({ title, content });
  await post.save();
  res.redirect('/posts');
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const post = await Post.findByIdAndUpdate(
    id,
    { title, content },
    { runValidators: true } 
  );
  if (!post) throw new ExpressError('投稿が見つかりません', 404);
  res.redirect(`/posts/${id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new ExpressError('投稿が見つかりません', 404);
  res.redirect('/posts');
};











