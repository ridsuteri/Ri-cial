const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function (req, res) {

    let post = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of Posts",
        posts: post
    });
}

module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            // req.flash('success', 'Post Deleted')
            return res.json(200, {
                message: 'Post and associated comments deleted successfully'
            });
        } else {

            return res.json(401, {
                message: "you cannot delete this post"
            });
        }
    } catch (err) {
        // req.flash('error', err);
        console.log(`Err ${err}`);
        return res.json(500, {
            message: "Internal Server ERROR"
        });
    }

}