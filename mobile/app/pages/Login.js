import React, { useEffect, useState, useContext } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Navegação nativa do React Native
import { UserContext } from '../context/userContext';
import { GoogleLogin } from "@react-oauth/google";  // Será necessário adaptar para uma solução do Google Login compatível com React Native
import jwtDecode from "jwt-decode"; // Bibliotecas JWT podem ser utilizadas normalmente
import Logo1 from '../../assets/imgs/logo/logo1.png'

export default function Login() {

  const navigation = useNavigation();
  const { changeUser } = useContext(UserContext);
  const [dataGoogle, setDataGoogle] = useState("");
  const [ready, setReady] = useState(true);
  const [aviso, setAviso] = useState(false);
  const [textoAviso, setTextoaviso] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [inputs, setInputs] = useState({
    primeiro: "",
    password: "",
  });

  useEffect(() => {
    if (dataGoogle !== "") {
      login();
    }
  }, [dataGoogle]);

  function handleChange(name, value) {
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function clickOk() {
    setAviso(false);
    setTextoaviso("");
    if (sucesso) navigation.navigate("Home");  // Adaptado para navegação nativa
    setSucesso(false);
  }

  async function login() {
    // Lógica de login permanece a mesma
  }

  return (
    <View style={styles.login}>
      <View style={styles.box}>
        <View style={styles.left}>
          <Text style={styles.title}>Good to see you again!</Text>
          <View style={styles.row}>
            <Text>
              Don't have an account? 
              <Text style={styles.link} onPress={() => navigation.navigate('Register')}> Register</Text>  {/* Adaptado para navegação nativa */}
            </Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.head}>
            <Text style={styles.heading}>Login</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.inputs}>
              <Text>Username or email:</Text>
              <TextInput 
                style={styles.input} 
                value={inputs.primeiro} 
                onChangeText={(value) => handleChange("primeiro", value)}
              />
            </View>
            <View style={styles.inputs}>
              <Text>Password:</Text>
              <TextInput 
                style={styles.input} 
                secureTextEntry 
                value={inputs.password} 
                onChangeText={(value) => handleChange("password", value)}
              />
            </View>
            <TouchableOpacity style={styles.btn2} onPress={login} disabled={!ready}>
              {ready ? (
                <Text style={styles.btnText}>Login</Text>
              ) : (
                <ActivityIndicator size="small" color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.googleBtn}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const data = jwtDecode(credentialResponse.credential);
                setDataGoogle(data);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </View>
          <View style={styles.menos}>
            <Text>
              Don't have an account? 
              <Text style={styles.link} onPress={() => navigation.navigate('Register')}> Register</Text>
            </Text>
          </View>
        </View>

        {aviso && (
          <View style={styles.warning}>
            <Text>{textoAviso}</Text>
            <TouchableOpacity style={styles.warningBtn} onPress={clickOk}>
              <Text>Ok</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.logo}>
        <Image source={Logo1} style={styles.logoImage} />
      </View>
    </View>
  );
}

// Estilos adaptados para React Native
const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    padding: 20,
  },
  left: {
    flex: 1,
    justifyContent: 'center',
  },
  right: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  head: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  inputs: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  btn2: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  googleBtn: {
    marginTop: 20,
  },
  menos: {
    marginTop: 20,
  },
  warning: {
    padding: 20,
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
  },
  warningBtn: {
    marginTop: 10,
  },
  logo: {
    marginTop: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
});
