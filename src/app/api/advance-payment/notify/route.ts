
// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/prisma';
// import nodemailer from 'nodemailer';
// import crypto from 'crypto-js';

// // 1. Configure Email Transporter (Exactly as your working snippet)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     // --- PayHere Data ---
//     const merchantId = formData.get('merchant_id');
//     const orderId = formData.get('order_id') as string;
//     const payhereAmount = formData.get('payhere_amount') as string;
//     const payhereCurrency = formData.get('payhere_currency');
//     const statusCode = formData.get('status_code');
//     const md5sig = formData.get('md5sig');
//     const paymentId = formData.get('payment_id') as string;

//     // --- 2. Security Check (Validate Signature) ---
//     const secret = process.env.PAYHERE_MERCHANT_SECRET!;
//     const hashedSecret = crypto.MD5(secret).toString().toUpperCase();
//     const localSig = crypto.MD5(
//       `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`
//     ).toString().toUpperCase();

//     if (localSig !== md5sig) {
//       console.error("Signature Mismatch");
//       return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
//     }

//     // --- 3. If Payment Successful (Status 2) ---
//     if (statusCode === '2') {
      
//       // A. Update Database
//       const booking = await prisma.advanceBooking.update({
//         where: { id: orderId },
//         data: { 
//           status: "SUCCESS", 
//           paymentId: paymentId 
//         }
//       });

//       // B. Send Email to CUSTOMER (Receipt)
//       const customerEmail = {
//         from: process.env.EMAIL_USER,
//         to: booking.email,
//         subject: "Payment Confirmed - Yala Safari",
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; color: #1f2a44; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
//             <h1 style="font-size: 24px; font-weight: 600; color: #1f2a44; margin-bottom: 16px;">Payment Successful!</h1>
//             <p style="font-size: 16px; color: #64748b; margin-bottom: 24px;">Hi ${booking.firstName}, we have received your advance payment. Your booking is secure.</p>
            
//             <div style="background-color: #f0fdf4; padding: 16px; border: 1px solid #bbf7d0; border-radius: 8px;">
//               <h2 style="font-size: 18px; font-weight: 500; color: #166534; margin-bottom: 12px;">Receipt Details</h2>
//               <p style="font-size: 14px; color: #1f2a44; margin: 4px 0;"><strong>Amount Paid:</strong> LKR ${payhereAmount}</p>
//               <p style="font-size: 14px; color: #1f2a44; margin: 4px 0;"><strong>Payment ID:</strong> ${paymentId}</p>
//               <p style="font-size: 14px; color: #1f2a44; margin: 4px 0;"><strong>Reference:</strong> ${booking.id}</p>
//             </div>

//             <p style="font-size: 14px; color: #64748b; margin-top: 24px;">Our driver will contact you on WhatsApp (${booking.phone}) shortly.</p>
//             <p style="font-size: 14px; color: #64748b; margin-top: 16px;">Best regards,<br/>The Yala Safari Team</p>
//           </div>
//         `,
//       };

//       // C. Send Email to ADMIN (You)
//       const adminEmail = {
//         from: process.env.EMAIL_USER,
//         to: "pasindusadanjana17@gmail.com", // Your personal email
//         subject: `New Booking: ${booking.firstName} (Paid)`,
//         html: `
//           <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ccc;">
//             <h2 style="color: #1f2a44;">New Advance Payment Received</h2>
//             <p><strong>Customer:</strong> ${booking.firstName} ${booking.lastName}</p>
//             <p><strong>Amount:</strong> LKR ${payhereAmount}</p>
//             <p><strong>Phone:</strong> ${booking.phone}</p>
//             <p><strong>Country:</strong> ${booking.country}</p>
//             <p><strong>Note:</strong> ${booking.additionalNote || "None"}</p>
//             <hr/>
//             <p style="color: green; font-weight: bold;">Status: PAID</p>
//           </div>
//         `,
//       };

//       // Send both emails
//       await transporter.sendMail(customerEmail);
//       await transporter.sendMail(adminEmail);
//     }

//     return NextResponse.json({ message: "OK" });

//   } catch (error) {
//     console.error("Notify Error:", error);
//     return NextResponse.json({ error: "Server Error" }, { status: 500 });
//   }
// }





import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto-js';

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // --- PayHere Data ---
    const merchantId = formData.get('merchant_id')?.toString();
    const orderId = formData.get('order_id')?.toString();
    const payhereAmount = formData.get('payhere_amount')?.toString();
    const payhereCurrency = formData.get('payhere_currency')?.toString();
    const statusCode = formData.get('status_code')?.toString();
    const md5sig = formData.get('md5sig')?.toString();
    const paymentId = formData.get('payment_id')?.toString();

    // Quick Validation
    if (!merchantId || !orderId || !md5sig) {
        return NextResponse.json({ error: "Missing Data" }, { status: 400 });
    }

    // --- 2. Security Check (Validate Signature) ---
    const secret = process.env.PAYHERE_MERCHANT_SECRET!;
    const hashedSecret = crypto.MD5(secret).toString().toUpperCase();
    
    // Hash: merchant_id + order_id + payhere_amount + payhere_currency + status_code + uppercase(md5(secret))
    const localSig = crypto.MD5(
      `${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${hashedSecret}`
    ).toString().toUpperCase();

    if (localSig !== md5sig) {
      console.error("Signature Mismatch");
      return NextResponse.json({ error: "Invalid Signature" }, { status: 400 });
    }

    // --- 3. If Payment Successful (Status 2) ---
    if (statusCode === '2') {
      
      // A. Update Database
      const booking = await prisma.advanceBooking.update({
        where: { id: orderId },
        data: { 
          status: "SUCCESS", 
          paymentId: paymentId 
        }
      });

      // B. Send Email to CUSTOMER
      const customerEmail = {
        from: process.env.EMAIL_USER,
        to: booking.email,
        subject: "Payment Confirmed - Yala Safari",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h2 style="color: #1f2a44;">Payment Successful!</h2>
            <p>Hi ${booking.firstName}, we have received your advance payment.</p>
            <p><strong>Amount:</strong> LKR ${payhereAmount}</p>
            <p><strong>Ref:</strong> ${booking.id}</p>
          </div>
        `,
      };

      // C. Send Email to ADMIN
      const adminEmail = {
        from: process.env.EMAIL_USER,
        to: "pasindusadanjana17@gmail.com",
        subject: `New Booking: ${booking.firstName} (Paid)`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>New Advance Payment</h2>
            <p><strong>Customer:</strong> ${booking.firstName}</p>
            <p><strong>Amount:</strong> LKR ${payhereAmount}</p>
            <p><strong>Status:</strong> PAID</p>
          </div>
        `,
      };

      // Send emails
      await Promise.all([
        transporter.sendMail(customerEmail),
        transporter.sendMail(adminEmail)
      ]).catch(err => console.error("Email Error:", err));
    }

    return NextResponse.json({ message: "OK" });

  } catch (error) {
    console.error("Notify Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}