const { Resend } = require('resend');

const sendMail = async (options) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
        from: `CurioMart <${process.env.SMPT_HOST}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    });

    if (error) {
        console.error(error);
        return;
    }

    if (data) {
        console.log(data);
        return;
    }
};

module.exports = sendMail;