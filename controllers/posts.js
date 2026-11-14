const ExpressError = require('../utils/ExpressError');

module.exports.index = async (req, res) => {
  const { data: posts, error } = await req.supabase
    .from('posts')
    .select('*, likes(count)')            // 件数を集計して取得
    .order('created_at', { ascending: false });
  if (error) throw new ExpressError('投稿を取得できませんでした', 500);

  let likedIds = new Set();
  if (req.user) {
    const { data: mine } = await req.supabase
      .from('likes').select('post_id').eq('user_id', req.user.id);
    likedIds = new Set((mine || []).map(l => l.post_id));
  }
  res.render('posts/index', { posts, likedIds });
};


module.exports.newPostForm = (req, res) => {
  res.render('posts/new');
};

module.exports.showPost = async (req, res) => {
  const { data: post, error } = await req.supabase
    .from('posts').select('*, likes(count)')
    .eq('id', req.params.id).maybeSingle();
  if (error) throw new ExpressError('投稿を取得できませんでした', 500);
  if (!post) throw new ExpressError('投稿が見つかりません', 404);

  let liked = false;
  if (req.user) {
    const { data } = await req.supabase
      .from('likes').select('post_id')
      .eq('post_id', post.id).eq('user_id', req.user.id).maybeSingle();
    liked = !!data;
  }
  res.render('posts/show', { post, liked });
};

module.exports.editPostForm = async (req, res) => {
  const { data: post, error } = await req.supabase
    .from('posts').select('*').eq('id', req.params.id).maybeSingle();
  if (error) throw new ExpressError('投稿を取得できませんでした', 500);
  if (!post) throw new ExpressError('投稿が見つかりません', 404);
  res.render('posts/edit', { post });
};

module.exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  // author_id は DB の default auth.uid() が入れる
  const { error } = await req.supabase.from('posts').insert({ title, content });
  if (error) throw new ExpressError('投稿できませんでした', 400);
  res.redirect('/posts');
};

module.exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { data, error } = await req.supabase
    .from('posts').update({ title, content }).eq('id', id).select();
  if (error) throw new ExpressError('更新できませんでした', 400);
  if (!data.length) throw new ExpressError('投稿が見つかりません', 404);
  res.redirect(`/posts/${id}`);
};

module.exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await req.supabase
    .from('posts').delete().eq('id', id).select();
  if (error) throw new ExpressError('削除できませんでした', 400);
  if (!data.length) throw new ExpressError('投稿が見つかりません', 404);
  res.redirect('/posts');
};

module.exports.toggleLike = async (req, res) => {
  const { id } = req.params;

  const { data: existing, error: selErr } = await req.supabase
    .from('likes').select('post_id')
    .eq('post_id', id).eq('user_id', req.user.id).maybeSingle();
  if (selErr) throw new ExpressError('処理に失敗しました', 500);

  if (existing) {
    const { error } = await req.supabase
      .from('likes').delete()
      .eq('post_id', id).eq('user_id', req.user.id);
    if (error) throw new ExpressError('いいねを取り消せませんでした', 400);
  } else {
    const { error } = await req.supabase.from('likes').insert({ post_id: id });
    if (error) throw new ExpressError('いいねできませんでした', 400);
  }

  res.redirect(req.get('Referer') || '/posts');
};










