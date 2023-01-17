import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    age: { type: Number, required: true },
    address: {
      street: { type: String },
      number: { type: Number },
    },
    professions: [String],
  },
  {
    timestamps: true,
  }
);

export default model("blogPost", blogPostSchema);
