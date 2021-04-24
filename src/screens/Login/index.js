import React from "react";
import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";

import { useFormik } from "formik";
import * as yup from "yup";

import Header from "../../components/Header";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite email valido")
    .required("Campo obrigatorio"),
  password: yup.string().required("Campo obrigatorio"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values, form) => {
        console.log('values', values)
    },
    validationSchema,
  });


  return (
    <ScrollView style={styles.container}>
      <Header title="Login" />
      <View>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={formik.values.email}
          onChangeText={formik.handleChange("email")}
          onEndEditing={formik.handleBlur("email")}
        />
        {formik.touched.email && (
          <Text style={styles.msgError}>{formik.errors.email}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={showPassword}
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onEndEditing={formik.handleBlur("password")}
        />
        {formik.touched.password && (
          <Text style={styles.msgError}>{formik.errors.password}</Text>
        )}
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.textShowPassword}>Mostrar senha</Text>
        </TouchableOpacity>
        <View style={styles.containerSubmit}>
          <TouchableOpacity onPress={formik.handleSubmit} disabled={formik.isSubmitting} style={styles.buttonSubmit}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.infoText}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.infoText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#201652",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    flex: 1,
    margin: 10,
  },
  msgError: {
    color: "#CE102C",
    fontSize: 18,
  },
  textShowPassword: {
    color: "#fff",
    fontSize: 15,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#fff",
    marginLeft: 15,
  },
  containerSubmit: {
    flex: 1,
    alignItems: "center",
  },
  buttonSubmit: {
    backgroundColor: "#FEE123",
    margin: 10,
    marginTop: 30,
    borderRadius: 50,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    padding: 15,
    color: "#fff",
    fontSize: 20,
  },
  infoText: {
      marginTop: 10,
    color: "#fff",
    fontSize: 15,
  },
});
