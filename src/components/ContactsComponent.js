import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import * as Contacts from 'expo-contacts/legacy';

const ContactsComponent = () => {
    const [contacts, setContacts] = useState([]);

    const loadContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();

        if (status !== 'granted') {
            Alert.alert('Permissão Negada', 'Permissão para acessar contatos foi negada.')
            return;
        }

        try {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
            });

            if (data.length > 0) {
                setContacts(data);
            } else {
                Alert.alert('Sem contatos', 'Nenhum contato encontrado.');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os contatos.');
            console.log(error);
        }
    };

    const callTo = async (number) => {
        if (!number) {
            Alert.alert('Sem número', 'Este contato não possui número de telefone.');
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
        >
            <Text style={styles.contactName}>
                {item.firstName} {item.middleName} {item.lastName}
            </Text>

            {item.phoneNumbers && item.phoneNumbers.map((phone, index) => (
                <Text key={index} style={styles.contactDetail}>
                    📞 {phone.number}
                </Text>
            ))}

            {item.email && item.emails.map((email, index) => (
                <Text key={index} style={styles.contactDetail}>
                    📧 {email.email}
                </Text>
            ))}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Button title='Recarregar Contatos' onPress={loadContacts}/>

            <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
    },
    contactItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    contactName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactDetail: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
});

export default ContactsComponent;