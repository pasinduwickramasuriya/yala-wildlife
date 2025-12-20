// import { NextResponse } from 'next/server';
// import  prisma  from '@/lib/prisma'; // Make sure this path is correct for your project
// import crypto from 'crypto-js';

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     // 1. Create the Database Record (PENDING)
//     const booking = await prisma.advanceBooking.create({
//       data: {
//         firstName: body.firstName,
//         lastName: body.lastName,
//         email: body.email,
//         phone: body.phone,
//         country: body.country,
//         additionalNote: body.additionalNote,
//         amount: parseFloat(body.amount),
//         currency: 'LKR', // Setting currency to LKR
//         status: 'PENDING',
//       },
//     });

//     // 2. Generate Security Hash
//     const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID!;
//     const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;

//     // Format amount (must be 2 decimal places, e.g., "1000.00")
//     const amountFormatted = parseFloat(body.amount)
//       .toLocaleString('en-us', { minimumFractionDigits: 2, useGrouping: false });

//     // Hash logic: merchant_id + order_id + amount + currency + hashed_secret
//     const hashedSecret = crypto.MD5(merchantSecret).toString().toUpperCase();
//     const hashString = `${merchantId}${booking.id}${amountFormatted}LKR${hashedSecret}`;
//     const hash = crypto.MD5(hashString).toString().toUpperCase();

//     return NextResponse.json({ 
//       hash, 
//       orderId: booking.id, 
//       merchantId 
//     });

//   } catch (error) {
//     console.error("Initiate Error:", error);
//     return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
//   }
// }







import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // --- 1. AMOUNT FIX ---
    // Database needs a Number (e.g., 1000.5)
    const amountFloat = parseFloat(body.amount);

    // PayHere needs a String with 2 decimals (e.g., "1000.50")
    const amountFormatted = amountFloat.toFixed(2);

    // --- 2. Create the Database Record (PENDING) ---
    const booking = await prisma.advanceBooking.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        country: body.country,
        additionalNote: body.additionalNote,
        amount: amountFloat, // <--- Saving as Number (Float)
        status: 'PENDING',
      },
    });

    // --- 3. Generate Security Hash ---
    // USES YOUR ORIGINAL VARIABLE NAME
    const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID!;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;
    const orderId = booking.id;
    const currency = 'LKR';

    // Hash logic: merchant_id + order_id + amountFormatted + currency + hashed_secret
    const hashedSecret = crypto.MD5(merchantSecret).toString().toUpperCase();
    const hashString = `${merchantId}${orderId}${amountFormatted}${currency}${hashedSecret}`;
    const hash = crypto.MD5(hashString).toString().toUpperCase();

    return NextResponse.json({
      hash,
      orderId,
      merchantId,
      amountFormatted // Send formatted amount back to frontend
    });

  } catch (error) {
    console.error("Initiate Error:", error);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}