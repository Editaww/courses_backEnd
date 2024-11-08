import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  courseType: { type: String, required: true },
  courseText: { type: String, required: true },
  price: { type: Number, required: true },
  courseUrl: { type: String, required: true },
  userId: { type: String, required: true },
});
export default mongoose.model("Course", courseSchema);
