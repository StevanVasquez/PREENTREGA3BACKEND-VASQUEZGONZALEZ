import nodemailer from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config/config.js";

export const sendMail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    user: "kev.vas2701@gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });
  try {
    let result = await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject: "Confirmación de compra",
      html: `
        <div>
          <h1>La compra se ha realizado satisfactoriamente.</h1>
        </div>
      `,
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};