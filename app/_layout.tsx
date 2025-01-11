import React from "react";
import { Slot } from "expo-router";
import { SessionProvider } from "@/src/context/session";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function RootLayout() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
