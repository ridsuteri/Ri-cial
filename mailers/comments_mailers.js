const nodemailer = require('../config/nodemailer');
const nodeMailer = require('../config/nodemailer');

//access the password ass process.env.MAIL_PASSWORD

// another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs');
    console.log('Inside newComment mailer');
    nodemailer.transporter.sendMail({
        from: 'ridatwork@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html: htmlString
    }, (err, info) => {
        if (err) {
            console.log('Error in Sending Mail', err);
            return;
        }

        // console.log("Mail delivered", info);
        return;
    });
}