const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');









const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))




app.use('/posts',postRoutes);

app.listen(3000, () => {
    console.log(`ポート3000でリクエスト受付中`);
});



