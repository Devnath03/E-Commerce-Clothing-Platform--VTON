// sendOrderConfirmationEmail.js
const nodemailer = require('nodemailer');

const sendOrderConfirmationEmail = async (orderDetails) => {
  const { email, firstName, lastName, items, amount } = orderDetails;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your preferred email service
    auth: {
      user: 'your-email@gmail.com',  // Replace with your email
      pass: 'your-email-password',   // Use OAuth or environment variables for security
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: `Order Confirmation - Order #${orderDetails.orderId}`,
    text: `
      Hello ${firstName} ${lastName},
      
      Thank you for your order! Here are your order details:
      
      Order ID: ${orderDetails.orderId}
      Items: ${items.map(item => `${item.name} x${item.quantity}`).join('\n')}
      Total Amount: $${amount}

      We will notify you once your order is shipped.
      
      Best regards,
      Your Company Name
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderConfirmationEmail;
