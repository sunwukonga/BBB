import React from 'react';
import { FlatList, Image, View } from 'react-native';
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
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// custom components
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
					{ backgroundColor: ischecked ? Colors.selectedRow : Colors.white },
				]}>
				<ListItem
					onPress={() => this.selectCountry(item.countryName)}
					style={styles.countryList}>
					<Left style={styles.left}>
						<Image source={item.flag} style={styles.flagStyle} />
					</Left>
					<Body style={styles.body}>
						<Text style={styles.countryNameTxt}>{item.countryName}</Text>
					</Body>
					<Right style={styles.right}>
						{this.state.countryName == item.countryName ? (
							<Ionicons
								name="ios-checkmark-circle"
								size={Layout.moderateScale(20)}
								color={Colors.primaryColor}
							/>
						) : null}
					</Right>
				</ListItem>
			</List>
		);
	}

	selectCountry(countryName) {
		this.setState({
			countryName: countryName,
		});
		setTimeout(() => {
			this.props.navigation.navigate('homeScreen');
		}, 300);
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
				<BBBIcon
					name="BackArrow"
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
