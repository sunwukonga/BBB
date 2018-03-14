import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import {
	Container,
	Content,
	List,
	ListItem,
	Body,
	Left,
	Right,
	Text,
	Button,
	Icon,
	CheckBox,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom components
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader/';
import BBBIcon from '../../components/BBBIcon';

// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class CountryScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			countryName: '',
		};
	}

	_renderItem = ({ item }) =>
		this.state.countryName == item.countryName
			? this._handleItem(item, true)
			: this._handleItem(item, false);

	_handleItem(item, ischecked) {
		return (
			<List
				style={[
					styles.mainlist,
					{ backgroundColor: ischecked ? '#e8f2f2' : Colors.white },
				]}>
				<ListItem
					onPress={() => this.selectCountry(item.countryName)}
					style={styles.countryList}>
					<Image source={item.flag} style={styles.flagStyle} />
					<Body>
						<Text style={styles.countryNameTxt}>{item.countryName}</Text>
					</Body>
					<Right>
						{this.state.countryName == item.countryName ? (
							<Ionicons
								name="ios-checkmark-circle"
								size={Layout.moderateScale(20)}
								color="#1fa6a4"
							/>
						) : null}
					</Right>
				</ListItem>
			</List>
		);
	}

	selectCountry(countryName) {
		this.setState({ countryName: countryName });
		setTimeout(() => {
			this.props.navigation.navigate('mainScreen');
		}, 500);
	}

	render() {
		var listItemData = [
			{
				id: 1,
				countryName: 'Australia',
				flag: Images.Australia,
			},
			{
				id: 2,
				countryName: 'Germany',
				flag: Images.Germany,
			},
			{
				id: 3,
				countryName: 'Indonesia',
				flag: Images.Indonesia,
			},
			{
				id: 4,
				countryName: 'Malaysia',
				flag: Images.Malaysia,
			},
			{
				id: 5,
				countryName: 'Philippines',
				flag: Images.Philippines,
			},
			{
				id: 6,
				countryName: 'Singapore',
				flag: Images.Singapore,
			},
			{
				id: 7,
				countryName: 'USA',
				flag: Images.USA,
			},
		];
		var leftComponent = (
			<Button
				transparent
				onPress={() => this.props.navigation.navigate('mainScreen')}>
				<Icon
					name="md-arrow-back"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);

		return (
			<Container style={styles.container}>
				<BBBHeader title="Select Country" enableSearch />
				<Content>
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
