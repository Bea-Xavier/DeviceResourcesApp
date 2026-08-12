import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Linking } from 'react-native';
import * as Contacts from 'expo-contacts/legacy';

const ContactsComponent = () => {
    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão Negada', 'Permissão para acessar contatos foi negada. 🙏')
            return;
        }

        try {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                setContacts(data);
            } else {
                Alert.alert('Sem contatos', 'Nenhum contato encontrado. 🌷');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os contatos.');
            console.log(error);
        }
    };

    const callTo = async (number) => {
        if (!number) {
            Alert.alert('Sem número', 'Este contato não possui número de telefone. 🙊');
            return;
        }

        // Remove espaços e caracteres estranhos, mantendo apenas números e o "+"
        const numberFormatted = number.replace(/[^0-9+]/g, '');
        const url = `tel:${numberFormatted}`;

        const supported = await Linking.canOpenURL(url);

        if (supported) {
            Linking.openURL(url);
        } else {
            Alert.alert('Erro', 'Não foi possível abrir o discador neste dispositivo.');
        }
    };

    useEffect(() => {
        loadContacts();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.contactItem}
            onPress={() => callTo(item.phoneNumbers?.[0]?.number)}
            activeOpacity={0.75}
        >
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                    {(item.firstName?.[0] || '💕').toUpperCase()}
                </Text>
            </View>

            <View style={styles.contactInfo}>
                <Text style={styles.contactName} numberOfLines={1}>
                    {item.firstName} {item.middleName} {item.lastName}
                </Text>

                {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                    <Text key={index} style={styles.contactDetail}>
                        📞 {phone.number}
                    </Text>
                ))}

                {item.emails && item.emails.map((email, index) => (
                    <Text key={index} style={styles.contactDetail}>
                        💌 {email.email}
                    </Text>
                ))}
            </View>

            <Text style={styles.callIcon}>💗</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardEmoji}>👯‍♀️</Text>
                <Text style={styles.cardTitle}>Meus Contatos</Text>
            </View>

            <TouchableOpacity
                style={styles.reloadButton}
                onPress={loadContacts}
                activeOpacity={0.8}
            >
                <Text style={styles.reloadButtonText}>🔄  Recarregar Contatos</Text>
            </TouchableOpacity>

            {contacts.length === 0 ? (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderEmoji}>🌸</Text>
                    <Text style={styles.placeholderText}>Nenhum contato carregado</Text>
                </View>
            ) : (
                <FlatList
                    data={contacts}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    scrollEnabled={false}
                />
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
    reloadButton: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFE1EC',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 16,
        marginBottom: 16,
    },
    reloadButtonText: {
        color: '#B4568C',
        fontSize: 13,
        fontWeight: '700',
    },
    list: {
        gap: 10,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF7FA',
        borderRadius: 18,
        padding: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#FFE9F1',
    },
    avatar: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: '#FF8FAB',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#7A2748',
    },
    contactDetail: {
        fontSize: 12,
        color: '#B4568C',
        marginTop: 2,
    },
    callIcon: {
        fontSize: 18,
        marginLeft: 8,
    },
    placeholder: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
    },
    placeholderEmoji: {
        fontSize: 28,
        marginBottom: 6,
    },
    placeholderText: {
        color: '#D68FAE',
        fontSize: 13,
        fontWeight: '500',
    },
});

export default ContactsComponent;