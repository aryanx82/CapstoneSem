import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import bookmarkRoutes from "./routes/bookmark.routes.js";
import courseRoutes from "./routes/course.routes.js";
import { getCourses } from "./controllers/course.controller.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173","https://capstone-sem.vercel.app/"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.get("/api/courses", getCourses);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });