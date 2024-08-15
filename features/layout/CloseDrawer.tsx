import {
    DrawerContentComponentProps,
    DrawerNavigationHelpers,
} from "@react-navigation/drawer/lib/typescript/src/types";
import { Pressable, StyleSheet, View } from "react-native";
import CloseIcon from "../../assets/icons/close";

export function CloseDrawer({
    navigation,
}: {
    navigation: DrawerNavigationHelpers;
}) {
    return (
        <Pressable
            onPress={() => navigation.closeDrawer()}
            style={styles.button}
        >
            <View>
                <CloseIcon />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        padding: 10,
        top: 0,
        right: 0,
        zIndex: 20,
    },
});
