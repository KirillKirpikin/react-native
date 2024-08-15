import { Redirect } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { useAtomValue } from "jotai";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { authAtom } from "../../entities/auth/model/auth.state";
import { MenuButton } from "../../features/layout/MenuButton";
import { Colors, Fonts } from "../../shared/token";
import { CustomDrawer } from "../../widget/layout/ui/Drawer/CustomDrawer";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
    const { access_token } = useAtomValue(authAtom);
    if (!access_token) {
        return <Redirect href={"/login"} />;
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <Drawer
                drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={({ navigation }) => ({
                    drawerStyle: {
                        shadowOpacity: 0,
                        shadowColor: Colors.blackLight,
                    },
                    headerStyle: {
                        backgroundColor: Colors.blackLight,
                        shadowColor: Colors.blackLight,
                    },
                    headerLeft: () => {
                        return <MenuButton navigation={navigation} />;
                    },
                    headerTitleStyle: {
                        color: Colors.white,
                        fontFamily: Fonts.regular,
                        shadowColor: Colors.blackLight,
                        shadowOpacity: 0,
                    },
                    sceneContainerStyle: {
                        backgroundColor: Colors.black,
                        shadowColor: Colors.blackLight,
                        shadowOpacity: 0,
                    },
                    headerShadowVisible: false,
                    headerStatusBarHeight: 0,
                    drawerHideStatusBarOnOpen: false,
                })}
            >
                <Drawer.Screen name="index" options={{ title: "Мои Курси" }} />
                <Drawer.Screen
                    name="profile"
                    options={{ title: "Мой Профиль" }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}
