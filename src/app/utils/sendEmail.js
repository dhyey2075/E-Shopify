import nodemailer from 'nodemailer';

// Create a transporter
export default async function sendEmail(email, subject, text, attachment) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dhyeyhparekh7@gmail.com', // Your email address
          pass: 'encx blfq psam piwj'   // Your email password
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      
      // Email options
      let mailOptions = {
        from: 'dhyeyhparekh7@gmail.com',
        to: email,
        subject: subject,
        text: text,
        attachments: attachment
      };
      
      // Send the email
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
      
}