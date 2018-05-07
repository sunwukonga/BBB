import React from 'react';
import { Image, View, FlatList } from 'react-native';
import {
	Container,
	Header,
	Content,
	List,
	ListItem,
	Left,
	Body,
	Text,
	Button,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import BBBIcon from '../../components/BBBIcon';

//style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

//apollo client
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, graphql,Mutation } from "react-apollo";
import { withClientState } from "apollo-link-state";

// Get login status
var log_status = '';
const GET_LOGIN_STATUS = gql`
     query log @client{
           logged_in
        }`;

const App = () => (
<Query query={GET_LOGIN_STATUS}>
  {({ loading, error, data }) => {
     if (loading) return <Text>{`Loading...`}</Text>;
     if (error) return <Text>{`Error: ${error}`}</Text>;
      console.log('get data');
      console.log('profile_query '+data.logged_in);
      log_status = data.logged_in;
    return (
      <View/>
    )
  }}
</Query>
)

export default class ChatListScreen extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			data: [],
		}
	}


// Check weather user is login or not
componentDidMount = async () => {

				console.log("Log Status: " + log_status);

				if(log_status == false)
				{
					this.props.navigation.navigate('loginScreen');
				}
}


	_renderItem = ({ item }) => (
		<List
			style={item.counts == '0' ? styles.mainlist : styles.mainlists}
			key={item.id}>
			<ListItem
				avatar
				onPress={() => this.props.navigation.navigate('chatDetailScreen')}>
				<Left style={styles.left}>
					<View style={styles.bebyview}>
						<Image source={Images.tempUser} style={styles.userImage} />
					</View>
				</Left>
				<Body style={styles.bodys}>
					<View style={styles.titleview}>
						<Image source={Images.trollie} style={styles.rowImage} />
						<Text style={styles.title}>{item.title}</Text>
					</View>
					<View style={styles.bottomline} />
					<View style={styles.namecount}>
						<Text style={styles.name}>{item.name}</Text>
						{item.counts == '0' ? null : (
							<Text style={styles.count}>{item.counts}</Text>
						)}
					</View>
				</Body>
			</ListItem>
		</List>
	);

	render() {
		var listItemData = [
			{
				id: 1,
				name: 'Leza  Klenk',
				counts: '4',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 2,
				name: 'Leza  Klenk',
				counts: '4',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 3,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 4,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 5,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 6,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 7,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 8,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 9,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
			{
				id: 10,
				name: 'Leza  Klenk',
				counts: '0',
				title: 'Pre-loved stoller. Used twise and kept in storage',
			},
		];
		var leftComponent = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate('DrawerOpen')}>
				<BBBIcon
					name="Menu"
					size={Layout.moderateScale(18)}
					color={Colors.white}
				/>
			</Button>
		);
		return (
			<Container style={styles.container}>
				<BBBHeader title="Chats" leftComponent={leftComponent} />
				<Content>
					<App/>
					<FlatList
						data={listItemData}
						keyExtractor={listItemData => listItemData.id}
						renderItem={this._renderItem}
					/>
				</Content>
			</Container>
		);
	}
}
