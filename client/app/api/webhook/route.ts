import Stripe from "stripe";
import fs from "fs";
import path from "path";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);



export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return Response.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email!;

    const pdfPath = path.join(process.cwd(), "public", "product.pdf");
    const pdfBuffer = fs.readFileSync(pdfPath);

    const { data, error } = await resend.emails.send({
  from: 'Wellness Chat <purchase@wellness.chat>', // Professional From Name
  to: customerEmail,
  subject: 'Order Confirmed: Your Wellness Program PDF', // Better Subject
  text: 'Thank you for your purchase! Your personalized PDF is attached to this email. Please keep this for your records.', // Add Plain Text
  html: `
  <div style="font-family: sans-serif; color: #333;">
    <p>Thank you for your purchase! Your personalized PDF is attached.</p>
    <p>If you have any questions, just reply to this email.</p>
    
    <br><br>
    
    <div style="font-size: 11px; color: #999; border-top: 1px solid #eee; padding-top: 10px;">
      <p><strong>Wellness Chat Inc.</strong></p>
      <p>Wellness Chat | Vilnius, Lithuania | wellness.chat</p>
    </div>
  </div>
`,
  attachments: [{ content: pdfBuffer, filename: 'Wellness_Program.pdf' }],
});

if (error) {
  console.error("Error sending email:", error);
}

console.log(data);
   
  }

  return Response.json({ received: true });
}