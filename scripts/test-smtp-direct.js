// Script để test SMTP connection trực tiếp (không qua API)
// Chạy: node scripts/test-smtp-direct.js
// Lưu ý: Cần có file .env.local với các biến môi trường

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// Đọc .env.local file
function loadEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('❌ File .env.local not found!');
    process.exit(1);
  }

  const envFile = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envFile.split('\n').forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  // Set vào process.env
  Object.keys(envVars).forEach((key) => {
    process.env[key] = envVars[key];
  });
}

loadEnvFile();

async function testSMTPDirect() {
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASSWORD',
    'RECEIVER_EMAIL',
  ];

  const missing = requiredVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.verify();

    // Form data structure matching form-advise.tsx FormType
    // FormType: { Name: string; Phone: string; Email: string; Message: string; }

    const info = await transporter.sendMail({
      from: `"${form.Name}" <${process.env.SMTP_USER}>`,
      replyTo: form.Email,
      to: process.env.RECEIVER_EMAIL,
      subject: `📧 Test Email from SMTP Setup - ${form.Name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
              📧 Test Email - Contact Form Data
            </h2>
            <div style="margin-top: 20px;">
              <p><strong style="color: #555;">👤 Name:</strong> ${form.Name}</p>
              <p><strong style="color: #555;">📧 Email:</strong> <a href="mailto:${form.Email}" style="color: #4CAF50;">${form.Email}</a></p>
              <p><strong style="color: #555;">📱 Phone:</strong> <a href="tel:${form.Phone}" style="color: #4CAF50;">${form.Phone}</a></p>
              <p><strong style="color: #555;">💬 Message:</strong></p>
              <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
                ${form.Message}
              </p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;">
              <p style="color: #888; font-size: 12px;">
                <strong>Time:</strong> ${new Date().toLocaleString()}<br>
                <strong>SMTP Host:</strong> ${process.env.SMTP_HOST}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Test Email - Contact Form Data
==============================

Name: ${form.Name}
Email: ${form.Email}
Phone: ${form.Phone}

Message:
--------
${form.Message}

---
Time: ${new Date().toLocaleString()}
SMTP Host: ${process.env.SMTP_HOST}
      `.trim(),
    });

    console.log('✅ Email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Check inbox at:', process.env.RECEIVER_EMAIL, '\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Common issues:');
    console.log('   1. Check SMTP credentials (username and password)');
    console.log('   2. For Gmail, use App Password, not regular password');
    console.log('   3. Check if "Less secure app access" is enabled (if required)');
    console.log('   4. Verify SMTP_HOST and SMTP_PORT are correct\n');
    process.exit(1);
  }
}

testSMTPDirect();

