import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../shared/token";
import { CustomLink } from "../shared/CustomLink/CustomLink";

export default function UnmatchedCustom() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/favicon.png")}
                resizeMode="contain"
                style={styles.logo}
            />
            <Text style={styles.text}>
                Ооо... что-то аошло не так.{"\n"} Попробуйте вернуться на
                главний єкран приложения
            </Text>
            <CustomLink href={"/"} text="На главний єкран" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 55,
        alignItems: "center",
        gap: 50,
    },
    text: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        textAlign: "center",
        fontSize: Fonts.f18,
    },
    logo: {
        height: 50,
    },
});
