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
import React from "react";
import PasswordInputField from "../components/inputFields/PasswordInputField";
import { Formik } from "formik";
import { LoginSchema } from "../utils/validation";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { Image } from "expo-image";
import CustomInputField from "../components/inputFields/CustomInputField";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../routes/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import TextButton from "../components/buttons/TextButton";
// import { API_URL } from "@env";

const LoginScreen = () => {
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
              <Text style={styles.heading}>Login to your account</Text>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  console.log("Form submitted:", values);
                  navigation.navigate("BottomTabs");
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
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

                    <View>
                      <PasswordInputField
                        value={values.password}
                        onChangeText={handleChange("password")}
                        placeholder="Enter password"
                        label="Password"
                        error={errors.password}
                        touched={touched.password}
                        onBlur={handleBlur("password")}
                      />
                      <TextButton
                        onPress={() => navigation.navigate("ForgotPassword")}
                        actionText="Forgot password?"
                        containerStyle={{ alignItems: "flex-end" }}
                      />
                    </View>

                    <PrimaryButton title="Login" onPress={handleSubmit} />
                  </View>
                )}
              </Formik>
              <TextButton
                label="Don't have an account?"
                actionText="Create account"
                onPress={() => navigation.navigate("Signup")}
                containerStyle={{ marginTop: 16 }}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
