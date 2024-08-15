import React, { useState } from "react";
import {
    Pressable,
    StyleSheet,
    TextInput,
    TextInputProps,
    View,
} from "react-native";
import { Colors, Fonts } from "../token";
import EyeOpenIcon from "../../assets/icons/eye-open";
import EyeClosed from "../../assets/icons/eye-closed";

export function Input({
    isPassword,
    style,
    ...props
}: TextInputProps & { isPassword?: boolean }) {
    const [isVisible, setVisible] = useState<boolean>(false);

    return (
        <View style={style}>
            <TextInput
                {...props}
                secureTextEntry={isPassword && !isVisible}
                style={styles.input}
                placeholderTextColor={Colors.gray}
            />
            {isPassword && (
                <Pressable
                    onPress={() => setVisible((state) => !state)}
                    style={styles.eyeIcon}
                >
                    {isVisible ? <EyeOpenIcon /> : <EyeClosed />}
                </Pressable>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 58,
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        borderRadius: 10,
        fontSize: 16,
        color: Colors.gray,
        fontFamily: Fonts.regular,
    },
    eyeIcon: {
        position: "absolute",
        right: 0,
        paddingHorizontal: 20,
        paddingVertical: 18,
    },
});
