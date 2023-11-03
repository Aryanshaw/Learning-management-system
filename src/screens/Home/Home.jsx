import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [courseDetail, setCourseDetail] = useState([]);
  const navigation = useNavigation();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        "https://mocki.io/v1/1c61d2ff-ccec-44ec-95b4-1dc43394d9d4"
      );
      setCourseDetail(result.data.courses);
    } catch (e) {
      console.log(e.response.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {courseDetail.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.courseCountainer}
              onPress={() =>
                navigation.navigate("CourseDetail", { course: item })
              }
            >
              <Text style={styles.courseTitle}>{item.name}</Text>
              <Text style={styles.courseDesc}>{item.description}</Text>
              <View style={styles.courseLowerContainer}>
                <Text style={styles.courseDuration}>
                  Duration: {item.duration}
                </Text>
                <Text style={styles.courseInstrustor}>
                  By: {item.instructor}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
});
