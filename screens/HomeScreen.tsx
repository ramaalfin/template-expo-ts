import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ImageBackground } from "react-native";

// storage
import AsyncStorage from "@react-native-async-storage/async-storage";

// context
import { AuthContext, useAuth } from "../context/AuthContext";

// icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// components
import { useFocusEffect } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width } = Dimensions.get("window");

import { NavigationProp } from "@react-navigation/native";
import { useRouter } from "expo-router";

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const { user, logout } = useAuth();
  const [menuActive, setMenuActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState<{ uri: string } | null>(null);
  const [extraMenu, setExtraMenu] = useState([]);
  const [showExtraMenu, setShowExtraMenu] = useState(false);

  const iconMap = {
    "ic_info.png": require("../assets/menu/ic_info.png"),
    "ic_pembayaran.png": require("../assets/menu/ic_pembayaran.png"),
    "ic_top_up.png": require("../assets/menu/ic_top_up.png"),
    "ic_capaian.png": require("../assets/menu/ic_capaian.png"),
    "ic_profile.png": require("../assets/menu/ic_profile.png"),
    "ic_jadwal.png": require("../assets/menu/ic_jadwal.png"),
    "ic_presensi.png": require("../assets/menu/ic_presensi.png"),
    "ic_peristiwa.png": require("../assets/menu/ic_peristiwa.png"),
    "ic_cuti.png": require("../assets/menu/ic_cuti.png"),
    "ic_history_kantin.png": require("../assets/menu/ic_history_kantin.png"),
    "ic_mutabaah.png": require("../assets/menu/ic_mutabaah.png"),
    "ic_tamu.png": require("../assets/menu/ic_tamu.png"),
    "ic_tahfiz.png": require("../assets/menu/ic_tahfiz.png"),
    "ic_nilai.png": require("../assets/menu/ic_nilai.png"),
  };

  useEffect(() => {
    try {
      if (user) {
        const photo = user?.photo;
        if (photo) {
          setPhoto({ uri: photo });
        } else {
          setPhoto(require("../assets/nophoto.jpg"));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const loadData = async () => {
    if (user) {
      const menus = user?.menu;

      // Filter untuk menu utama
      const activeMenus = menus
        .filter(
          (menu: any) =>
            menu.is_active === 1 &&
            menu.kd_menu !== "ortu_sertifikasi" &&
            menu.kd_menu !== "ortu_capaian_dn" &&
            menu.kd_menu !== "ortu_capaian_harian_dn"
        )
        .sort((a: any, b: any) => a.seq - b.seq);

      // Filter untuk extra menu
      const extraMenus = menus
        .filter(
          (menu: any) =>
            menu.is_active === 1 &&
            (menu.kd_menu === "ortu_sertifikasi" ||
              menu.kd_menu === "ortu_capaian_dn" ||
              menu.kd_menu === "ortu_capaian_harian_dn")
        )
        .sort((a: any, b: any) => a.seq - b.seq);

      setMenuActive(activeMenus);
      setExtraMenu(extraMenus);
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadData();
    }, [user, user?.id_user, user?.token])
  );

  const handleLogout = async () => {
    setModalVisible(true);
  };

  const submitLogout = async () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bg_presensi.png")}
        style={styles.bio}
      >
        <View style={styles.topBar}>
          <Image
            source={require("../assets/images/logo.png")}
            resizeMode="contain"
            style={{ width: 50 }}
          />

          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color="#fff"
            onPress={handleLogout}
          />
        </View>

        <View style={styles.bioContent}>
          {photo && <Image source={photo} resizeMode="contain" style={styles.photo} />}

          <View>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Poppins_700Bold",
              }}
            >
              {/* {user?.fid} */}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontFamily: "Poppins_400Regular",
              }}
            >
              NISN:
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontFamily: "Poppins_400Regular",
              }}
            >
              NIS:
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#F1F5F9",
              borderRadius: 10,
              padding: 10,
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: "Poppins_400Regular", fontSize: 13 }}>
              Lihat perkembangan belajar anak
            </Text>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontFamily: "Poppins_400Regular" }}>
              Apakah Anda yakin ingin keluar?
            </Text>
            {/* confirm logout */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                marginTop: 20,
                gap: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "#CC347D",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "50%",
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
                  Batal
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "#f5f5f5",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "50%",
                }}
                onPress={submitLogout}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 14,
                    textAlign: "center",
                    color: "#CC347D",
                  }}
                >
                  Ya
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: hp("1%"),
    height: hp("8%"),
  },
  bio: { height: hp("40%") },
  bioContent: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
    marginVertical: hp("4%"),
  },
  cardMenu: {
    height: 100,
    width: wp("26%"),
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    padding: 5,
  },
  imageLogo: {
    width: 55,
    height: 55,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: "center",
    borderColor: "#FEC400",
    borderWidth: 5,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 30,
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

  placeholderStyle: {
    fontSize: 13,
    fontFamily: "Poppins_300Light",
  },
  selectedTextStyle: {
    fontSize: 13,
    fontFamily: "Poppins_300Light",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
