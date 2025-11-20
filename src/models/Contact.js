// src/models/Contact.js
import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String },
    type: { type: String }, // suggestion / complaint / other
    message: { type: String, required: true },
    email: { type: String },
    // add more fields if your form has more
  },
  { timestamps: true }
);

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
