import { createPaymentIntent } from "../services/stripe.js";

const createPayment = async (req, res) => {
  const { amount } = req.body; // Paimkite sumą iš užklausos
  try {
    // Sukuriame payment intent su Stripe
    const paymentIntent = await createPaymentIntent(amount);

    // Grąžiname client_secret frontendui
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Nepavyko sukurti mokėjimo užklausos" });
  }
};

export { createPayment };
