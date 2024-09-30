import { StyleSheet } from "react-native";
import { UserContextProvider } from "../context/userContext";
import Navigation from "../navigations/Navigation";
import { NavigationContainer } from '@react-navigation/native';
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function HomeScreen() {
  return (
    <GoogleOAuthProvider clientId='941201399432-qtmucn89n26sln6rvvrup1da0ne3opdi.apps.googleusercontent.com'>
    <UserContextProvider>
      <Navigation />
    </UserContextProvider>
    </GoogleOAuthProvider>
  );
}
