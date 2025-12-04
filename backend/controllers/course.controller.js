import Course from "../model/course.model.js";

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return res.json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, instructor, rating, students, category, level, price, image } = req.body;

    if (!title || !instructor || !category || !level || price == null || !image) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const course = await Course.create({
      title,
      instructor,
      rating,
      students,
      category,
      level,
      price,
      image,
      createdBy: req.user?._id,
    });

    return res.status(201).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.json({ message: "Course deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
