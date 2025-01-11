import { ActivityIndicator, View } from "react-native";
import { Redirect, Stack } from "expo-router";
import { useSession } from "@/src/context/session";

export default function ProtectedLayout() {
  const { user, isLoading } = useSession();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
