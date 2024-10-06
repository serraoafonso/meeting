import { StyleSheet } from "react-native";
import { UserContextProvider } from "../context/userContext";
import Navigation from "../navigations/Navigation";
import { NavigationContainer } from '@react-navigation/native';

export default function HomeScreen() {
  return (
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
  );
}
