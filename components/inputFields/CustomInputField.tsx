import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import colors from "../../utils/style";

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void; // ✅ optional onBlur handler
  secureTextEntry?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoCorrect?: boolean;
  maxLength?: number;
  error?: string; // ✅ error message
  touched?: boolean; // ✅ has the field been touched
};

const CustomInputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  maxLength,
  error,
  touched,
  onBlur,
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const showError = touched && error;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
          setIsFocused(false);
          onBlur?.(e); // Call the optional onBlur handler if provided
        }}
        secureTextEntry={secureTextEntry}
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
      {showError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default CustomInputField;

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
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 2,
  },
});
