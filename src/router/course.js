import express from "express";

import {
  CREATE_COURSE,
  GET_COURSES,
  GET_COURSE_BY_ID,
  ADD_COURSE_TO_USER,
  GET_USER_COURSES,
  UPDATE_COURSE_BY_ID,
  DELETE_COURSE_BY_ID,
} from "../controller/course.js";
import auth, { adminAuth } from "../middleware/auth.js";

const router = express.Router();
router.post("/courses/course", auth, adminAuth, CREATE_COURSE);
router.get("/courses/courses", auth, GET_COURSES);
router.get("/courses/course/:id", auth, GET_COURSE_BY_ID);
router.post("/courses/course/:userId/purchase", auth, ADD_COURSE_TO_USER);
router.get("/courses/courses/user/:userId", auth, GET_USER_COURSES);
router.put("/courses/course/:id", auth, adminAuth, UPDATE_COURSE_BY_ID);
router.delete("/courses/course/:id", auth, adminAuth, DELETE_COURSE_BY_ID);

export default router;
