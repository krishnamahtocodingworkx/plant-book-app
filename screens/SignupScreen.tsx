import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import PasswordInputField from "../components/inputFields/PasswordInputField";
import { Formik } from "formik";
import { SignupSchema } from "../utils/validation";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Image } from "expo-image";
import CustomInputField from "../components/inputFields/CustomInputField";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../routes/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import TextButton from "../components/buttons/TextButton";
import axios from "axios";

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  useEffect(() => {
    async function check() {
      try {
        const res = await axios.get("http://localhost:9000/check");
        console.log("Server response:", res);
      } catch (error) {
        console.log("Error connecting to server:", error);
      }
    }
    check();
  }, []);
  console.log("SignupScreen rendered");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              <Image
                source={require("../assets/banner.gif")}
                style={styles.bannerImage}
              />
              <Text style={styles.heading}>Sign in to your account</Text>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                  axios
                    .post("http://localhost:9000/api/v1/auth/signup", {
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      confirmPassword: values.confirmPassword,
                      role: "user",
                    })
                    .then((response) => {
                      console.log("Signup successful:", response.data);
                      navigation.navigate("VerifyOTP", {
                        email: values.email,
                        mode: "signup",
                      });
                    })
                    .catch((error) => {
                      console.error("Error during signup:", error);
                    });
                }}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                  <View style={styles.form}>
                    <CustomInputField
                      value={values.name}
                      onChangeText={handleChange("name")}
                      placeholder="Enter name"
                      label="Name"
                      error={errors.name}
                      touched={touched.name}
                    />

                    <CustomInputField
                      value={values.email}
                      onChangeText={handleChange("email")}
                      placeholder="Enter email"
                      label="Email Address"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={errors.email}
                      touched={touched.email}
                    />

                    <PasswordInputField
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Enter password"
                      label="Password"
                      error={errors.password}
                      touched={touched.password}
                    />

                    <PasswordInputField
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      placeholder="Confirm password"
                      label="Confirm Password"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />

                    <PrimaryButton title="Signup" onPress={handleSubmit} />
                  </View>
                )}
              </Formik>
              <TextButton
                label="Already have an account?"
                actionText="Back to Login"
                onPress={() => navigation.navigate("Login")}
                containerStyle={{ marginTop: 16 }}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Optional: set background color
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: 40,
    justifyContent: "center",
  },
  innerContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "#FFFFFF", // Optional: set background color
    color: "#000000", // Optional: set text color
  },
  bannerImage: {
    width: 100,
    height: 100,
  },
  heading: {
    color: "#000000",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    fontWeight: "600",
  },
  form: {
    width: "100%",
    gap: 10,
  },
});
