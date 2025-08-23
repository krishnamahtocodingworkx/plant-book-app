import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import { Formik } from "formik";
import { ForgotPasswordSchema } from "../utils/validation";
import CustomInputField from "../components/inputFields/CustomInputField";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../routes/Navigation";
import TextButton from "../components/buttons/TextButton";

const ForgotPasswordScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

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
              <Text style={styles.heading}>Forgot Password</Text>
              <Formik
                initialValues={{
                  email: "",
                }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                  navigation.navigate("VerifyOTP", {
                    email: values.email,
                    mode: "login",
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

                    <PrimaryButton
                      title="Send OTP"
                      onPress={handleSubmit}
                      // onPress={() =>
                      //   navigation.navigate("VerifyOTP", {
                      //     email: "krishnamahto@gmail.com",
                      //   })
                      // }
                    />
                  </View>
                )}
              </Formik>
              <TextButton
                label="Remember your password?"
                actionText="Login"
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

export default ForgotPasswordScreen;

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
