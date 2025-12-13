import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config({ path: "./.env" });


console.log("------------email",process.env.EMAIL_USER);
console.log("emailer transporter hit");


export const transporter = nodemailer.createTransport({
    
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

await transporter.verify();
console.log("SMTP email ready");


export async function sendApprovalEmail(toemail) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toemail,
        subject: "Your Food Partner Account Has Been Approved",
        text: 
        "Congratulations! We are pleased to inform you that your Food Partner account has been approved by our team. You may now access your dashboard and begin managing your listings, menu items, and business settings. Thank you for choosing our platform. We look forward to a successful partnership."
    });
    console.log("Approval email sent to:", toemail);
    console.log("Approval email sent with info:", info);
    return info;
}