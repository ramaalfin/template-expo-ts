import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// icons
import { Ionicons } from "@expo/vector-icons";

const Topbar2 = ({ navigation, titleBar }: any) => {
  return (
    <View style={styles.areaTopBar}>
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
    </View>
  );
};

export default Topbar2;

const styles = StyleSheet.create({
  areaTopBar: {
    gap: 30,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
