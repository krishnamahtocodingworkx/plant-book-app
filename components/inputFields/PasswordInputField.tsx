import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../utils/style";

type PasswordInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  maxLength?: number;
  error?: string;
  touched?: boolean;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const PasswordInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  maxLength,
  error,
  touched,
  onBlur,
}: PasswordInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const showError = touched && error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.inputField,
            (isFocused || showError) && {
              borderColor: showError ? colors.error : colors.primary,
              borderWidth: 2,
              shadowColor: showError ? colors.error : colors.primary,
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 2,
            },
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            onBlur?.(e);
            setIsFocused(false);
          }}
          secureTextEntry={!showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={styles.iconStyle}
        >
          <Ionicons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordInputField;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
    marginBottom: 6,
  },
  inputContainer: {
    position: "relative",
  },
  inputField: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.borderColor,
    fontSize: 16,
    color: colors.textPrimary,
    paddingRight: 40, // ⬅ ensures text doesn't overlap icon
  },
  iconStyle: {
    position: "absolute",
    right: 12,
    top: 12,
    zIndex: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
