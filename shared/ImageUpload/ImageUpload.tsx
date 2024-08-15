import axios, { AxiosError } from "axios";
import {
    launchImageLibraryAsync,
    MediaTypeOptions,
    PermissionStatus,
    useMediaLibraryPermissions,
} from "expo-image-picker";
import FormData from "form-data";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import UploadSvg from "../../assets/icons/upload";
import { FILE_API } from "../api";
import { Colors, Fonts } from "../token";
import { UploadResponse } from "./imageUploader.interface";

interface ImageUploadProps {
    onUpload: (uri: string) => void;
    onError: (error: string) => void;
}

export function ImageUpload({ onUpload, onError }: ImageUploadProps) {
    const [libraryPermissions, requestLibraryPermission] =
        useMediaLibraryPermissions();

    const upload = async () => {
        const isPermissionGranted = await varifyMediaPermissions();
        if (!isPermissionGranted) {
            onError("Недостаточно прав");
            return;
        }

        const asset = await pickImage();
        if (!asset) {
            onError("Не вибрано изображение");
            return;
        }
        const uploadUrl = await uploadToServer(asset.uri, asset.fileName ?? "");
        if (!uploadUrl) {
            onError("Не удалось загрузить файл");
            return;
        }
        onUpload(uploadUrl);
    };

    const varifyMediaPermissions = async () => {
        if (libraryPermissions?.status === PermissionStatus.UNDETERMINED) {
            const res = await requestLibraryPermission();
            return res.granted;
        }

        if (libraryPermissions?.status === PermissionStatus.DENIED) {
            Alert.alert("Недостточно прав для доступа к фото");
            return false;
        }
        return true;
    };

    const pickImage = async () => {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.assets) {
            return null;
        }
        return result.assets[0];
        // await uploadToServer(
        //     result.assets[0].uri,
        //     result.assets[0].fileName ?? ""
        // );
        // onUpload(result.assets[0].uri);
    };

    const uploadToServer = async (url: string, name: string) => {
        const formData = new FormData();
        formData.append("files", {
            uri: url,
            name,
            type: "image/jpeg",
        });
        try {
            const { data } = await axios.post<UploadResponse>(
                FILE_API.uploadImage,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return data.urls.original;
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error(error);
            }
            return null;
        }
    };

    return (
        <Pressable onPress={upload}>
            <View style={styles.container}>
                <UploadSvg />
                <Text style={styles.text}>Загрузить изображение</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.violetDark,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 17,
        alignItems: "center",
    },
    text: {
        color: Colors.white,
        fontSize: Fonts.f14,
        fontFamily: Fonts.regular,
    },
});
