import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CourseDetail from "./src/screens/CourseDetail/CourseDetail";
import { Provider } from "react-redux";
import store from "./src/util/store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./src/screens/Dashboard/Dashboard";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(14375, 'rdNb6dPbmbhZEtFNYbpJHD');
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const HomeStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetail}
          options={{ tabBarVisible: false }}
        />
      </Stack.Navigator>
    );
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={{
              headerShown: false,
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="user" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
