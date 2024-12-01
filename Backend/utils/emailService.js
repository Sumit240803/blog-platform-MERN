import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import handlebars from "handlebars"
import { fileURLToPath } from "url";
dotenv.config();
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.USER,
        pass : process.env.PASS
    },
})

const sendMail = (email  , otp) =>{
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const htmlFilePath = path.join(__dirname ,'templates' ,'email.html');
    fs.readFile(htmlFilePath , 'utf-8', (err,htmlContent)=>{
        if(err){
            console.log(err);
            return;
        }
        const template = handlebars.compile(htmlContent);
        const htmlToSend = template({otp : otp});
        const mailOptions = {
            from: process.env.USER,  // Your email address
            to: email,
            subject: "OTP login",
            html: htmlToSend,  // The final HTML content with dynamic data
          };
        transporter.sendMail(mailOptions , (error,info)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log("mail sent" , info.response);
            }
        })
    })
}
export default sendMail;