import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: Number,
      required: true,
    },
    title: String,
    instructor: String,
    rating: Number,
    students: Number,
    category: String,
    level: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

bookmarkSchema.index({ user: 1, courseId: 1 }, { unique: true });

const Bookmark = mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
