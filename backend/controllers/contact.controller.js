import nodemailer from "nodemailer";

export const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const transportUser = process.env.CONTACT_EMAIL_USER;
    const transportPass = process.env.CONTACT_EMAIL_PASS;
    const toAddress = "raoa28005@gmail.com";

    if (!transportUser || !transportPass) {
      console.error("Missing CONTACT_EMAIL_USER or CONTACT_EMAIL_PASS env vars");
      return res.status(500).json({ message: "Email service not configured" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: transportUser,
        pass: transportPass,
      },
    });

    const mailOptions = {
      from: transportUser,
      to: toAddress,
      subject: subject || "New Contact Form Message",
      text: `From: ${name} <${email}>

${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return res.status(500).json({ message: "Failed to send message" });
  }
};
