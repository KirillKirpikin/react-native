import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "../../../../shared/token";

export function ProgressBar({
    totalLessons,
    passedLesson,
}: {
    totalLessons: number;
    passedLesson: number;
}) {
    const percent = Math.round((passedLesson / totalLessons) * 100);
    return (
        <View style={styles.wrapper}>
            <View style={styles.head}>
                <Text style={styles.textPercent}>{percent}%</Text>
                <Text style={styles.textCount}>
                    {passedLesson}/{totalLessons}
                </Text>
            </View>
            <View style={styles.bar}>
                <View
                    style={{ ...styles.progress, width: `${percent}%` }}
                ></View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 18,
    },
    head: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 6,
    },
    bar: {
        height: 5,
        borderRadius: 20,
        backgroundColor: Colors.border,
    },
    progress: {
        height: 5,
        borderRadius: 20,
        backgroundColor: Colors.pink,
    },
    textPercent: {
        fontSize: Fonts.f16,
        fontFamily: Fonts.semibold,
        color: Colors.pink,
    },
    textCount: {
        fontSize: Fonts.f14,
        fontFamily: Fonts.regular,
        color: Colors.grayLight,
    },
});
