import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  purchasedCourses: [{ type: String, ref: "Course" }],
});

export default mongoose.model("User", userSchema);
