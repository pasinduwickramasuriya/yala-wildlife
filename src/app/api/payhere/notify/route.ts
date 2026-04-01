import { NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const merchant_id = formData.get("merchant_id") as string;
    const order_id = formData.get("order_id") as string;
    const payhere_amount = formData.get("payhere_amount") as string;
    const payhere_currency = formData.get("payhere_currency") as string;
    const status_code = formData.get("status_code") as string;
    const md5sig = formData.get("md5sig") as string;
    const custom_1 = formData.get("custom_1") as string; // We can pass email here
    const custom_2 = formData.get("custom_2") as string; // We can pass name here

    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || "";

    // Verify signature
    const hashedSecret = crypto.createHash("md5").update(merchantSecret).digest("hex").toUpperCase();
    const hashString = `${merchant_id}${order_id}${payhere_amount}${payhere_currency}${status_code}${hashedSecret}`;
    const expectedMd5sig = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

    if (expectedMd5sig !== md5sig) {
      console.error("PayHere Signature verification failed");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (status_code === "2") {
      // Payment Success
      const customerEmail = custom_1;
      const customData = custom_2 ? custom_2.split("|") : [];
      let customerName = custom_2;
      let customerPhone = "N/A";

      if (customData.length >= 2) {
        customerName = `${customData[0]} ${customData[1]}`;
        if (customData.length >= 3) {
          customerPhone = customData[2];
        }
      }

      // Send Email with Nodemailer
      console.log(`[PayHere Notify] status_code=2 | email=${customerEmail} | EMAIL_USER=${!!process.env.EMAIL_USER} | EMAIL_PASS=${!!process.env.EMAIL_PASS}`);
      if (customerEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `Yala Wildlife <${process.env.EMAIL_USER}>`,
          to: customerEmail,
          subject: `Confirmed: Advance Payment #${order_id}`,
          html: `
    <div style="background-color: #f9f9f9; padding: 40px 20px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; color: #1a1a1a;">
      <div style="max-width: 400px; margin: 0 auto; background-color: #ffffff; border: 1px solid #eeeeee; border-radius: 24px; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
        
        <div style="margin-bottom: 20px;">
          <div style="display: inline-block; background-color: #e6ffed; padding: 12px; border-radius: 50%;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28a745" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
          </div>
        </div>

        <h2 style="text-transform: uppercase; letter-spacing: 2px; font-size: 14px; color: #28a745; margin: 0 0 10px 0; font-weight: 800;">Payment Received</h2>
        <p style="font-size: 13px; color: #666666; line-height: 1.6; margin-bottom: 25px;">
          Hi ${customerName || "Adventurer"}, your custom expedition deposit is secured. We're getting things ready for you.
        </p>

        <div style="background-color: #f1f3f5; border-radius: 16px; padding: 20px; margin-bottom: 25px;">
          <span style="display: block; font-size: 10px; text-transform: uppercase; color: #888888; margin-bottom: 5px; letter-spacing: 1px;">Total Paid</span>
          <span style="font-size: 24px; font-weight: 900; color: #1a1a1a;">${payhere_currency} ${payhere_amount}</span>
        </div>

        <div style="font-size: 11px; color: #999999; margin-bottom: 25px;">
          Order Reference: #${order_id}
        </div>

        <hr style="border: 0; border-top: 1px solid #eeeeee; margin-bottom: 25px;" />
        
        <div style="text-align: left; background-color: #f8fbfa; border-left: 3px solid #28a745; padding: 15px; margin-bottom: 25px; border-radius: 4px;">
          <h3 style="font-size: 11px; text-transform: uppercase; color: #555; margin: 0 0 10px 0; letter-spacing: 1px;">Customer Details</h3>
          <p style="font-size: 13px; color: #333; margin: 0 0 5px 0;"><strong>Name:</strong> ${customerName}</p>
          <p style="font-size: 13px; color: #333; margin: 0 0 5px 0;"><strong>Email:</strong> ${customerEmail}</p>
          <p style="font-size: 13px; color: #333; margin: 0;"><strong>Phone:</strong> ${customerPhone}</p>
        </div>

        <p style="font-size: 12px; color: #666666; margin-bottom: 5px;">Need to discuss your itinerary?</p>
        <a href="https://wa.me/94778158004" style="display: inline-block; font-size: 14px; color: #28a745; text-decoration: none; font-weight: bold;">
          +94 77 815 8004
        </a>

        <div style="margin-top: 30px;">
          <p style="font-size: 11px; color: #999999; margin: 0;">Best regards,</p>
          <p style="font-size: 12px; font-weight: bold; color: #1a1a1a; margin: 5px 0 0 0;">Yala Wildlife Team</p>
        </div>
      </div>
      
      <div style="margin-top: 20px; font-size: 10px; color: #bbbbbb; text-transform: uppercase; letter-spacing: 2px;">
        Wilderness Awaits
      </div>
    </div>
           `,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`[PayHere Notify] ✅ Email sent to ${customerEmail}`);
        } catch (mailError: unknown) {
          const msg = mailError instanceof Error ? mailError.message : String(mailError);
          console.error(`[PayHere Notify] ❌ sendMail FAILED: ${msg}`);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
