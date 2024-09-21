import { Text, StyleSheet, View } from "react-native";
import { UserContextProvider } from "../context/userContext";

export default function HomeScreen() {
  return (
    <UserContextProvider>
      <View>
        <Text>Bom dia</Text>
      </View>
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
