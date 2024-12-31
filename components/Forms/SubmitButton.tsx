import { Text, TouchableOpacity, View } from "react-native";

export default function SubmitButton({ loading, handleSubmit }: any) {
  return (
    <View style={{ marginTop: 50 }}>
      <TouchableOpacity
        style={{ backgroundColor: "#CC347D", padding: 15, borderRadius: 30 }}
        onPress={handleSubmit}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontFamily: "Poppins_400Regular" }}>
          {
            loading ?
              "Loading..."
              :
              "Masuk"
          }
        </Text>
      </TouchableOpacity>
    </View>
  )
}