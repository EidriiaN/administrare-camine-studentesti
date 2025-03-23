import React from "react";
import { View, ActivityIndicator, Platform } from "react-native";

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
    </View>
  );
};

export default Loading;
