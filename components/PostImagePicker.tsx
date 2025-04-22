import React from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function PostImagePicker({
    images,
    setImages,
}: {
    images: string[];
    setImages: (imgs: string[]) => void;
}) {
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.7,
        });

        if (!result.canceled) {
            const newUris = result.assets.map((asset) => asset.uri);
            setImages([...images, ...newUris]);
        }
    };

    const removeImage = (uri: string) => {
        setImages(images.filter((img) => img !== uri));
    };

    return (
        <View className="mt-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={pickImage}
                    className="w-24 h-24 bg-gray-200 rounded items-center justify-center mr-2"
                >
                    <Ionicons name="image" size={24} color="#888" />
                </TouchableOpacity>

                {images.map((uri) => (
                    <View key={uri} className="mr-2 relative">
                        <Image source={{ uri }} className="w-24 h-24 rounded" />
                        <TouchableOpacity
                            onPress={() => removeImage(uri)}
                            className="absolute top-0 right-0 bg-black/50 rounded-full p-1"
                        >
                            <Ionicons name="close" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}
