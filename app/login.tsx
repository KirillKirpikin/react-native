import { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
} from "react-native";
import { CustomButton } from "../shared/CustomButton/CustomButton";
import { CustomLink } from "../shared/CustomLink/CustomLink";
import { ErrorNotification } from "../shared/ErrorNotification/ErrorNotification";
import { Input } from "../shared/input/input";
import { Colors, Gaps } from "../shared/token";
import { loginAtom } from "../entities/auth/model/auth.state";
import { useAtom } from "jotai";
import { router } from "expo-router";
import { useScreenOrientation } from "../shared/hooks";
import { Orientation } from "expo-screen-orientation";

const textStyle = {
    color: "blue",
};

export default function Login() {
    const [localError, setLocalError] = useState<string | undefined>();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [{ access_token, error, isLoading }, login] = useAtom(loginAtom);

    const orientation = useScreenOrientation();

    const submit = () => {
        if (!email) {
            setLocalError("Не введен email");
            return;
        }
        if (!password) {
            setLocalError("Не введен пароль");
            return;
        }
        login({ email: email, password });
    };

    useEffect(() => {
        if (error) {
            setLocalError(error);
        }
    }, [error]);

    useEffect(() => {
        if (access_token) {
            router.replace("/");
        }
    }, [access_token]);

    return (
        <View style={styles.container}>
            <ErrorNotification error={localError} />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.content}
            >
                <Image
                    source={require("../assets/favicon.png")}
                    resizeMode="contain"
                    style={styles.logo}
                />
                <View style={styles.form}>
                    <View
                        style={{
                            ...styles.inputs,
                            flexDirection:
                                orientation === Orientation.PORTRAIT_UP
                                    ? "column"
                                    : "row",
                        }}
                    >
                        <Input
                            style={{
                                width:
                                    orientation === Orientation.PORTRAIT_UP
                                        ? "auto"
                                        : Dimensions.get("window").width / 2 -
                                          16 -
                                          48,
                            }}
                            placeholder="Email"
                            onChangeText={(value) => setEmail(value)}
                        />
                        <Input
                            style={{
                                width:
                                    orientation === Orientation.PORTRAIT_UP
                                        ? "auto"
                                        : Dimensions.get("window").width / 2 -
                                          16 -
                                          48,
                            }}
                            isPassword={true}
                            placeholder="Пароль"
                            onChangeText={(value) => setPassword(value)}
                        />
                    </View>
                    <CustomButton
                        text="Войти"
                        onPress={submit}
                        isLoading={isLoading}
                    />
                </View>
                <CustomLink href={"/restore"} text="Восстановить пароль" />
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 55,
        backgroundColor: Colors.black,
    },
    content: {
        alignItems: "center",
        gap: Gaps.g50,
    },
    form: {
        alignSelf: "stretch",
        gap: Gaps.g16,
    },
    logo: {
        height: 50,
    },
    inputs: {
        gap: 16,
    },
});
