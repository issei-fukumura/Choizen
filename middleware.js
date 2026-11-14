const { postSchema,userSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.validatePost = (req, res, next) => {
  const { error, value } = postSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });
if (error) {
  const msg = error.details.map(d => d.message).join('、');
  return next(new ExpressError(msg, 400));
}
  req.body = value;
  next();
};


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.user) return res.redirect('/users/login');
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) return next(new ExpressError('投稿が見つかりません', 404));
  if (post.authorId !== req.user.id) {
    return next(new ExpressError('この操作を行う権限がありません', 403));
  }
  next();
};
module.exports.isAuthor = async (req, res, next) => {
  const { data: post, error } = await req.supabase
    .from('posts').select('author_id').eq('id', req.params.id).maybeSingle();
  if (error) return next(new ExpressError('投稿を取得できませんでした', 500));
  if (!post) return next(new ExpressError('投稿が見つかりません', 404));
  if (post.author_id !== req.user.id) {
    return next(new ExpressError('権限がありません', 403));
  }
  next();
};

module.exports.validateUser = (req, res, next) => {
  const { error, value } = userSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });
  if (error) {
    const msg = error.details.map(d => d.message).join('、');
    return next(new ExpressError(msg, 400));
  }
  req.body = value;
  next();
};


