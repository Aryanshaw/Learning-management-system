import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  enrollInCourse,
  enrollmentLoadingSelector,
  enrolledCourseSelector,
} from "../../util/Slices/CourseSlice";
import { ActivityIndicator } from "react-native";

const CourseDetail = ({ route }) => {
  const { course } = route.params;
  const [isSyllabusOpen, setSyllabusOpen] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const enrollLoading = useSelector(enrollmentLoadingSelector);
  const dispatch = useDispatch();
  const enrolledCourse = useSelector(enrolledCourseSelector);

  const toggleSyllabus = () => {
    setSyllabusOpen(!isSyllabusOpen);
  };

  const enrollInCourseHandler = () => {
    dispatch(enrollInCourse({ course: course, enrolled: true }));
  };

  function checkEnrollment(enrolledCourse, course) {
    for (const item of enrolledCourse) {
      if (item.id === course.id) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    const status = checkEnrollment(enrolledCourse, course);
    setIsEnrolled(status);
  }, [enrollInCourseHandler]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>
      <Text style={styles.instructor}>By: {course.instructor}</Text>
      <Text style={styles.description}>{course.description}</Text>
      <View style={styles.enrollmentStatus}>
        <Text>Enrollment Status:</Text>
        <Text style={styles.enrollText}>{course.enrollmentStatus}</Text>
      </View>
      <Text style={styles.duration}>Duration: {course.duration}</Text>
      <Text style={styles.schedule}>Schedule: {course.schedule}</Text>
      <Text style={styles.location}>Location: {course.location}</Text>

      {course.prerequisites.length > 0 ? (
        <Text style={styles.subtitle}>Prerequisites:</Text>
      ) : (
        <Text></Text>
      )}
      {course.prerequisites.map((prereq, index) => (
        <View key={index} style={styles.preqContainer}>
          <Text style={styles.prerequisite}>- {prereq}</Text>
        </View>
      ))}

      <TouchableOpacity onPress={toggleSyllabus}>
        <View style={styles.syllabusHeader}>
          <Text style={styles.subtitle}>Syllabus</Text>
          <Text style={styles.syllabusExpandIcon}>
            {!isSyllabusOpen ? "▼" : "▲"}
          </Text>
        </View>
      </TouchableOpacity>

      {isSyllabusOpen && (
        <View style={styles.syllabusContent}>
          {course.syllabus.map((item) => (
            <View key={item.week} style={styles.syllabusItem}>
              <Text style={styles.week}>Week {item.week}:</Text>
              <Text style={styles.topic}>{item.topic}</Text>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          ))}
        </View>
      )}

      {course.enrollmentStatus === "Open" && isEnrolled === false && (
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={enrollInCourseHandler}
        >
          <Text style={styles.enrollButtonText}>Enroll</Text>
          {enrollLoading && <ActivityIndicator />}
        </TouchableOpacity>
      )}

      {isEnrolled === true && (
        <View style={styles.enrollmentConfirmation}>
          <Text style={styles.confirmationText}>
            You are enrolled in this course.
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  instructor: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: "gray",
  },
  enrollmentStatus: {
    fontSize: 16,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 5,
    alignItems: "center",
  },
  enrollText: {
    backgroundColor: "#97de97",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    color: "green",
    borderColor: "green",
    borderWidth: 0.5,
    opacity: 0.7,
  },
  duration: {
    fontSize: 16,
    marginTop: 10,
    fontSize: 12,
    color: "white",
    width: 100,
    backgroundColor: "#4472c2",
    borderRadius: 10,
    paddingHorizontal: 5,
    textAlign: "center",
    fontWeight: "bold",
    padding: 5,
  },
  schedule: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "600",
  },
  location: {
    fontSize: 16,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  preqContainer: {},
  prerequisite: {
    fontSize: 16,
    marginLeft: 10,
  },
  syllabusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  syllabusExpandIcon: {
    fontSize: 20,
  },
  syllabusContent: {
    marginTop: 10,
    borderWidth: 0.1,
    padding: 10,
    borderRadius: 5,
  },
  syllabusItem: {
    marginVertical: 10,
  },
  week: {
    fontSize: 16,
    fontWeight: "bold",
  },
  topic: {
    fontSize: 16,
    marginLeft: 10,
  },
  content: {
    fontSize: 16,
    marginLeft: 20,
  },
  enrollButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  enrollButtonDisabled: {
    backgroundColor: "#E9ECEF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  enrollButtonText: {
    color: "white",
    fontSize: 18,
  },
  enrollmentConfirmation: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  confirmationText: {
    color: "white",
    fontSize: 18,
  },
});

export default CourseDetail;
