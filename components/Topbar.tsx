import React from "react";

import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// icons
import { Ionicons } from "@expo/vector-icons";

const Topbar = ({ navigation, titleBar }: any) => {
  return (
    <ImageBackground
      source={require("../assets/bg_top.png")}
      resizeMode="cover"
      style={styles.areaTopBar}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="white" />
      </TouchableOpacity>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontSize: 16,
            color: "white",
          }}
        >
          {titleBar}
        </Text>
      </View>
      <View style={{ width: 20 }}></View>
    </ImageBackground>
  );
};

export default Topbar;

const styles = StyleSheet.create({
  areaTopBar: {
    gap: 30,
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});
