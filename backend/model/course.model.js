import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    students: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
