import { StyleSheet } from "react-native";
import { UserContextProvider } from "../context/userContext";
import Navigation from "../navigations/Navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DarkModeContextProvider } from "../context/darkModeContext";

const queryClient = new QueryClient();

export default function HomeScreen() {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeContextProvider>
        <UserContextProvider>
          <Navigation />
        </UserContextProvider>
      </DarkModeContextProvider>
    </QueryClientProvider>
  );
}
