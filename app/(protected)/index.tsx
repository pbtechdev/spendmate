import { useSession } from "@/src/context/session";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const UserInfo = () => {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <Text>UserInfo</Text>
      <Button title="Go to Home" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

export default UserInfo;
