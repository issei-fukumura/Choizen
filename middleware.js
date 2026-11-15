const { postSchema, registerSchema, loginSchema, usernameSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false,
  });
  if (error) {
    return next(new ExpressError(error.details.map(d => d.message).join('、'), 400));
  }
  req.body = value;
  next();
};


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.user) return res.redirect('/users/login');
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


module.exports.validatePost = validate(postSchema);
module.exports.validateRegister = validate(registerSchema);
module.exports.validateLogin = validate(loginSchema);
module.exports.validateUsername = validate(usernameSchema);


