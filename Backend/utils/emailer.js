import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log("========email", process.env.EMAIL_USER);


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export async function sendApprovalEmail(toemail) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: toemail,
        subject: "Your account has been approved",
        text: "Congratulations! Your seller account has been approved by admin."
    });
    console.log("Approval email sent to:", toemail);
    console.log("Approval email sent with info:", info);
    return info;
}