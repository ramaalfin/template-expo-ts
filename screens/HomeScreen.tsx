import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Modal,
  Platform,
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
import InputBox from "../components/Forms/InputBox";

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
          setPhoto(require("../assets/user.png"));
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
      <View
        style={styles.bio}
      >
        <View style={styles.topBar}>
          <Image
            source={require("../assets/icon-white.png")}
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
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
              }}
            >
              Adi Kurnia
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 13,
                fontFamily: "Poppins_400Regular",
              }}
            >
              NIK: 3271060100000001
            </Text>
          </View>
        </View>

      </View>

      {/* form */}
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 20,
          marginTop: -80,
        }}
      >
        {/* no pengajuan */}
        <ScrollView
          style={{
            flex: 1,
            height: hp("100%")
          }}
        >
          <InputBox
            inputTitle="No Pengajuan"
            value="1234567890"
            editable={false}
          />
          <InputBox
            inputTitle="No CIF"
            style={{ marginTop: 20 }}
            value="1234567890"
            editable={false}
          />
          {/* nama lengkap */}
          <InputBox
            inputTitle="Nama Lengkap"
            style={{ marginTop: 20 }}
            value="Adi Kurnia"
            editable={false}
          />
          {/* nominal type number */}
          <InputBox
            inputTitle="Nominal"
            style={{ marginTop: 20 }}
            value={`Rp. 1.000.000.000`}
            type="numeric"
            editable={false}
          />
          {/* catatan */}
          <InputBox
            inputTitle="Catatan"
            style={{ marginTop: 20 }}
            multiline={true}
          />

          {/* input file */}
          <View style={{ marginTop: 20, flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text style={{ fontFamily: "Poppins_500Medium" }}>Lampiran</Text>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <Pressable
                style={{
                  backgroundColor: "#C0151B",
                  paddingVertical: 4,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                  width: "30%",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 12,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Pilih File
                </Text>
              </Pressable>
            </View>
          </View>

          {/* button submit */}
          <View style={{ flexDirection: "row", width: "100%", marginTop: 20 }}>
            <Pressable
              style={{
                backgroundColor: "#C0151B",
                paddingVertical: 8,
                paddingHorizontal: 10,
                borderRadius: 5,
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 14,
                  textAlign: "center",
                  color: "white",
                }}
              >
                Submit
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* modal info */}
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
                  backgroundColor: "#C0151B",
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
                    color: "#C0151B",
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
  bio: {
    height: hp("35%"),
    backgroundColor: "#C0151B"
  },
  bioContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
    marginVertical: hp("1%"),
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
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: Platform.OS === "web" ? 400 : "100%",
    alignSelf: "center",
    zIndex: 9999,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
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
