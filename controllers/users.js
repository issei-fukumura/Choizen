const ExpressError = require('../utils/ExpressError');

module.exports.registerForm = (req, res) => res.render('users/register');
module.exports.loginForm = (req, res) => res.render('users/login');

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = await req.supabase.auth.signUp({ email, password });
//   if (error) throw new ExpressError('登録できませんでした', 400);
if (error) {
    throw new ExpressError('登録できませんでした', 400);
  }
  res.redirect('/posts');
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = await req.supabase.auth.signInWithPassword({ email, password });
  if (error) throw new ExpressError('メールアドレスまたはパスワードが正しくありません', 401);
  res.redirect('/posts');
};

module.exports.logout = async (req, res) => {
  await req.supabase.auth.signOut();
  res.redirect('/users/login');
};


