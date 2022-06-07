import nodemailer from "nodemailer";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 401;
    res.json({ message: "You are not signed in." });
    return;
  }
  
  // Handle POST request
  if (req.method === "POST") {
    var transporter = nodemailer.createTransport({
      service: "yahoo",
      auth: {
        user: "christerrambuyon12@gmail.com",
        pass: "Masteroffire07!",
      },
    });

    var mailOptions = {
      from: "juzzteezy@gmail.com",
      to: req.body.email,
      subject: "Document Issued",
      html: { path: "public/emailtemplate.html" },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.statusCode = 200;
    return res.json({ message: "Email sent" });
   
  }
};

export async function sendEmail (to, subject) {
  var transporter = nodemailer.createTransport({
     service: 'gmail',
    auth: {
      user: "christerrambuyon12@gmail.com",
      pass: "fhgmliiybgpapahv",
    },
  });

  var mailOptions = {
    to: to,
    subject: subject,
    html: { path: "public/emailtemplate.html" },
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return { message: "Error sending email" };
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
