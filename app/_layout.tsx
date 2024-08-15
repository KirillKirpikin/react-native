import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "../shared/token";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Notification } from "../shared/Notification/Notification";

SplashScreen.preventAutoHideAsync();

export default function RootRayout() {
    const insets = useSafeAreaInsets();
    const [loaded] = useFonts({
        "FiraSans-Regular": require("../assets/fonts/FiraSans-Regular.ttf"),
        "FiraSans-SemiBold": require("../assets/fonts/FiraSans-SemiBold.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    });

    return (
        <SafeAreaProvider>
            <Notification />
            <StatusBar style="light" />
            <Stack
                screenOptions={{
                    statusBarColor: Colors.white,
                    contentStyle: {
                        backgroundColor: Colors.black,
                        paddingTop: insets.top,
                    },
                    headerShown: false,
                }}
            >
                <Stack.Screen name="login" />
                <Stack.Screen
                    name="restore"
                    options={{
                        presentation: "modal",
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
