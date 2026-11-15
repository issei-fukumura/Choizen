const ExpressError = require('../utils/ExpressError');

module.exports.registerForm = (req, res) => res.render('users/register');
module.exports.loginForm = (req, res) => res.render('users/login');

module.exports.register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = await req.supabase.auth.signUp({ email, password });
  if (error) {
    console.error('signUp error:', error.message, error.status, error.code);
    throw new ExpressError('登録できませんでした', 400);
  }
  res.redirect('/users/username');
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


module.exports.usernameForm = (req, res) => res.render('users/username');

module.exports.setUsername = async (req, res) => {
  const { username } = req.body;
  if (!username) return res.redirect('/posts');

  const { error } = await req.supabase
    .from('profiles').update({ username }).eq('id', req.user.id);
  if (error?.code === '23505') throw new ExpressError('その名前は使われています', 409);
  if (error) throw new ExpressError('保存できませんでした', 400);
  res.redirect('/posts');
};







