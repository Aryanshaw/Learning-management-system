import { configureStore } from "@reduxjs/toolkit";
import CourseSlice from "../util/Slices/CourseSlice";

const store = configureStore({
  reducer: {
    courseData: CourseSlice,
  },
});

export default store;
