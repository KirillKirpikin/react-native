import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Colors, Fonts } from "../shared/token";

export default function Restore() {
    return (
        <View>
            <Link href="/">
                <Text
                    style={{
                        color: Colors.white,
                        fontFamily: Fonts.regular,
                    }}
                >
                    Restore
                </Text>
            </Link>
        </View>
    );
}
