import mongoose from "mongoose";

const WorkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

// IMPORTANT: correct model caching
export default mongoose.models.Work || mongoose.model("Work", WorkSchema);
