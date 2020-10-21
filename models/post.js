const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // includes the array of id's of comment in the post schema
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},

    {
        timestamps: true
    }
);
//fine
// yes thanks a lot :)...plz resolve
// ok
const Post = mongoose.model('Post', postSchema);
module.exports = Post;