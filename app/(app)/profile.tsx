import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { updateProfileAtom } from "../../entities/user/model/user.state";
import { Avatar } from "../../entities/user/ui/Avatar";
import { CustomButton } from "../../shared/CustomButton/CustomButton";
import { ImageUpload } from "../../shared/ImageUpload/ImageUpload";

export default function Profile() {
    const [image, setImage] = useState<string | null>(null);
    const [profile, updateProfile] = useAtom(updateProfileAtom);

    // const shareProfile = async () => {
    //     const isSharingAvalible = await Sharing.isAvailableAsync();
    //     if (!isSharingAvalible) {
    //         return;
    //     }
    //     Sharing.shareAsync("");
    // };

    const submitProfile = () => {
        if (!image) {
            return;
        }
        updateProfile({ photo: image });
    };

    useEffect(() => {
        if (profile && profile.profile?.photo) {
            setImage(profile.profile?.photo);
        }
    }, []);

    return (
        <View>
            <View style={styles.container}>
                <Avatar image={image} />

                <ImageUpload
                    onUpload={setImage}
                    onError={(e) => console.log(e)}
                />
            </View>
            <CustomButton text="Сохранить" onPress={submitProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    container: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
});

// Для камери !!!

// const varifyCameraPermissions = async () => {
//     if (cameraPermissions?.status === PermissionStatus.UNDETERMINED) {
//         const res = await requestCameraPermission();
//         return res.granted;
//     }

//     if (cameraPermissions?.status === PermissionStatus.DENIED) {
//         Alert.alert("Недостточно прав для доступа к камере");
//         return false;
//     }
//     return true;
// };

// const captureAvatar = async () => {
//     const isPermissionGranted = await varifyCameraPermissions();
//     if (!isPermissionGranted) {
//         return;
//     }
//     const result = await launchCameraAsync({
//         mediaTypes: MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [1, 1],
//         quality: 0.5,
//     });
//     if (!result.assets) {
//         return;
//     }
//     setImage(result.assets[0].uri);
// };
