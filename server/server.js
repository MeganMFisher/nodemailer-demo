require('dotenv').config();
const express = require('express')
    , bodyParser = require('body-parser')
    , nodemailer = require('nodemailer');

const app = express()

app.use(bodyParser.json());

app.post('/api/joinMailingList', (req, res) => {

    const {firstName, lastName, emailAddress} = req.body

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: process.env.USER_EMAIL, //sender email address
            pass: process.env.USER_PASS //sender email password
        }
    });

    let mailOptions = {
        from: `"Mailing List Request" <${process.env.USER_EMAIL}>`, // sender email address
        to: emailAddress, //email address you want to send email to.
        subject: 'Welcome!', // Subject line
        text: `Thanks for joining our mailing list ${firstName} ${lastName}!`  //body of email.       
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send(error)
        }
        res.status(200).send(info);
    });
})





app.listen(4000, () => console.log(`Listening on port 4000`))
