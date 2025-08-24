const Enquiry = require('../models/Enquiry');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS    
  }
});


exports.submitEnquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    //  Save to MongoDB
    const newEnquiry = new Enquiry({ name, email, phone, message });
    await newEnquiry.save();

    // To Send Email Notification
    await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL_USER}>`,  
      to: "vmprosperitygroup@gmail.com",            
      subject: "Received New Enquiry!",
      html: `<h3>New Enquiry Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>`
    });

    res.status(200).json({ message: "Enquiry submitted successfully!" });
  } catch (err) {
    console.error("Error submitting enquiry:", err);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};
