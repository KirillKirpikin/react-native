import {
    Pressable,
    PressableProps,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Colors, Fonts } from "../../shared/token";
import { useState } from "react";

export function MenuButton({
    navigation,
    ...props
}: PressableProps & { navigation: any }) {
    const [click, setClick] = useState<boolean>(false);
    return (
        <Pressable
            {...props}
            onPressIn={() => setClick(true)}
            onPressOut={() => setClick(false)}
            onPress={() => navigation.toggleDrawer()}
        >
            <View
                style={{
                    ...styles.button,
                }}
            >
                <Text
                    style={{
                        ...styles.text,
                        color: click ? Colors.primaryHover : Colors.primary,
                    }}
                >
                    Menu
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",

        borderRadius: 10,
        height: 58,
    },
    text: {
        fontSize: Fonts.f18,
        fontFamily: Fonts.regular,
        padding: 20,
    },
});
