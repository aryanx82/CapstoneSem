import Bookmark from "../model/bookmark.model.js";

export const toggleBookmark = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      id,
      title,
      instructor,
      rating,
      students,
      category,
      level,
      price,
      image,
    } = req.body;

    if (!id) {
      return res.status(400).json({ message: "course id is required" });
    }

    const existing = await Bookmark.findOne({ user: userId, courseId: id });

    if (existing) {
      await existing.deleteOne();
      return res.json({ bookmarked: false });
    }

    await Bookmark.create({
      user: userId,
      courseId: id,
      title,
      instructor,
      rating,
      students,
      category,
      level,
      price,
      image,
    });

    return res.json({ bookmarked: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookmarks = await Bookmark.find({ user: userId }).sort({ createdAt: -1 });
    return res.json(bookmarks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
