// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";

// export const sendMail = async({email,emailType,userId}:any) => {
//         try {
//             const hashedToken = await bcryptjs.hash(userId.toString(),10)
//             if(emailType=="VERIFY"){
//                 await User.findByIdAndUpdate(userId,{
//                 verifyToken:hashedToken,
//                 verifyTokenExpiry:Date.now()+3600000
//             })
//             }
//             else if(emailType=="RESET"){
//                await User.findByIdAndUpdate(userId,{
//                 forgotPasswordToken:hashedToken,
//                 forgotPasswordTokenExpiry:Date.now()+3600000
//             }) 
//             }

//            var transport = nodemailer.createTransport({
//                 host: "sandbox.smtp.mailtrap.io",
//                 port: 2525,
//                 auth: {
//                 user: "f5f8958ba4e3ea",
//                 pass: "75a0ea62e6c965"
//                 }
//             });
//             const mailOptions = {
//                 from:"authentication@gmail.com",
//                 to:email,
//                 subject:emailType==="VERIFY"? "Verify your Email" : "Reset ypur password",
//                 html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
//                     emailType==="VERIFY"? "Verify your Email" : "Reset ypur password"}
//                     or copy and paste the link below in your browser.
//                     <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`

//             }
//             const mailResponse=await transport.sendMail(mailOptions)
//             return mailResponse;
//         } catch (error:any) {
//           throw new Error(error.message)  
//         }
// }

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    // ✅ generate random token
    const token = crypto.randomBytes(32).toString("hex");

    // ✅ hash token for DB
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // ✅ transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f5f8958ba4e3ea",
        pass: "75a0ea62e6c965",
      },
    });

    // ✅ correct URL based on type
    const url =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/reset-password?token=${token}`;

    const mailOptions = {
      from: "authentication@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your Email"
          : "Reset your password",
      html: `
        <p>
          Click <a href="${url}">here</a> to ${
        emailType === "VERIFY"
          ? "verify your email"
          : "reset your password"
      }.
          <br/>
          Or copy this link:
          <br/>
          ${url}
        </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    throw new Error(error.message);
  }
};