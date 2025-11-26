import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure email transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: Request) {
  try {
    // Parse Data
    const data = await request.json();
    const { 
      pickupLocation, 
      dropoffLocation, 
      date, 
      time, 
      vehicle, 
      name, 
      phone, 
      email 
    } = data;

    // Validate Required Fields
    if (!pickupLocation || !dropoffLocation || !date || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // --- EMAIL TEMPLATE GENERATOR ---
    const generateEmailHtml = (title: string, subtitle: string, isAdmin: boolean) => `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
        
        <div style="background-color: #166534; padding: 30px 20px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">YALA WILDLIFE TRANSPORT</h1>
          <p style="color: #dcfce7; margin: 8px 0 0 0; font-size: 14px;">${title}</p>
        </div>

        <div style="padding: 30px;">
          
          <p style="color: #374151; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
            ${subtitle}
          </p>

          <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e5e7eb;">
               <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700;">Route</span>
               <div style="font-size: 16px; font-weight: 600; color: #111827; margin-top: 4px;">
                  ${pickupLocation} <span style="color: #166534;">➝</span> ${dropoffLocation}
               </div>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
              <div>
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700;">Date & Time</span>
                <div style="color: #1f2937; font-weight: 500;">${date} @ ${time}</div>
              </div>
              <div>
                <span style="color: #6b7280; font-size: 12px; text-transform: uppercase; font-weight: 700;">Vehicle</span>
                <div style="color: #1f2937; font-weight: 500; text-transform: capitalize;">${vehicle === 'car' ? 'Private Sedan' : 'Luxury KDH Van'}</div>
              </div>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #111827; font-size: 16px; font-weight: 700; margin-bottom: 12px;">Guest Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #4b5563; font-size: 14px;">
              <li style="margin-bottom: 8px;"><strong>Name:</strong> ${name}</li>
              <li style="margin-bottom: 8px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #166534; text-decoration: none;">${phone}</a></li>
              <li style="margin-bottom: 8px;"><strong>Email:</strong> ${email}</li>
            </ul>
          </div>

          ${isAdmin ? `
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://wa.me/${phone.replace('+', '')}" style="background-color: #25D366; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Contact via WhatsApp</a>
            </div>
          ` : `
            <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center; font-size: 12px; color: #9ca3af;">
              <p>Our team will contact you shortly with the best price quotation.</p>
              <p style="margin-top: 5px;">Need urgent help? Call us: <a href="tel:+94778158004" style="color: #166534;">+94 77 815 8004</a></p>
            </div>
          `}

        </div>
      </div>
    `;

    // --- SEND EMAILS ---

    // 1. Admin Email (To You)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com",
      subject: `🚕 New Transport Request: ${name}`,
      html: generateEmailHtml("New Pickup Request", "A client has requested a transport quote.", true),
    });

    // 2. Customer Email (Receipt)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Transport Request Received - Yala Wildlife`,
      html: generateEmailHtml("Request Received", `Hi ${name}, we have received your transport details. We will calculate the best rate and contact you shortly.`, false),
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Error processing pickup:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}