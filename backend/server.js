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

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://capstone-sem.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
// Ensure GET /api/courses is available
app.get("/api/courses", getCourses);
app.use("/api/courses", courseRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect DB and start server
connectDB(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
