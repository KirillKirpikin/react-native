import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { StudentCourseDescription } from "../../model/course.module";
import { Chip } from "../../../../shared/Chip/Chip";
import { CustomButton } from "../../../../shared/CustomButton/CustomButton";
import { Colors, Fonts } from "../../../../shared/token";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export function CourseCard({
    image,
    shortTitle,
    courseOnDirection,
    alias,
    tariffs,
}: StudentCourseDescription) {
    return (
        <View style={styles.card}>
            <Image
                source={{
                    uri: image,
                }}
                style={styles.image}
                height={200}
            />
            <View style={styles.header}>
                <ProgressBar totalLessons={120} passedLesson={43} />
                <Text style={styles.title}>{shortTitle}</Text>
                <View style={styles.chips}>
                    {courseOnDirection.length > 0 &&
                        courseOnDirection.map((c) => (
                            <Chip
                                key={c.direction.name}
                                text={c.direction.name}
                            />
                        ))}
                </View>
                <MaskedView
                    maskElement={
                        <Text style={styles.tariff}>
                            Тариф &laquo;{tariffs[0].name}&raquo;{" "}
                        </Text>
                    }
                >
                    <LinearGradient
                        colors={["#D77BE5", "#6C38CC"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text
                            style={{
                                ...styles.tariff,
                                ...styles.tariffWithOpacity,
                            }}
                        >
                            Тариф &laquo;{tariffs[0].name}&raquo;{" "}
                        </Text>
                    </LinearGradient>
                </MaskedView>
            </View>
            <View style={styles.footer}>
                <CustomButton
                    onPress={() =>
                        Linking.openURL(
                            `https://purpleschool.ru/course/${alias}`
                        )
                    }
                    text="Купить"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "column",
        borderRadius: 10,
        backgroundColor: Colors.blackLight,
    },
    tariff: {
        marginTop: 10,
        fontSize: Fonts.f16,
        fontFamily: Fonts.regular,
    },
    tariffWithOpacity: {
        opacity: 0,
    },
    image: {
        borderRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
    },
    title: {
        fontSize: Fonts.f21,
        color: Colors.white,
        fontFamily: Fonts.semibold,
        marginBottom: 12,
    },
    chips: {
        flexDirection: "row",
        gap: 10,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    footer: {
        backgroundColor: Colors.violetDark,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
});
