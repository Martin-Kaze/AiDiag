import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { priceId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      consent_collection: {
    terms_of_service: 'required',
  },
  custom_text: {
    terms_of_service_acceptance: {
      message: 'I agree to the [Terms of Service](https://wellness.chat/terms) and [Refund Policy](https://wellness.chat/refund-policy)',
    }
    }
  });
    
    return Response.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}