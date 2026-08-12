import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = () => {
    const [imageUri, setImageUri] = useState(null);

    const selectImage = () => {
        Alert.alert(
            '📷 Selecionar imagem',
            'Deseja utilizar a câmera ou a galeria?',
            [
                {
                    text: '📸 Câmera',
                    onPress: openCamera,
                },
                {
                    text: '🖼️ Galeria',
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
                'Precisamos de permissão para acessar a câmera. 🙏'
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

    const excluirImagem = () => {
        Alert.alert(
            '🗑️ Excluir imagem',
            'Tem certeza que deseja remover essa foto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: () => setImageUri(null),
                },
            ]
        );
    };

    const openGallery = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permission.status !== 'granted') {
            Alert.alert('Permissão Negada', 'Permissão para acessar a galeria foi negada. 🙏');
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
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>🖼️</Text>
                <Text style={styles.cardTitle}>Minha Foto</Text>
            </View>

            {!imageUri && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={selectImage}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>💗  Selecionar Imagem</Text>
                </TouchableOpacity>
            )}

            {imageUri ? (
                <>
                    <View style={styles.imageWrapper}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={selectImage}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.replaceButtonText}>🔄 Trocar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={excluirImagem}
                            activeOpacity={0.8}
                        >
                            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>🗑️  Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderEmoji}>🌷</Text>
                    <Text style={styles.placeholderText}>Nenhuma imagem ainda</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: 20,
        marginBottom: 18,
        alignItems: 'center',
        shadowColor: '#FF8FAB',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#FFE1EC',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginBottom: 16,
    },
    cardEmoji: {
        fontSize: 20,
        marginRight: 6,
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#9B2D5E',
    },
    button: {
        backgroundColor: '#FF8FAB',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 18,
        shadowColor: '#FF6B9D',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    imageWrapper: {
        marginTop: 18,
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#FFE1EC',
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 16,
    },
    actionsRow: {
        flexDirection: 'row',
        marginTop: 14,
        gap: 10,
    },
    actionButton: {
        backgroundColor: '#FFE1EC',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 16,
    },
    actionButtonText: {
        fontSize: 13,
        fontWeight: '700',
    },
    deleteButton: {
        backgroundColor: '#FFE0E0',
    },
    deleteButtonText: {
        color: '#D6486B',
    },
    replaceButtonText: {
        color: '#B4568C',
    },
    placeholder: {
        marginTop: 18,
        width: 180,
        height: 180,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#FFD6E8',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF7FA',
    },
    placeholderEmoji: {
        fontSize: 30,
        marginBottom: 6,
    },
    placeholderText: {
        color: '#D68FAE',
        fontSize: 13,
        fontWeight: '500',
    },
});

export default ImagePickerComponent;