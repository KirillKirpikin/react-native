import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { Colors, Fonts } from "../token";
import { LinkProps } from "expo-router/build/link/Link";

export function CustomLink({
    text,
    ...props
}: LinkProps<string | object> & { text: string }) {
    return (
        <Link {...props}>
            <Text style={styles.link}>{text}</Text>
        </Link>
    );
}

const styles = StyleSheet.create({
    link: {
        fontFamily: Fonts.regular,
        fontSize: Fonts.f18,
        color: Colors.link,
    },
});
