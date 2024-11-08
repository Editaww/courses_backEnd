import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import paymentRouter from "./src/router/payment.js";
import userRouter from "./src/router/user.js";
import courseRouter from "./src/router/course.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB"));

app.use(paymentRouter);
app.use(userRouter);
app.use(courseRouter);

app.use((req, res) => {
  return res.status(404).json({ message: "This endpoint does not exist" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
