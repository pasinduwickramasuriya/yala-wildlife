import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address (e.g., pasindusadanjana17@gmail.com)
    pass: process.env.EMAIL_PASS, // Your Gmail App Password (not your regular password)
  },
});

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON data
    const data = await request.json();
    const { name, phone, email, date, country, tourPackage, message } = data;

    // Validate required fields
    if (!name || !phone || !email || !date || !tourPackage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email to you (admin) with booking details
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com", // Your Gmail address
      subject: `New Booking Request: ${tourPackage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">New Booking Received</h2>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">A customer has submitted a booking request.</p>
          <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Country:</strong> ${country || "Not provided"}</p>
            <p><strong>Tour Package:</strong> ${tourPackage}</p>
            <p><strong>Message:</strong> ${message || "None"}</p>
          </div>
          <p style="color: #4b5563; margin-top: 20px;">Please contact the customer to confirm their booking.</p>
        </div>
      `,
    };

    // Confirmation email to the customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email, // Customer's email from the form
      subject: `Booking Confirmation - ${tourPackage}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
          <h2 style="color: #1f2937; font-size: 24px; margin-bottom: 16px;">Thank You for Booking!</h2>
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 20px;">We've received your request for ${tourPackage}.</p>
          <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Tour Package:</strong> ${tourPackage}</p>
          </div>
          <p style="color: #4b5563; margin-top: 20px;">We'll contact you soon to confirm availability and next steps.</p>
          <p style="color: #4b5563;">Questions? Reply to this email or contact us at ${process.env.EMAIL_USER}.</p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminEmail);
    await transporter.sendMail(customerEmail);

    return NextResponse.json({ success: true, message: "Booking submitted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process booking", details: errorMessage },
      { status: 500 }
    );
  }
}