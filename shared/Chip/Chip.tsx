import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../token";

export function Chip({ text }: { text: string }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: Colors.border,
        borderRadius: 17,
        borderWidth: 1,
    },
    text: {
        fontFamily: Fonts.regular,
        fontSize: Fonts.f14,
        color: Colors.white,
    },
});
