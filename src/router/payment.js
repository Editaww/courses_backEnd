import express from "express";
import { createPaymentIntent } from "../services/stripe.js";

const router = express.Router();

router.post("/courses/create-payment", createPaymentIntent);

export default router;
