import Stripe from "stripe";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { Resend } from 'resend';

const resend = new Resend('re_XvED1sDJ_5wTM6KtvSQZCJbH4JLiPrY35');

const { data, error } = await resend.emails.send({
  from: 'anything@send.wellness.chat', // This will work
  to: 'lopasesu007@gmail.com',
  subject: 'Subdomain Test',
  html: '<strong>Sent via send subdomain</strong>',
});

console.log(data , error)

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

   
  }

  return Response.json({ received: true });
}