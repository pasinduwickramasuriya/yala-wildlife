import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, orderId, currency = "USD" } = body;

    if (!amount || !orderId) {
      return NextResponse.json({ error: "Missing amount or orderId" }, { status: 400 });
    }

    const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID;
    const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;

    if (!merchantId || !merchantSecret) {
      console.error("PayHere credentials are not set in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // Amount must be formatted to 2 decimal places for PayHere hash
    const formattedAmount = parseFloat(amount).toFixed(2);

    // Hash generation: MD5(merchant_id + order_id + amount + currency + UPPERCASE(MD5(merchant_secret)))
    const hashedSecret = crypto.createHash("md5").update(merchantSecret).digest("hex").toUpperCase();
    const hashString = `${merchantId}${orderId}${formattedAmount}${currency}${hashedSecret}`;
    const hash = crypto.createHash("md5").update(hashString).digest("hex").toUpperCase();

    return NextResponse.json({ hash });
  } catch (error) {
    console.error("Error generating hash:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
