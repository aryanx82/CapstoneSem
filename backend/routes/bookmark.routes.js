import express from "express";
import auth from "../middleware/authenticate.js";
import { toggleBookmark, getBookmarks } from "../controllers/bookmark.controller.js";

const router = express.Router();

router.use(auth);

router.get("/", getBookmarks);
router.post("/toggle", toggleBookmark);

export default router;
