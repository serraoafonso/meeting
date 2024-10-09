import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ip from '../../constants/Url'


export default function Register() {
  const navigation = useNavigation();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
  });
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);

  function handleChange(name, value) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sucesso) navigation.navigate("Home"); // Ou outra tela principal
    setSucesso(false);
  }

  async function register() {
    // Validação básica da senha
    if (inputs.password.length < 9) {
      setTextoaviso("Password too weak");
      setAviso(true);
      return;
    }

    try {
      setReady(false);
        const res = await fetch(`${ip}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });
      console.log(res)
      if (res.status === 404) {
        setTextoaviso("Error, username or email already taken");
        setAviso(true);
      } else if (res.status === 200) {
        const responseData = await res.json();
        // Pode armazenar o usuário no estado global/contexto aqui se precisar
        // Exemplo: changeUser({ ...responseData });
        setTextoaviso("Account created with success!");
        setSucesso(true);
        setAviso(true);
      } else {
        setTextoaviso("Unexpected error occurred");
        setAviso(true);
      }
    } catch (err) {
      console.error("Registration error:", err, ip);
      setTextoaviso("An error occurred, please try again later.");
      setAviso(true);
    } finally {
      setReady(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.head1}>Register</Text>
        <View style={styles.form1}>
          <View style={styles.inputs1}>
            <Text>Name:</Text>
            <TextInput
              style={styles.input}
              value={inputs.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>
          <View style={styles.inputs1}>
            <Text>Username:</Text>
            <TextInput
              style={styles.input}
              value={inputs.username}
              onChangeText={(value) => handleChange("username", value)}
            />
          </View>
          <View style={styles.inputs1}>
            <Text>Email:</Text>
            <TextInput
              style={styles.input}
              value={inputs.email}
              onChangeText={(value) => handleChange("email", value)}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputs1}>
            <Text>Password:</Text>
            <TextInput
              style={styles.input}
              value={inputs.password}
              secureTextEntry
              onChangeText={(value) => handleChange("password", value)}
            />
          </View>
          <TouchableOpacity style={styles.btn1} onPress={register}>
            {ready ? (
              <Text style={styles.btnText}>Register</Text>
            ) : (
              <ActivityIndicator size="small" color="#fff" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.menos1}>
          <Text>
            Already have an account?{" "}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </View>

      {aviso && (
        Alert.alert(
          "Notice",
          textoAviso,
          [
            {
              text: "Ok",
              onPress: clickOk,
            },
          ],
          { cancelable: false }
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  box1: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  head1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  form1: {
    marginBottom: 20,
  },
  inputs1: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  btn1: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  menos1: {
    marginTop: 10,
    alignItems: "center",
  },
  link: {
    color: "#007BFF",
  },
});
