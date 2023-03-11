import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';


export default function App() {
	const [ contactData, setContacts ] = React.useState ( [ ] );

	const getContactList = async ( ) => {
		const { status } = await Contacts.requestPermissionsAsync ( );

		if ( status !== 'granted' ) {
			return;
		}

		const { data } = await Contacts.getContactsAsync ( {
			fields: [
				Contacts.Fields.Name,
				Contacts.Fields.PhoneNumbers
			]
		} );

		setContacts ( data.map ( contact => ( { id: contact.id, name: contact.name, phone: contact.phoneNumbers [ 0 ].number } ) ) );
	};

	console.log ( 'AAAAAAAAAAA', contactData );

	const renderer = ( { item } ) => <View style={ { flexDirection: 'row', justifyContent: 'space-between' } }>
		<Text>{ item.name }</Text>
		<Text>{ item.phone }</Text>
	</View>

	return (
		<View style={styles.container}>
			<FlatList
				style={ { marginTop: '20%', width: '60%' } }
				keyExtractor={ item => item.id }
				renderItem={ renderer }
				data={ contactData }
			/>

			<Button onPress={ ( ) => getContactList ( ) } title='Get'/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
