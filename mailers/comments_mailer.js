const nodeMailer=require('../config/nodemailer');


//this is another way of exporting a method
module.exports.newComment=(comment)=>{
    console.log('Inside new comment mailer',comment);

    nodeMailer.transporter.sendMail({
        from:'sgamilcom77@gmail.com ',
        to:`${comment.email}`,
        subject:'New Comment Published',
        html:'<h1>Yup,your comment is now published</h1>',
    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}