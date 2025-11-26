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
    // Parse the incoming JSON data
    const data = await request.json();
    const { 
      name, 
      phone, 
      email, 
      date, 
      country, 
      tourPackage, 
      message,
      passengers,
      includeMeals,
      includeTickets,
      pricing 
    } = data;

    // Validate required fields
    if (!name || !phone || !email || !date || !tourPackage) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Helper to format currency
    const formatCurrency = (amount: number) => `$${Number(amount).toFixed(2)}`;

    // --- EMAIL CONTENT GENERATOR ---
    const generateEmailHtml = (title: string, subtitle: string, showAdminDetails: boolean = false) => `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6; border-radius: 12px;">
        
        <div style="background-color: #166534; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h2>
          <p style="color: #dcfce7; margin: 5px 0 0 0; font-size: 14px;">${subtitle}</p>
        </div>

        <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-top: 0;">Tour Details</h3>
            <p style="margin: 8px 0;"><strong>Package:</strong> ${tourPackage}</p>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 8px 0;"><strong>Guests:</strong> ${passengers}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Guest Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #166534; text-decoration: none;">${phone}</a></p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #166534; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Country:</strong> ${country || "Not provided"}</p>
            ${message ? `<p style="margin: 8px 0; background: #f9fafb; padding: 10px; border-radius: 4px;"><strong>Note:</strong> ${message}</p>` : ''}
          </div>

          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1f2937; font-size: 16px; margin-top: 0; margin-bottom: 12px;">Cost Summary</h3>
            
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #4b5563;">
              <span>Jeep Base Price:</span>
              <span>${formatCurrency(pricing.base)}</span>
            </div>

            ${includeMeals ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #4b5563;">
              <span>Picnic Meals (${passengers} pax):</span>
              <span>${formatCurrency(pricing.meals)}</span>
            </div>` : ''}

            ${includeTickets ? `
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #4b5563;">
              <span>Park Tickets (${passengers} pax):</span>
              <span>${formatCurrency(pricing.tickets)}</span>
            </div>` : ''}

            <div style="border-top: 1px solid #cbd5e1; margin-top: 12px; padding-top: 12px; display: flex; justify-content: space-between; font-weight: bold; color: #166534; font-size: 18px;">
              <span>Total Estimated:</span>
              <span>${formatCurrency(pricing.grandTotal)}</span>
            </div>
          </div>

          ${showAdminDetails ? `
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #166534; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to Customer</a>
          </div>
          ` : `
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px; text-align: center;">
            We will contact you shortly to confirm availability and payment options.<br>
            Questions? Contact us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #166534;">${process.env.EMAIL_USER}</a>
          </p>
          `}
        </div>
      </div>
    `;

    // Email to Admin
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com",
      subject: `New Booking: ${tourPackage} (${name})`,
      html: generateEmailHtml("New Booking Request", "Action Required: Confirm with Customer", true),
    };

    // Email to Customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Booking Received - ${tourPackage}`,
      html: generateEmailHtml("Booking Received", "Thank you for choosing Yala Wildlife Safari", false),
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(customerEmail)
    ]);

    return NextResponse.json({ success: true, message: "Booking processed successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process booking", details: errorMessage },
      { status: 500 }
    );
  }
}