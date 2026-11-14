if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');

const cookieParser = require('cookie-parser');
const createSupabase = require('./utils/supabaseClient');


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
app.use(cookieParser());
app.use(async (req, res, next) => {
  req.supabase = createSupabase(req, res);
  const { data } = await req.supabase.auth.getUser();
  res.locals.currentUser = data?.user || null;
  next();
});

app.use('/posts',postRoutes);
app.use('/users',userRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.all('/{*splat}', (req, res, next) => {
    console.log('404:', req.method, req.originalUrl);
  next(new ExpressError('ページが見つかりません', 404));
});

app.use((err, req, res, next) => {
    console.log(err);
  const { statusCode = 500 } = err;
  if (!err.message) err.message = '問題が発生しました';
  res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log(`ポート3000でリクエスト受付中`);
});



