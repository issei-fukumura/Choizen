const { postSchema } = require('./schemas');
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
  if (!res.locals.currentUser) return res.redirect('/login');
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


