import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

// icons
import { Feather } from "@expo/vector-icons";

export default function InputPassword({ labelPassword, value, setValue }: any) {
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <Text style={{ fontFamily: "Poppins_500Medium" }}>{labelPassword}</Text>
      <View style={styles.password}>
        <TextInput
          style={styles.textInput}
          secureTextEntry={!showPassword}
          value={value}
          onChangeText={(text) => setValue(text)}
          autoCorrect={false}
        />
        <View style={{ position: "absolute", right: 10, top: 20 }}>
          {showPassword ? (
            <Feather
              name="eye"
              size={20}
              color="black"
              onPress={togglePasswordVisibility}
            />
          ) : (
            <Feather
              name="eye-off"
              size={20}
              color="black"
              onPress={togglePasswordVisibility}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "Poppins_400Regular",
    borderWidth: 1,
    borderColor: "#979797",
    borderRadius: 5,
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
    padding: 8,
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
});
