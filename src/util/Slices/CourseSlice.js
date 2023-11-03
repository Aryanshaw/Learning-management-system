import { createSlice } from "@reduxjs/toolkit";

const courseDataSlice = createSlice({
  name: "courseData",
  initialState: {
    enrolledCourses: [],
    loading: false,
    isEnrolled: false,
    success: "",
  },
  reducers: {
    enrollingInCourse: (state) => {
      state.loading = true;
    },
    enrollInCourse: (state, { payload }) => {
      state.loading = false;
      state.enrolledCourses = [...state.enrolledCourses, payload.course];
      state.isEnrolled = payload.enrolled;
      state.success = "success";
    },
    unenrollFromCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.id !== action.payload.id
      );
      state.isEnrolled = false;
      state.success = "";
    },
  },
});

export const { enrollInCourse, unenrollFromCourse } = courseDataSlice.actions;
export const enrolledCourseSelector = (state) =>
  state.courseData.enrolledCourses;
export const enrollmentLoadingSelector = (state) => state.courseData.loading;
export const isEnrolledSelector = (state) => state.courseData.isEnrolled;
export const successSelector = (state) => state.courseData.success;
export default courseDataSlice.reducer;
