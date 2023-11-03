import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import {
  enrolledCourseSelector,
  successSelector,
  unenrollFromCourse,
} from "../../util/Slices/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const enrolledCourse = useSelector(enrolledCourseSelector);
  const navigation = useNavigation();
  const progressBarWidth = "40%";
  const date = "24/10/23";

  const scheduleNotification = async (courseTitle) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    try {
      await axios.post("https://app.nativenotify.com/api/notification", {
        appId: 14375,
        appToken: "rdNb6dPbmbhZEtFNYbpJHD",
        title: courseTitle,
        body: `Due date on ${date}`,
        dateSent: formattedDateTime,
      });
    } catch (e) {
      console.log("error", e);
    }
  };

  function findLatestCourse(enrolledCourse) {
    if (enrolledCourse.length === 0) {
      return null;
    }

    const latestCourse = enrolledCourse[enrolledCourse.length - 1];

    return latestCourse.name;
  }

  useEffect(() => {
    const courseTitle = findLatestCourse(enrolledCourse);
    if (enrolledCourse.length > 0) {
      scheduleNotification(courseTitle);
    }
  }, [enrolledCourse.length > 0, findLatestCourse]);

  // code to remove the selected course from redux store and database
  function unenrollInCourse(course) {
    dispatch(unenrollFromCourse(course));
  }

  if (enrolledCourse.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>
          You do not have any course enrolled in
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.header}>Courses Enrolled in: </Text>
      <View>
        {enrolledCourse.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.courseCountainer}
            onPress={() =>
              navigation.navigate("CourseDetail", { course: item })
            }
          >
            <Text style={styles.courseTitle}>{item.name}</Text>
            <Text style={styles.courseDesc}>{item.description}</Text>
            <Text style={styles.dueDate}>Due Date: {date}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: progressBarWidth }]} />
            </View>
            <View style={styles.courseLowerContainer}>
              <Text style={styles.courseDuration}>
                Duration: {item.duration}
              </Text>
              <Text style={styles.courseInstrustor}>By: {item.instructor}</Text>
              <TouchableOpacity
                style={styles.unenrollButton}
                onPress={() => unenrollInCourse(item)}
              >
                <Text style={styles.unenrollButtonText}>Unenroll</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  warningText: {
    fontStyle: "italic",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  courseCountainer: {
    display: "flex",
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 8,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 17,
    color: "#3F51B5",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseDesc: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10,
    padding: 5,
  },
  courseDuration: {
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
  courseLowerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  courseInstrustor: {
    fontWeight: "bold",
  },
  dueDate: {
    margin: 5,
    marginTop: -5,
    fontWeight: "bold",
  },
  unenrollButton: {
    backgroundColor: "#4472c2",
    alignItems: "center",
    borderRadius: 6,
    padding: 10,
  },
  unenrollButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginBottom: 5,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
});
