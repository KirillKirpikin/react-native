import {
    getPermissionsAsync,
    IosAuthorizationStatus,
    requestPermissionsAsync,
    scheduleNotificationAsync,
} from "expo-notifications";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from "react-native";
import { StudentCourseDescription } from "../../entities/course/model/course.module";
import {
    courseAtom,
    loadCourseAtom,
} from "../../entities/course/model/course.state";
import { CourseCard } from "../../entities/course/ui/CourseCard/CourseCard";
import { CustomButton } from "../../shared/CustomButton/CustomButton";
import { Colors } from "../../shared/token";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

export default function MyCourses() {
    const { isLoading, courses } = useAtomValue(courseAtom);
    const loadCourses = useSetAtom(loadCourseAtom);

    useEffect(() => {
        loadCourses();
    }, []);

    const renderCourse = ({ item }: { item: StudentCourseDescription }) => {
        return (
            <View style={styles.item}>
                <CourseCard {...item} />
            </View>
        );
    };

    const allwsNotification = async () => {
        const settings = await getPermissionsAsync();
        return (
            settings.granted ||
            settings.ios?.status == IosAuthorizationStatus.PROVISIONAL
        );
    };

    const requestPermissions = async () => {
        return requestPermissionsAsync({
            ios: {
                allowAlert: true,
                allowBadge: true,
                allowSound: true,
            },
        });
    };

    const scheduleNotification = async () => {
        const granted = await allwsNotification();
        if (!granted) {
            await requestPermissions();
        }
        if (Device.isDevice) {
            const token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas.projectId,
            });
            console.log(token);
        }
    };

    return (
        <>
            {isLoading && (
                <ActivityIndicator
                    style={styles.activity}
                    size="large"
                    color={Colors.primary}
                />
            )}
            <CustomButton text="Напомнить" onPress={scheduleNotification} />
            {courses.length > 0 && (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.primary}
                            titleColor={Colors.primary}
                            refreshing={isLoading}
                            onRefresh={loadCourses}
                        />
                    }
                    data={courses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCourse}
                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "column",
        padding: 20,
    },
    activity: {
        marginTop: 68,
    },
});
