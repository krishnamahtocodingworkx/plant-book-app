import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AuthStackParamList } from "../../routes/Navigation";
import { AppDispatch, RootState } from "../../redux/store";
import { SignupSchema } from "../../utils/validation";
import CustomInputField from "../../components/inputFields/CustomInputField";
import PasswordInputField from "../../components/inputFields/PasswordInputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import TextButton from "../../components/buttons/TextButton";
import { signupThunk } from "../../redux/slices/authThunk";

const SignupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth);
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
                source={require("../../assets/banner.gif")}
                style={styles.bannerImage}
              />
              <Text style={styles.heading}>Sign in to your account</Text>

              <Formik
                initialValues={{
                  name: "Krishna Mahto",
                  email: "krishnamahto.dev@gmail.com",
                  password: "Admin@123",
                  confirmPassword: "Admin@123",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  dispatch(signupThunk({ ...values, role: "user" })).unwrap().then((res) => {
                    console.log("Signup response :", res);
                    navigation.navigate("VerifyOTP", {
                      email: values.email,
                      mode: "signup",
                    });
                  });
                }}
              >
                {({
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  values,
                  errors,
                  touched,
                }) => (
                  <View style={styles.form}>
                    <CustomInputField
                      value={values.name}
                      onChangeText={handleChange("name")}
                      placeholder="Enter name"
                      label="Name"
                      error={errors.name}
                      touched={touched.name}
                      onBlur={handleBlur("name")}
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
                      onBlur={handleBlur("email")}
                    />

                    <PasswordInputField
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Enter password"
                      label="Password"
                      error={errors.password}
                      touched={touched.password}
                      onBlur={handleBlur("password")}
                    />

                    <PasswordInputField
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      placeholder="Confirm password"
                      label="Confirm Password"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      onBlur={handleBlur("confirmPassword")}
                    />

                    <PrimaryButton
                      loading={loading}
                      title="Signup"
                      onPress={handleSubmit}
                    />
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
