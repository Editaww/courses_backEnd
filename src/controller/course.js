import { v4 as uuidv4 } from "uuid";
import CourseModel from "../model/course.js";
import UserModel from "../model/user.js";

const CREATE_COURSE = async (req, res) => {
  try {
    const newCourse = {
      title: req.body.title,
      courseType: req.body.courseType,
      courseText: req.body.courseText,
      price: req.body.price,
      courseUrl: req.body.courseUrl,
      userId: req.body.userId,
      createdByRole: req.body.role,
      id: uuidv4(),
    };

    const response = await new CourseModel(newCourse);

    await response.save();

    return res
      .status(201)
      .json({ message: " Course was created", response: response });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the course" });
  }
};

const GET_COURSES = async (req, res) => {
  try {
    const response = await CourseModel.find();

    return res.status(200).json({ courses: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};
const GET_COURSE_BY_ID = async (req, res) => {
  try {
    const response = await CourseModel.findOne({ id: req.params.id });

    return res.status(200).json({ course: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const ADD_COURSE_TO_USER = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.params.userId;

    // Atnaujina vartotoją ir prideda kursą prie `purchasedCourses` lauko.
    await UserModel.findOneAndUpdate(
      { id: userId },
      { $addToSet: { purchasedCourses: courseId } },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "A course has been assigned to a user." });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

const GET_USER_COURSES = async (req, res) => {
  try {
    const user = await UserModel.findOne({ id: req.params.userId }).populate(
      "purchasedCourses"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ courses: user.purchasedCourses });
  } catch (err) {
    console.error("Error in GET_USER_COURSES:", err); // Log klaidos pranešimą
    return res.status(500).json({ message: "Error in application" });
  }
};

const UPDATE_COURSE_BY_ID = async (req, res) => {
  try {
    const response = await CourseModel.findOne({ id: req.params.id });

    if (!response) {
      return res.status(404).json({ message: "Course does not exist" });
    }

    const updatedCourse = await CourseModel.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Course was updated!", course: updatedCourse });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};
const DELETE_COURSE_BY_ID = async (req, res) => {
  try {
    const response = await CourseModel.findOne({
      id: req.params.id,
    });

    if (!response) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res
      .status(200)
      .json({ message: "Course was deleted", course: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in application" });
  }
};

export {
  CREATE_COURSE,
  GET_COURSES,
  GET_COURSE_BY_ID,
  ADD_COURSE_TO_USER,
  GET_USER_COURSES,
  UPDATE_COURSE_BY_ID,
  DELETE_COURSE_BY_ID,
};
