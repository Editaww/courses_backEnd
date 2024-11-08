import Stripe from "stripe";
import Course from "../model/course.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { courseId, amount } = req.body; // Gaukite kursą pagal ID iš užklausos
    const course = await Course.findOne({ id: courseId });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Gaukite kainą iš kurso modelio
    const paymentAmount = amount || course.price * 100; // Stripe priima sumą centais (pvz., 10 EUR = 1000 centų)

    // Sukuriame Payment Intent su kaina
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount, // Naudokite kursų kainą
      currency: "eur", // Nurodykite teisingą valiutą (pavyzdžiui, EUR)
      payment_method_types: ["card"],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret, // Grąžinkite clientSecret Stripe užklausai
    });
  } catch (error) {
    console.error("Error creating payment intent", error);
    res.status(500).send("Error creating payment intent");
  }
};

export { createPaymentIntent };
