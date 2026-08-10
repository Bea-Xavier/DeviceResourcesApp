import React, { useState } from 'react';
import { View, Button, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = () => {
        Alert.alert(
            'Selecionar imagem',
            'Deseja utilizar a câmera ou a galeria?',
            [
                {
                    text: 'Câmera',
                    onPress: openCamera,
                },
                {
                    text: 'Galeria',
                    onPress: openGallery,
                },
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
            ]
        );
    };

    const openCamera = async () => {
        const permission =
            await ImagePicker.requestCameraPermissionsAsync();

        if (permission.status !== 'granted') {
            Alert.alert(
                'Permissão Negada',
                'Precisamos de permissão para acessar a câmera.'
            );
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        if (result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const openGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.status !== 'granted') {
            Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        if (result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Button
                title="Selecionar Imagem"
                onPress={selectImage}
            />

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },

    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
});

export default ImagePickerComponent;