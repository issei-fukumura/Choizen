

module.exports.home = (req, res) => {
    res.render('posts/home');
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

