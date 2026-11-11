

module.exports.home = (req, res) => {
    res.render('home');
};

module.exports.index = (req, res) => {
    res.render('posts/index');
};

module.exports.newPostForm = (req, res) => {
  res.render('posts/new');
};

module.exports.showPost = (req, res) => {
  res.render('posts/show');
}


module.exports.editPostForm = (req, res) => {
  res.render('posts/edit');
};  

