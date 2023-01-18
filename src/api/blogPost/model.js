import mongoose from "mongoose";
import commentsSchema from "../comments/model.js";

const { Schema, model } = mongoose;

const blogPostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String },
    readTime: {
      value: { type: Number },
      unit: { type: String },
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
    },
    comments: { type: Array, required: true },
    // comments: [commentsSchema],
  },
  {
    timestamps: true,
  }
);

export default model("blogPost", blogPostSchema);
