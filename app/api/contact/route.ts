import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  business: string;
  phone: string;
  email: string;
  productInterest: string;
  message: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ContactPayload;

    const toAddress =
      process.env.QUOTE_RECEIVER_EMAIL || "info@omnmaterials.com";

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toAddress,
      subject: `New Quote Request from ${data.name}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Business:</strong> ${data.business}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Product Interest:</strong> ${data.productInterest}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    console.log("RESEND RESPONSE:", response);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}