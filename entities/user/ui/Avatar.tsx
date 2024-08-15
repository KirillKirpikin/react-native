import { Image, StyleSheet } from "react-native";

export function Avatar({ image }: { image: string | null }) {
    return (
        <>
            {image ? (
                <Image
                    style={styles.image}
                    source={{
                        uri: image,
                    }}
                    resizeMode="contain"
                />
            ) : (
                <Image
                    style={styles.image}
                    source={require("../../../assets/avatar2.png")}
                    resizeMode="contain"
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
});
