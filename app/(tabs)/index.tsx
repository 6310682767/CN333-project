import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "./FeedScreen"; // ฟีด
import ExploreScreen from "./ExploreScreen"; // สำรวจ
import LoginScreen from "./LoginScreen"; // ล็อกอิน

// สร้าง Stack Navigator
const Stack = createStackNavigator();

// สร้าง Tab Navigator
const Tab = createBottomTabNavigator();

// สร้าง Feed Tabs
function FeedTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
}

// สร้างแอปด้วย Stack Navigator
export default function App() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Feed" component={FeedTabs} />
    </Stack.Navigator>
  );
}
