import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
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
import { useAuth } from "../context/AuthContext";

const LoginScreen = ({ navigation }: any) => {
  const { setUser, setAuthenticated } = useAuth();
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

      const response = await loginUser(username, password);

      if (response.data.status === "00") {
        await AsyncStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        setModalVisible(true);
        setError(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Terjadi kesalahan, silahkan coba lagi");
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../assets/icon-white.png")}
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
          styleInput={{ borderColor: "#fff", color: "#fff" }}
          styleLabel={{ color: "#fff" }}
        />

        <InputPassword
          labelPassword="Kata Sandi"
          togglePasswordVisibility={togglePasswordVisibility}
          value={password}
          setValue={setPassword}
          styleInput={{ borderColor: "#fff", color: "#fff" }}
          styleLabel={{ color: "#fff" }}
        />

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={handleCheckboxToggle}
              color={isChecked ? "#C0151B" : undefined}
            />
            <Text style={{ marginLeft: 5, fontFamily: "Poppins_400Regular", color: "#fff" }}>
              Ingat Saya
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={{ backgroundColor: "#fff", padding: 15, borderRadius: 30 }}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={{ color: "#C0151B", textAlign: "center", fontFamily: "Poppins_500Medium" }}>
              {
                loading ?
                  <ActivityIndicator color="#C0151B" />
                  :
                  "Masuk"
              }
            </Text>
          </TouchableOpacity>
        </View>
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
                  backgroundColor: "#C0151B",
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
    backgroundColor: "#C0151B",
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
    borderColor: "#fff",
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
    borderColor: "#fff",
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
