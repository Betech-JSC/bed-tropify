import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Validate environment variables
function validateEnvVariables() {
  const required = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASSWORD",
    "RECEIVER_EMAIL",
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }
}

// Sanitize input to prevent XSS
function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    validateEnvVariables();

    // Parse and validate request body
    const body = await request.json();
    const { Name, Email, Phone, Message } = body;

    // Log received data for debugging
    console.log("📧 ========================================");
    console.log("📧 Received form data from client:");
    console.log("📧 ========================================");
    console.log("   Name:", Name || "(empty)");
    console.log("   Email:", Email || "(empty)");
    console.log("   Phone:", Phone || "(empty/not provided)");
    console.log(
      "   Message:",
      Message
        ? Message.length > 100
          ? Message.substring(0, 100) + "..."
          : Message
        : "(empty)"
    );
    console.log("📧 ========================================");
    console.log("");

    // Validate required fields
    if (!Name || !Email || !Message) {
      return NextResponse.json(
        { message: "Name, Email, and Message are required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(Email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create transporter with SMTP config
    const smtpPort = Number(process.env.SMTP_PORT);
    if (isNaN(smtpPort) || smtpPort <= 0) {
      throw new Error("Invalid SMTP_PORT configuration");
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Add timeout for connection
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // Verify connection configuration
    await transporter.verify();

    // Validate receiver email is set
    if (!process.env.RECEIVER_EMAIL) {
      throw new Error("RECEIVER_EMAIL is not configured");
    }

    const receiverEmail = process.env.RECEIVER_EMAIL.trim();

    // Sanitize inputs for email content
    const sanitizedName = sanitizeHtml(Name.trim());
    const sanitizedEmail = sanitizeHtml(Email.trim());
    const sanitizedPhone = Phone ? sanitizeHtml(Phone.trim()) : "Not provided";
    const sanitizedMessage = sanitizeHtml(Message.trim());

    // Format phone number for display (add link if available)
    const phoneDisplay = Phone
      ? `<a href="tel:${sanitizedPhone}" style="color: #4CAF50; text-decoration: none;">${sanitizedPhone}</a>`
      : '<span style="color: #999;">Not provided</span>';

    // Email content with improved formatting
    // Người gửi: email của người submit form (từ form)
    // Người nhận: email cố định tropify@gmail.com
    const senderEmail = Email.trim();

    // Lưu ý: Một số SMTP server (như Gmail) có thể yêu cầu "from" phải là email đã authenticated
    // Trong trường hợp đó, chúng ta vẫn dùng SMTP_USER làm "from" nhưng đặt "replyTo" là email của người submit form
    // Điều này đảm bảo người nhận có thể reply trực tiếp cho người submit form
    const mailOptions = {
      from: `"${sanitizedName}" <${sanitizedEmail}>`, // Thử dùng email của người submit form làm người gửi
      replyTo: senderEmail, // Quan trọng: Cho phép reply trực tiếp cho người gửi form
      to: receiverEmail, // Email người nhận cố định: tropify@gmail.com
      subject: `📧 New Contact Form Submission from ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; background-color: #f5f5f5;">
          <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">
                📧 New Contact Form Submission
              </h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px 20px;">
              <p style="color: #666; margin: 0 0 20px 0; font-size: 14px;">
                You have received a new message from your website's contact form.
              </p>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #333; font-size: 14px; display: inline-block; min-width: 100px;">👤 Name:</strong>
                    <span style="color: #555; font-size: 14px;">${sanitizedName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #333; font-size: 14px; display: inline-block; min-width: 100px;">📧 Email:</strong>
                    <a href="mailto:${sanitizedEmail}" style="color: #4CAF50; text-decoration: none; font-size: 14px;">${sanitizedEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #333; font-size: 14px; display: inline-block; min-width: 100px;">📱 Phone:</strong>
                    <span style="color: #555; font-size: 14px;">${phoneDisplay}</span>
                  </td>
                </tr>
                 <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e0e0e0;">
                    <strong style="color: #333; font-size: 14px; display: inline-block; min-width: 100px;">💬 Message:</strong>
                    <span style="color: #555; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${sanitizedMessage.replace(
                      /\n/g,
                      "<br>"
                    )}</span>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                <p style="color: #999; font-size: 12px; margin: 0; text-align: center;">
                  This email was sent from the contact form on your website at ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f5f5f5; padding: 15px 20px; text-align: center;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                You can reply directly to this email to respond to ${sanitizedName}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
New Contact Form Submission
===========================

You have received a new message from your website's contact form.

Name: ${Name.trim()}
Email: ${Email.trim()}
Phone: ${Phone ? Phone.trim() : "Not provided"}

Message:
--------
${Message.trim()}

---
This email was sent from the contact form on your website at ${new Date().toLocaleString()}
You can reply directly to this email to respond to ${Name.trim()}
      `.trim(),
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Handle specific error types
    if (error instanceof Error) {
      // Environment variable errors
      if (error.message.includes("Missing required environment variables")) {
        return NextResponse.json(
          {
            message:
              "Server configuration error. Please contact administrator.",
            error: "SMTP not configured",
          },
          { status: 500 }
        );
      }

      // Connection errors
      if (
        error.message.includes("Invalid login") ||
        error.message.includes("authentication failed")
      ) {
        return NextResponse.json(
          {
            message:
              "Email authentication failed. Please check SMTP credentials.",
            error: "Authentication error",
          },
          { status: 500 }
        );
      }

      // Connection timeout errors
      if (
        error.message.includes("timeout") ||
        error.message.includes("ECONNREFUSED")
      ) {
        return NextResponse.json(
          {
            message:
              "Unable to connect to email server. Please try again later.",
            error: "Connection error",
          },
          { status: 500 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        message: "Failed to send email. Please try again later.",
        error:
          process.env.NODE_ENV === "development" ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}
