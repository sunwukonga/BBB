import React from 'react';
import {
	FlatList,
	Image,
	TouchableOpacity,
	View,
	ScrollView,
} from 'react-native';
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
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// custom components
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from '../../components/CheckBox';
import Dropdown from '../../components/Dropdown/dropdown';
import { Ionicons } from '@expo/vector-icons';
// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class FilterScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			segment: 4,
			truefalse: false,
			typography: 'Please select',
		};
	}

	_renderActiveComponent = () => {
		const { segment } = this.state;

		var items = [
			{
				id: 1,
				title: 'Adam Carlson',
				userType: 'Electrical Mechanic',
				userId: '#298640',
				userText: 'Optus Brisbane',
			},
		];

		if (segment === 1) {
			var items = [
				{
					id: 1,
					title: 'All',
				},
				{
					id: 2,
					title: 'Sale',
				},
				{
					id: 3,
					title: 'Barter',
				},
				{
					id: 4,
					title: 'Donate',
				},
				{
					id: 5,
					title: 'Sale & Barter',
				},
			];
			return (
				<View key={'Mode_list'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Mode</Text>
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem style={styles.offersListItem} key={'mode_' + index}>
									<CheckBox
										label={item.title}
										labelStyle={styles.checkInputText}
									/>
								</ListItem>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 2) {
			let items = [
				{
					value: 1,
				},
				{
					value: 2,
				},
				{
					value: 3,
				},
				{
					value: 4,
				},
				{
					value: 5,
				},
				{
					value: 6,
				},
				{
					value: 7,
				},
				{
					value: 8,
				},
				{
					value: 9,
				},
				{
					value: 10,
				},
				{
					value: 11,
				},
				{
					value: 12,
				},
			];
			return (
				<View key={'dateandtime'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Date & Time</Text>
					</View>
					<View style={styles.dateTimeSec}>
						<View style={styles.dropLayputSec}>
							<Text style={styles.daysText}>Days</Text>
							<View>
								<Dropdown
									data={items}
									value={2}
									labelHeight={0}
									dropdownPosition={0}
									baseColor="rgba(0, 0, 0, .00)"
									containerStyle={styles.dateDropDown}
								/>
								<Ionicons
									name="ios-arrow-down"
									style={styles.imageDropDownStyle}
									size={Layout.moderateScale(18)}
									color="#272727"
								/>
							</View>
						</View>
						<View style={styles.dropLayputSec}>
							<Text style={styles.daysText}>Hours</Text>
							<View>
								<Dropdown
									data={items}
									value={8}
									labelHeight={0}
									dropdownPosition={0}
									baseColor="rgba(0, 0, 0, .00)"
									containerStyle={styles.dateDropDown}
								/>
								<Ionicons
									name="ios-arrow-down"
									style={styles.imageDropDownStyle}
									size={Layout.moderateScale(18)}
									color="#272727"
								/>
							</View>
						</View>
					</View>
				</View>
			);
		} else if (segment === 3) {
			var items = [
				{
					id: 1,
					ratingvalue: 1,
				},
				{
					id: 2,
					ratingvalue: 2,
				},
				{
					id: 3,
					ratingvalue: 3,
				},
				{
					id: 4,
					ratingvalue: 4,
				},
				{
					id: 5,
					ratingvalue: 5,
				},
			];
			return (
				<View key={'ratings'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Ratings</Text>
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem
									style={styles.offersListItem}
									key={'ratings_' + index}>
									<Left>
										<CheckBox
											label={item.ratingvalue + ' Star'}
											labelStyle={styles.checkInputText}
										/>
									</Left>
									<Right>
										<View style={styles.ratingstarRight}>
											{this.ratingStarfn(item)}
										</View>
									</Right>
								</ListItem>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 4) {
			var items = [
				{
					id: 1,
					ratingvalue: 1,
				},
				{
					id: 2,
					ratingvalue: 2,
				},
				{
					id: 3,
					ratingvalue: 3,
				},
				{
					id: 4,
					ratingvalue: 4,
				},
				{
					id: 5,
					ratingvalue: 5,
				},
			];
			return (
				<View key={'identify'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Identify Verification</Text>
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem
									style={styles.offersListItem}
									key={'identify_' + index}>
									<Left>
										<CheckBox
											label={item.ratingvalue}
											labelStyle={styles.checkInputText}
										/>
									</Left>
								</ListItem>
							);
						})}
					</View>
					<View style={styles.offersListItem}>
						<Text style={styles.identityDescTitle}>
							Verified the identity of the user(s) Information
						</Text>

						<View style={styles.row}>
							<View>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text>
									<Text style={styles.identityDescText}>
										If they are logged in with an social media account, they
										have one green bar
									</Text>
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text>
									<Text style={styles.identityDescText}>
										If they are logged in with an social media account, they
										have one green bar
									</Text>
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text>
									<Text style={styles.identityDescText}>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry
									</Text>
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text>
									<Text style={styles.identityDescText}>
										Lorem Ipsum is simply dummy text of the printing and
										typesetting industry
									</Text>
								</Text>
							</View>
						</View>
					</View>
				</View>
			);
		} else if (segment === 5) {
			return items.map((item, value) => {
				return (
					<View key={'distance' + item.id}>
						<View style={styles.fltrTitleText}>
							<Text style={styles.filterDetailsTitle}>Distance</Text>
						</View>
						<View>
							<Text>Details</Text>
						</View>
					</View>
				);
			});
		} else if (segment === 6) {
			var items = [
				{
					id: 1,
					title: 'Baby Strollers',
				},
				{
					id: 2,
					title: 'Baby Food',
				},
				{
					id: 3,
					title: 'Baby Clothes',
				},
				{
					id: 4,
					title: 'Baby Skincare',
				},
				{
					id: 5,
					title: 'Baby Toys',
				},
				{
					id: 6,
					title: 'Baby Books',
				},
				{
					id: 7,
					title: 'Baby Strollers',
				},
				{
					id: 8,
					title: 'Baby Food',
				},
				{
					id: 9,
					title: 'Baby Clothes',
				},
				{
					id: 10,
					title: 'Baby Skincare',
				},
				{
					id: 11,
					title: 'Baby Toys',
				},
				{
					id: 12,
					title: 'Baby Books',
				},
				{
					id: 13,
					title: 'Baby Strollers',
				},
				{
					id: 14,
					title: 'Baby Food',
				},
			];
			return (
				<View key={'categories'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Categories</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem
									style={styles.offersListItem}
									key={'categories_' + index}>
									<CheckBox
										label={item.title}
										labelStyle={styles.checkInputText}
									/>
								</ListItem>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 7) {
			var items = [
				{
					id: 1,
					title: 'Di-2045',
				},
				{
					id: 2,
					title: 'Di-2046',
				},
				{
					id: 3,
					title: 'Di-2047',
				},
				{
					id: 4,
					title: 'Di-2048',
				},
				{
					id: 5,
					title: 'Di-2049',
				},
				{
					id: 6,
					title: 'Di-2050',
				},
				{
					id: 7,
					title: 'Di-2051',
				},
				{
					id: 8,
					title: 'Di-2052',
				},
				{
					id: 9,
					title: 'Di-2053',
				},
				{
					id: 10,
					title: 'Di-2054',
				},
				{
					id: 11,
					title: 'Di-2055',
				},
				{
					id: 12,
					title: 'Di-2056',
				},
				{
					id: 13,
					title: 'Di-2057',
				},
				{
					id: 14,
					title: 'Di-2058',
				},
			];
			return (
				<View key={'templates_list'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Templates</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem
									style={styles.offersListItem}
									key={'template_' + index}>
									<CheckBox
										label={item.title}
										labelStyle={styles.checkInputText}
									/>
								</ListItem>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 8) {
			var items = [
				{
					id: 1,
					title: 'All',
				},
				{
					id: 2,
					title: 'Stroller',
				},
				{
					id: 3,
					title: 'Philips',
				},
				{
					id: 4,
					title: 'Duluxe',
				},
				{
					id: 5,
					title: 'Pigeon',
				},
				{
					id: 6,
					title: 'Johnsons',
				},
				{
					id: 7,
					title: 'Walker',
				},
				{
					id: 8,
					title: 'Stroller',
				},
				{
					id: 9,
					title: 'Philips',
				},
				{
					id: 10,
					title: 'Duluxe',
				},
				{
					id: 11,
					title: 'Pigeon',
				},
				{
					id: 12,
					title: 'Johnsons',
				},
				{
					id: 13,
					title: 'Walker',
				},
				{
					id: 14,
					title: 'Duluxe',
				},
			];
			return (
				<View key={'tags_list'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Tags</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						{items.map((item, index) => {
							return (
								<ListItem style={styles.offersListItem} key={'tags_' + index}>
									<CheckBox
										label={item.title}
										labelStyle={styles.checkInputText}
									/>
								</ListItem>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 9) {
			return (
				<View key={'offers'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Counter Offers</Text>
					</View>
					<View>
						<ListItem style={styles.offersListItem}>
							<CheckBox
								label="Allow counter offer"
								labelStyle={styles.checkInputText}
							/>
						</ListItem>
					</View>
				</View>
			);
		}
	};

	ratingStarfn(item) {
		var tempItem = [];
		for (var i = 0; i < 5; i++) {
			if (i < item.ratingvalue) {
				tempItem.push(
					<BBBIcon
						name="Star"
						color="#feb532"
						size={Layout.moderateScale(16)}
					/>
				);
			} else {
				tempItem.push(
					<BBBIcon
						name="Star"
						color="#bebebe"
						size={Layout.moderateScale(16)}
					/>
				);
			}
		}
		return tempItem;
	}

	render() {
		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);

		var filterItem = [
			{
				id: 1,
				name: 'ModeSvg',
			},
			{
				id: 2,
				name: 'DateTimeSvg',
			},
			{
				id: 3,
				name: 'StarSvg',
			},
			{
				id: 4,
				name: 'IdentitySvg',
			},
			{
				id: 5,
				name: 'DistanceSvg',
			},
			{
				id: 6,
				name: 'CategoriesSvg',
			},
			{
				id: 7,
				name: 'TemplateSvg',
			},
			{
				id: 8,
				name: 'TagsSvg',
			},
			{
				id: 9,
				name: 'OfferSvg',
			},
		];

		return (
			<Container style={styles.container}>
				<BBBHeader title="Filter" leftComponent={leftComponent} />

				<View style={{ flexDirection: 'row', width: Layout.WIDTH }}>
					<Content
						style={{
							width: Layout.WIDTH * 0.15,
							height: Layout.HEIGHT,
							backgroundColor: '#272727',
							borderWidth: 0,
							borderColor: '#ffffff',
						}}>
						<View
							style={{
								flexDirection: 'column',
								borderRightWidth: 0.3,
								borderRightColor: '#ffffff',
							}}>
							{filterItem.map((item, index) => {
								return (
									<TouchableOpacity
										onPress={() => this.setState({ segment: item.id })}
										style={[
											styles.filterTitle,
											{
												backgroundColor:
													this.state.segment == item.id ? '#ffffff' : '#272727',
											},
										]}
										key={index}>
										<BBBIcon
											name={item.name}
											size={Layout.moderateScale(18)}
											style={{
												color:
													this.state.segment == item.id ? '#272727' : '#ffffff',
											}}
										/>
									</TouchableOpacity>
								);
							})}
						</View>
					</Content>

					<View style={styles.fileterSec}>
						<Content>{this._renderActiveComponent()}</Content>
					</View>
				</View>
			</Container>
		);
	}
}
