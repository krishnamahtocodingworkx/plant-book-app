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
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../routes/Navigation";
import { ResetPasswordSchema } from "../../utils/validation";
import PasswordInputField from "../../components/inputFields/PasswordInputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const ResetPasswordScreen = () => {
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
                source={require("../../assets/banner.gif")}
                style={styles.bannerImage}
              />

              <Text style={styles.heading}>Reset Your Password</Text>

              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(values) => {
                  console.log("Password reset values:", values);
                  navigation.navigate("Login");
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
                    <PasswordInputField
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Enter new password"
                      label="New Password"
                      error={errors.password}
                      touched={touched.password}
                      onBlur={handleBlur("password")}
                    />

                    <PasswordInputField
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      placeholder="Re-enter password"
                      label="Confirm Password"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                      onBlur={handleBlur("confirmPassword")}
                    />

                    <PrimaryButton
                      title="Reset Password"
                      onPress={handleSubmit}
                      style={{ width: "100%", marginTop: 10 }}
                    />
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingTop: 70,
    paddingBottom: 50,
    justifyContent: "center",
  },
  innerContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
