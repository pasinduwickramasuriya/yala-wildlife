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
    const data = await request.json();
    const {
      name,
      phone,
      email,
      date,
      country,
      message,
      // Visitors counts
      foreignAdults = 0,
      foreignChildren = 0,
      saarcAdults = 0,
      saarcChildren = 0,
      localAdults = 0,
      localChildren = 0,
      infants = 0,
      // Vehicles counts
      jeeps = 0,
      cars = 0,
      buses = 0,
      // Calculated pricing breakdown (LKR and USD)
      pricing,
    } = data;

    // Validate required fields
    if (!name || !phone || !email || !date || !pricing) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Helper to format currency
    const formatLKR = (amount: number) => `LKR ${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    const formatUSD = (amount: number) => `$${Number(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Generate HTML content for email
    const generateEmailHtml = (title: string, subtitle: string, showAdminDetails: boolean = false) => `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f4f6; border-radius: 12px;">
        <div style="background-color: #15803d; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">${title}</h2>
          <p style="color: #dcfce7; margin: 5px 0 0 0; font-size: 14px;">${subtitle}</p>
        </div>

        <div style="background-color: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
          
          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin-top: 0;">Reservation Details</h3>
            <p style="margin: 8px 0;"><strong>Permit Type:</strong> Yala National Park Entry Permit (Day Visitor)</p>
            <p style="margin: 8px 0;"><strong>Safari Date:</strong> ${date}</p>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Visitor & Vehicle Summary</h3>
            <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px; line-height: 1.6;">
              ${foreignAdults > 0 ? `<li>Foreign Adults (Non-SAARC): <strong>${foreignAdults}</strong></li>` : ''}
              ${foreignChildren > 0 ? `<li>Foreign Children (6-12 yrs): <strong>${foreignChildren}</strong></li>` : ''}
              ${saarcAdults > 0 ? `<li>SAARC Adults: <strong>${saarcAdults}</strong></li>` : ''}
              ${saarcChildren > 0 ? `<li>SAARC Children (6-12 yrs): <strong>${saarcChildren}</strong></li>` : ''}
              ${localAdults > 0 ? `<li>Local Sri Lankan Adults: <strong>${localAdults}</strong></li>` : ''}
              ${localChildren > 0 ? `<li>Local Sri Lankan Children (6-12 yrs): <strong>${localChildren}</strong></li>` : ''}
              ${infants > 0 ? `<li>Infants (Under 6 yrs): <strong>${infants}</strong> (Free Entry)</li>` : ''}
              
              ${jeeps > 0 ? `<li style="margin-top: 6px;">Jeeps/Vans/Double Cabs: <strong>${jeeps}</strong></li>` : ''}
              ${cars > 0 ? `<li style="margin-top: 6px;">Cars: <strong>${cars}</strong></li>` : ''}
              ${buses > 0 ? `<li style="margin-top: 6px;">Buses/Lorries: <strong>${buses}</strong></li>` : ''}
            </ul>
          </div>

          <div style="margin-bottom: 24px;">
            <h3 style="color: #1f2937; font-size: 18px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Guest Information</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #15803d; text-decoration: none;">${phone}</a></p>
            <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #15803d; text-decoration: none;">${email}</a></p>
            <p style="margin: 8px 0;"><strong>Country:</strong> ${country || "Not provided"}</p>
            ${message ? `<p style="margin: 8px 0; background: #f9fafb; padding: 10px; border-radius: 4px; font-style: italic; border-left: 3px solid #15803d;"><strong>Special Message:</strong> "${message}"</p>` : ''}
          </div>

          <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1f2937; font-size: 16px; margin-top: 0; margin-bottom: 12px;">DWC Fee Breakdown</h3>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #4b5563;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 6px 0; font-weight: 500;">Passenger Entry Fees:</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.entryFeesLKR)}</td>
                <td style="padding: 6px 0; text-align: right; color: #888; font-family: monospace; font-size: 11px;">(${formatUSD(pricing.entryFeesUSD)})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 6px 0; font-weight: 500;">Vehicle Admission Fees:</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.vehicleFeesLKR)}</td>
                <td style="padding: 6px 0; text-align: right; color: #888; font-family: monospace; font-size: 11px;">(${formatUSD(pricing.vehicleFeesUSD)})</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 6px 0; font-weight: 500;">Mandatory Service Fee:</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.serviceFeeLKR)}</td>
                <td style="padding: 6px 0; text-align: right; color: #888; font-family: monospace; font-size: 11px;">(${formatUSD(pricing.serviceFeeUSD)})</td>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b;">
                <td style="padding: 8px 0;">Subtotal:</td>
                <td style="padding: 8px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.subtotalLKR)}</td>
                <td style="padding: 8px 0; text-align: right; color: #666; font-family: monospace; font-size: 12px;">(${formatUSD(pricing.subtotalUSD)})</td>
              </tr>
              <tr style="border-bottom: 1px solid #cbd5e1; color: #64748b;">
                <td style="padding: 6px 0; font-style: italic;">Government VAT (18%):</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.vatLKR)}</td>
                <td style="padding: 6px 0; text-align: right; color: #888; font-family: monospace; font-size: 11px;">(${formatUSD(pricing.vatUSD)})</td>
              </tr>
              ${pricing.convenienceFeeLKR > 0 ? `
              <tr style="border-bottom: 1px solid #cbd5e1; color: #64748b;">
                <td style="padding: 6px 0; font-style: italic;">Convenience Fee (2%):</td>
                <td style="padding: 6px 0; text-align: right; font-family: monospace;">${formatLKR(pricing.convenienceFeeLKR)}</td>
                <td style="padding: 6px 0; text-align: right; color: #888; font-family: monospace; font-size: 11px;">(${formatUSD(pricing.convenienceFeeUSD)})</td>
              </tr>
              ` : ''}
              <tr style="font-weight: bold; color: #15803d; font-size: 16px;">
                <td style="padding: 12px 0 0 0;">Total Permit Cost:</td>
                <td style="padding: 12px 0 0 0; text-align: right; font-family: monospace;">${formatLKR(pricing.totalLKR)}</td>
                <td style="padding: 12px 0 0 0; text-align: right; font-family: monospace; font-size: 14px;">(${formatUSD(pricing.totalUSD)})</td>
              </tr>
            </table>
          </div>

          <p style="color: #ef4444; font-size: 11px; margin-top: 12px; font-weight: bold; text-align: center; line-height: 1.4;">
            * IMPORTANT Note: This covers the official government entry permit only. It does not include hiring a private 4x4 safari jeep or independent driver fees.
          </p>

          ${showAdminDetails ? `
          <div style="margin-top: 24px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #15803d; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reply to Customer</a>
          </div>
          ` : `
          <p style="color: #6b7280; font-size: 13px; margin-top: 24px; text-align: center; line-height: 1.5;">
            We will contact you shortly to coordinate ticket booking, payment verification, and local safari coordination.<br>
            Questions? Email us at <a href="mailto:${process.env.EMAIL_USER}" style="color: #15803d; text-decoration: none; font-weight: bold;">${process.env.EMAIL_USER}</a> or message us directly via WhatsApp at <a href="https://wa.me/94778158004" style="color: #15803d; text-decoration: none; font-weight: bold;">+94 778 158 004</a>.
          </p>
          `}
        </div>
      </div>
    `;

    // Email to Admin
    const adminEmail = {
      from: process.env.EMAIL_USER,
      to: "pasindusadanjana17@gmail.com",
      subject: `[TICKET ONLY] New Yala Permit Request: ${name}`,
      html: generateEmailHtml("New Yala Permit Request", "Action Required: Contact guest and arrange ticket purchase", true),
    };

    // Email to Customer
    const customerEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Yala Permit Request Received - Yala Wildlife Safari`,
      html: generateEmailHtml("Yala Permit Request Received", "Thank you for choosing Yala Wildlife Safari", false),
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(customerEmail),
    ]);

    return NextResponse.json({ success: true, message: "Permit request submitted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error processing ticket booking:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to process ticket booking", details: errorMessage },
      { status: 500 }
    );
  }
}
