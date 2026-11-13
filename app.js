const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');

const app = express();
app.use(methodOverride('_method'));
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Choizen'

mongoose.connect(dbUrl)
    .then(() => {
        console.log('MongoDBコネクションOK！！');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー！！！');
        console.log(err);
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts',postRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.all('/{*splat}', (req, res, next) => {   // Express 4なら app.all('*', ...)
  next(new ExpressError('ページが見つかりません', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = '問題が発生しました';
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log(`ポート3000でリクエスト受付中`);
});



