const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/Choizen')
    .then(() => {
        console.log('MongoDBコネクションOK!!');
    })
    .catch(err => {
        console.log('MongoDBコネクションエラー!!!');
        console.log(err);
    });

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts',postRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log(`ポート3000でリクエスト受付中`);
});



