import express from "express";
import auth from "../middleware/authenticate.js";
import { getCourses, createCourse, updateCourse, deleteCourse } from "../controllers/course.controller.js";

const router = express.Router();

router.get("/", getCourses);

router.use(auth);

router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
