const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200,
    },
    authorId: {
        type: String,
        required: true,
        index: true,
    },
});











module.exports = mongoose.model('Post', postSchema);


