import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
} from "@react-navigation/drawer";
import { useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CloseDrawer } from "../../../../features/layout/CloseDrawer";
import { CustomLink } from "../../../../shared/CustomLink/CustomLink";
import { Colors } from "../../../../shared/token";
import { loguotAtom } from "../../../../entities/auth/model/auth.state";
import { loadProfileAtom } from "../../../../entities/user/model/user.state";
import { UserMenu } from "../../../user/ui/UserMenu";
import ProfileSvg from "../../../../assets/icons/profile";
import UniverSvg from "../../../../assets/icons/university";
import { MenuItem } from "../../../../entities/layout/ui/MenuItem/MenuItem";

const MENU = [
    { text: "Курси", icon: <UniverSvg />, path: "index" },
    { text: "Профиль", icon: <ProfileSvg />, path: "profile" },
];

export function CustomDrawer(props: DrawerContentComponentProps) {
    const logout = useSetAtom(loguotAtom);
    const [profile, loadProfile] = useAtom(loadProfileAtom);

    useEffect(() => {
        loadProfile();
    }, []);
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.scrollView}
        >
            <CloseDrawer navigation={props.navigation} />
            <View style={styles.content}>
                <UserMenu user={profile.profile} />
                {MENU.map((menu) => (
                    <MenuItem key={menu.path} {...menu} drawer={props} />
                ))}
            </View>
            <View style={styles.footer}>
                <CustomLink
                    href="/login"
                    onPress={() => logout()}
                    text="Виход"
                />
            </View>
        </DrawerContentScrollView>
    );
}
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: Colors.black,
    },
    content: {
        flex: 1,
        marginTop: 0,
    },
    footer: {
        marginBottom: 40,
        alignItems: "center",
    },
    logo: {},
});
