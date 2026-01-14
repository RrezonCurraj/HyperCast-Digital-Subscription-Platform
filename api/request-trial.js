import { Resend } from 'resend';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, device, app } = req.body;
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  const SENDER_EMAIL = 'support@hypercast.store'; 
  const ADMIN_EMAIL = 'hypercast24@protonmail.com';

  try {
    // 1. Send confirmation to Customer
    const customerEmail = await resend.emails.send({
      from: `HyperCast Support <${SENDER_EMAIL}>`,
      to: email, 
      subject: `Your 24h Free Trial Request Received! 📺`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb; text-align: center;">Request Received!</h2>
          <p>Hi ${name},</p>
          <p>Thanks for requesting a free trial for your <strong>${device}</strong> (App: ${app}).</p>
          
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #bbf7d0;">
            <p style="margin: 0; color: #166534;"><strong>Status:</strong> Processing</p>
          </div>

          <p><strong>What's next?</strong></p>
          <p>Our team verifies every request manually to prevent spam. You will receive your login details (Username, Password, and URL) in a separate email within <strong>1-12 hours</strong>.</p>
          
          <p>While you wait, make sure you have <strong>${app}</strong> installed on your device!</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} HyperCast. All rights reserved.</p>
        </div>
      `
    });

    // 2. Send Notification to Admin
    const adminEmail = await resend.emails.send({
      from: `HyperCast Bot <${SENDER_EMAIL}>`,
      to: ADMIN_EMAIL,
      subject: `🆕 TRIAL REQUEST: ${name}`,
      html: `
        <h2>New Free Trial Request</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Device:</strong> ${device}</li>
          <li><strong>App:</strong> ${app}</li>
          <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>Login to your panel, create a 24h trial line, and email it to them!</p>
      `
    });

    if (customerEmail.error || adminEmail.error) {
       console.error("Resend Error:", customerEmail.error, adminEmail.error);
       return res.status(500).json({ error: 'Failed to send email' });
    }

    res.status(200).json({ message: 'Trial request received' });
  } catch (error) {
    console.error('Email Server Error:', error);
    res.status(500).json({ message: 'Error processing request', error: error.message });
  }
}
