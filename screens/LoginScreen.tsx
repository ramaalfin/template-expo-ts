import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";

// storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// context
import { loginUser } from "../services/auth";

// components
import Checkbox from "expo-checkbox";
import InputBox from "../components/Forms/InputBox";
import InputPassword from "../components/Forms/InputPassword";
import SubmitButton from "../components/Forms/SubmitButton";
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [isChecked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadRememberedUsername = async () => {
      const rememberedUsername = await AsyncStorage.getItem(
        "rememberedUsername"
      );
      if (rememberedUsername) {
        setUsername(rememberedUsername);
        setChecked(true);
      }
    };

    loadRememberedUsername();
  }, []);

  const handleCheckboxToggle = async () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);

    if (newCheckedState) {
      await AsyncStorage.setItem("rememberedUsername", username);
    } else {
      await AsyncStorage.removeItem("rememberedUsername");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!username || !password) {
        setLoading(false);
        setError("NIS/NISN/EMAIL dan Password tidak boleh kosong");
        setModalVisible(true);
        return;
      }

      if (isChecked) {
        await AsyncStorage.setItem("rememberedUsername", username);
      }

      login(username, password);
    } catch (error) {
      setLoading(false);
      setError("Terjadi kesalahan, silahkan coba lagi");
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/images/logo_login.png")}
      />

      <View style={styles.formContainer}>
        <InputBox
          inputTitle="Username"
          value={username}
          setValue={(value: string) => {
            setUsername(value);
            if (isChecked) {
              AsyncStorage.setItem("rememberedUsername", value); // Update stored username when typing
            }
          }}
        />

        <InputPassword
          labelPassword="Kata Sandi"
          togglePasswordVisibility={togglePasswordVisibility}
          value={password}
          setValue={setPassword}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={handleCheckboxToggle}
              color={isChecked ? "#CC347D" : undefined}
            />
            <Text style={{ marginLeft: 5, fontFamily: "Poppins_400Regular" }}>
              Ingat Saya
            </Text>
          </View>
        </View>

        <SubmitButton loading={loading} handleSubmit={handleSubmit} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              {error}
            </Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Pressable
                style={{
                  backgroundColor: "#CC347D",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "100%",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Tutup
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 200,
    height: 200,
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    paddingHorizontal: 30,
    gap: 20,
  },
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
  checkbox: {
    borderColor: "#979797",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
