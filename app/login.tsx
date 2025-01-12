import React from "react";
import { View } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSession } from "@/src/context/session";
import { useRouter } from "expo-router";

const Index = () => {
  const router = useRouter();
  const { signIn } = useSession();
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: bottom,
      }}
    >
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          await signIn();
          router.replace("/");
        }}
      />
    </View>
  );
};

export default Index;
