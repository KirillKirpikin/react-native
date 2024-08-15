import { Colors, Fonts } from "../../../shared/token";
import { User } from "../../../entities/user/model/user.model";
import { Image, StyleSheet, Text, View } from "react-native";
import { Avatar } from "../../../entities/user/ui/Avatar";

export function UserMenu({ user }: { user: User | null }) {
    if (!user) {
        return;
    }
    return (
        <View style={styles.container}>
            <Avatar image={user.photo ?? null} />
            <Text style={styles.name}>
                {user.name} {user?.surname}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    name: {
        fontSize: Fonts.f16,
        fontFamily: Fonts.regular,
        color: Colors.white,
    },
    container: {
        gap: 8,
        alignItems: "center",
        marginBottom: 40,
    },
});
