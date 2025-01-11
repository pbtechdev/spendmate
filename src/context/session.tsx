import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
} from "react";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { useStorageState } from "@/src/hooks/useSecureStore";

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  user?: FirebaseAuthTypes.User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  user: null,
  isLoading: false,
});

export function useSession() {
  return useContext(AuthContext);
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, user], setUser] = useStorageState("user");

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.data?.idToken ?? ""
      );
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            Alert.alert("Verifying Credentials", "Please wait, logging in...");
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert("Error", "Play services not available or outdated"); // Android only
            break;
          default:
            Alert.alert(
              "Error",
              "Some thing went wrong, please try again later"
            );
        }
      } else {
        Alert.alert("Error", "Some thing went wrong, please try again later");
      }
    }
  };

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signOut = () => auth().signOut();

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
