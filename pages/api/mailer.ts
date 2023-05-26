import nodemailer from "nodemailer";

// Create a transporter using your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.APP_PASS,
  }
})

// Function to send the welcome email with the OTP
export const sendWelcomeEmail = async (email: string, link: string,otp:string) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Welcome to EtherCast",
    html: `
      <h1>Welcome to EtherCast, the revolutionary blockchain-based e-voting system!</h1>
      <p>
        To get started, please click on the following link to access our login page: <a href="${link}">Login to EtherCast</a>
        and your OTP is : <b> "${otp}" </b>
        </p>
      <p>
      We are excited to have you join our <b>secure and transparent platform </b>, where your vote truly matters. 
      With EtherCast, you can participate in elections and make your voice heard with just a few clicks.
    </p>
      <p>
        Join us on EtherCast and be part of a new era in e-voting.
        <br> <b>Your vote matters , and we are here to make it count! </b>
      </p>
      <p>
        If you have any questions or need assistance, feel free to reach out to our support team. We are here to ensure your experience with EtherCast is seamless and enjoyable.
      </p>
      <p>
        Thank you for choosing EtherCast. 
        <br>
        Together, let's create a stronger, more inclusive democracy.
      </p>
      <p> Regards, <br> The EtherCast Team </p>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully.");
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

export const sendRecoveryEmail = async (email: string,otp:string) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Password Recovery for EtherCast Login",
    html: `
      <h1>Welcome to EtherCast, the revolutionary blockchain-based e-voting system!</h1>
      <p>
        As you have requested for password recovery, this is your your OTP is :
        <h4> <b> "${otp}" </b> </h4>
        </p>
      
      <p>
        Join us on EtherCast and be part of a new era in e-voting.
        <br> <b>Your vote matters , and we are here to make it count! </b>
      </p>
      <p>
        If you have any questions or need assistance, feel free to reach out to our support team. We are here to ensure your experience with EtherCast is seamless and enjoyable.
      </p>
      <p>
        Thank you for choosing EtherCast. 
        <br>
        Together, let's create a stronger, more inclusive democracy.
      </p>
      <p> Regards, <br> The EtherCast Team </p>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log("Recovery email sent successfully.");
  } catch (error) {
    console.error("Error sending Recovery email:", error);
  }
};

export const sendCandidateEmail = async (email: string, link: string,otp:string) => {
  const mailOptions = {
    from: process.env.GMAIL,
    to: email,
    subject: "Welcome to EtherCast",
    html: `
      <h1>Welcome to EtherCast, the revolutionary blockchain-based e-voting system!</h1>
      <p>
      You have been registered as a candidate for the upcoming election.
        To get started, please click on the following link to access our login page: <a href="${link}">Login to EtherCast</a>
        and your OTP is : <b> "${otp}" </b>
        </p>
      <p>
      We are excited to have you join our <b>secure and transparent platform </b>, where your vote truly matters. 
      With EtherCast, you can participate in elections and make your voice heard with just a few clicks.
    </p>
      <p>
        Join us on EtherCast and be part of a new era in e-voting.
        <br> <b>Your vote matters , and we are here to make it count! </b>
      </p>
      <p>
        If you have any questions or need assistance, feel free to reach out to our support team. We are here to ensure your experience with EtherCast is seamless and enjoyable.
      </p>
      <p>
        Thank you for choosing EtherCast. 
        <br>
        Together, let's create a stronger, more inclusive democracy.
      </p>
      <p> Regards, <br> The EtherCast Team </p>
    `,
  };
  

  try {
    await transporter.sendMail(mailOptions);
    console.log("Candidate email sent successfully.");
  } catch (error) {
    console.error("Error sending candidate email:", error);
  }
};
