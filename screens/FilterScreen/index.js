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
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// custom components
import Baby from '../../components/Baby';
import CheckboxBlank from '../../components/CheckboxBlank';
import CheckboxChecked from '../../components/CheckboxChecked';
import IdentityVerification1 from '../../components/IdentityVerification1';
import IdentityVerification2 from '../../components/IdentityVerification2';
import IdentityVerification3 from '../../components/IdentityVerification3';
import IdentityVerification4 from '../../components/IdentityVerification4';
import IdentityVerification5 from '../../components/IdentityVerification5';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from '../../components/CheckBox';
import Dropdown from '../../components/Dropdown/dropdown';
import Slider from '../../components/Slider';
import { Ionicons } from '@expo/vector-icons';
// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class FilterScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			segment: 1,
			truefalse: false,
			typography: 'Please select',
			SliderValue: 0,
		};
	}

	onClick(data) {
		data.checked = !data.checked;
		// let msg = data.checked ? 'you checked ' : 'you unchecked ';
	}

	identifyFn(data) {
		var temp = [];
		if (data == 1) {
			temp = (
				<View style={{ marginLeft: Layout.moderateScale(10) }}>
					<IdentityVerification1
						width={Layout.moderateScale(30)}
						height={Layout.moderateScale(30)}
					/>
				</View>
			);
		} else if (data == 2) {
			temp = (
				<View style={{ marginLeft: Layout.moderateScale(10) }}>
					<IdentityVerification2
						width={Layout.moderateScale(30)}
						height={Layout.moderateScale(30)}
					/>
				</View>
			);
		} else if (data == 3) {
			temp = (
				<View style={{ marginLeft: Layout.moderateScale(10) }}>
					<IdentityVerification3
						width={Layout.moderateScale(30)}
						height={Layout.moderateScale(30)}
					/>
				</View>
			);
		} else if (data == 4) {
			temp = (
				<View style={{ marginLeft: Layout.moderateScale(10) }}>
					<IdentityVerification4
						width={Layout.moderateScale(30)}
						height={Layout.moderateScale(30)}
					/>
				</View>
			);
		} else {
			temp = (
				<View style={{ marginLeft: Layout.moderateScale(10) }}>
					<IdentityVerification5
						width={Layout.moderateScale(30)}
						height={Layout.moderateScale(30)}
					/>
				</View>
			);
		}
		return temp;
	}

	_renderActiveComponent = () => {
		const { segment } = this.state;

		if (segment === 1) {
			var items = [
				{
					id: 1,
					title: 'All',
					checked: false,
				},
				{
					id: 2,
					title: 'Sale',
					checked: false,
				},
				{
					id: 3,
					title: 'Barter',
					checked: false,
				},
				{
					id: 4,
					title: 'Donate',
					checked: false,
				},
				{
					id: 5,
					title: 'Sale & Barter',
					checked: false,
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
								<View style={styles.offersListItem} key={'mode_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => this.onClick(item)}
										checkBoxColor={'#fff'}
										rightText={item.title}
										rightTextStyle={{
											color: Colors.secondaryColor,
											fontSize: Layout.moderateScale(18),
											marginLeft: Layout.moderateScale(10),
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<CheckboxBlank
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
										checkedImage={
											<CheckboxChecked
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
									/>
								</View>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 2) {
			var items = [
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
								{/* <Ionicons
									name="ios-arrow-down"
									style={styles.imageDropDownStyle}
									size={Layout.moderateScale(18)}
									color="#272727"
								/> */}
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
								{/* <Ionicons
									name="ios-arrow-down"
									style={styles.imageDropDownStyle}
									size={Layout.moderateScale(18)}
									color="#272727"
								/> */}
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
					checked: false,
				},
				{
					id: 2,
					ratingvalue: 2,
					checked: false,
				},
				{
					id: 3,
					ratingvalue: 3,
					checked: false,
				},
				{
					id: 4,
					ratingvalue: 4,
					checked: false,
				},
				{
					id: 5,
					ratingvalue: 5,
					checked: false,
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
								<List
									style={[styles.offersListItem, { flexDirection: 'row' }]}
									key={'ratings_' + index}>
									<View
										style={{
											width: Layout.WIDTH * 0.6,
										}}>
										<CheckBox
											style={styles.chboxRemember}
											onClick={() => this.onClick(item)}
											checkBoxColor={'#fff'}
											rightText={item.ratingvalue + ' Star'}
											rightTextStyle={{
												color: Colors.secondaryColor,
												fontSize: Layout.moderateScale(18),
												marginLeft: Layout.moderateScale(10),
												fontFamily: 'roboto-reguler',
											}}
											unCheckedImage={
												<CheckboxBlank
													width={Layout.moderateScale(20)}
													height={Layout.moderateScale(20)}
												/>
											}
											checkedImage={
												<CheckboxChecked
													width={Layout.moderateScale(20)}
													height={Layout.moderateScale(20)}
												/>
											}
										/>
									</View>
									<View style={styles.ratingstarRight}>
										{this.ratingStarfn(item)}
									</View>
								</List>
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
					checked: false,
				},
				{
					id: 2,
					ratingvalue: 2,
					checked: false,
				},
				{
					id: 3,
					ratingvalue: 3,
					checked: false,
				},
				{
					id: 4,
					ratingvalue: 4,
					checked: false,
				},
				{
					id: 5,
					ratingvalue: 5,
					checked: false,
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
								<View style={styles.offersListItem} key={'identify_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => this.onClick(item)}
										checkBoxColor={'#fff'}
										rightTextView={this.identifyFn(item.ratingvalue)}
										rightTextStyle={{
											color: Colors.secondaryColor,
											fontSize: Layout.moderateScale(18),
											marginLeft: Layout.moderateScale(10),
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<CheckboxBlank
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
										checkedImage={
											<CheckboxChecked
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
									/>
								</View>
							);
						})}
					</View>
					<View style={styles.offersListItem1}>
						<Text style={styles.identityDescTitle}>
							Verified the identity of the user(s) Information
						</Text>

						<View style={styles.row}>
							<View style={styles.bulletText}>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text style={styles.identityDescText}>
									If they are logged in with an social media account, they have
									one green bar
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.bulletText}>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text style={styles.identityDescText}>
									If they are logged in with an social media account, they have
									one green bar
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.bulletText}>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text style={styles.identityDescText}>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry
								</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.bulletText}>
								<Text>{'\u2022' + ' '}</Text>
							</View>
							<View style={styles.bulletText}>
								<Text style={styles.identityDescText}>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry
								</Text>
							</View>
						</View>
					</View>
				</View>
			);
		} else if (segment === 5) {
			return (
				<View key={'distance'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Distance</Text>
					</View>
					<View style={styles.distanceSlider}>
						<Slider
							minimumValue={0}
							maximumValue={100}
							step={25}
							thumbTintColor="transparent"
							minimumTrackTintColor="#0f9d58"
							maximumTrackTintColor="#939393"
							thumbStyle={styles.thumb}
							thumbTouchSize={{
								width: Layout.moderateScale(40),
								height: Layout.moderateScale(100),
							}}
							custom={true}
							onValueChange={ChangedValue =>
								this.setState({ SliderValue: parseInt(ChangedValue) })
							}
							thumbImageComponent={
								<View
									style={{
										position: 'absolute',
										top: Layout.moderateScale(-50),
										left: Layout.moderateScale(-20),
									}}>
									<BBBIcon
										name="DistanceSliderSvg"
										color="#0f9d58"
										size={Layout.moderateScale(40)}
										style={styles.thumbImageStyle}
									/>
									<Text
										style={{
											color: '#fff',
											fontSize: Layout.moderateScale(10),
											top: Layout.moderateScale(-40),
											left: Layout.moderateScale(-5),
											textAlign: 'center',
										}}>
										{this.state.SliderValue}
									</Text>
								</View>
							}
						/>
					</View>
				</View>
			);
		} else if (segment === 6) {
			var items = [
				{
					id: 1,
					title: 'Baby Strollers',
					checked: false,
				},
				{
					id: 2,
					title: 'Baby Food',
					checked: false,
				},
				{
					id: 3,
					title: 'Baby Clothes',
					checked: false,
				},
				{
					id: 4,
					title: 'Baby Skincare',
					checked: false,
				},
				{
					id: 5,
					title: 'Baby Toys',
					checked: false,
				},
				{
					id: 6,
					title: 'Baby Books',
					checked: false,
				},
				{
					id: 7,
					title: 'Baby Strollers',
					checked: false,
				},
				{
					id: 8,
					title: 'Baby Food',
					checked: false,
				},
				{
					id: 9,
					title: 'Baby Clothes',
					checked: false,
				},
				{
					id: 10,
					title: 'Baby Skincare',
					checked: false,
				},
				{
					id: 11,
					title: 'Baby Toys',
					checked: false,
				},
				{
					id: 12,
					title: 'Baby Books',
					checked: false,
				},
				{
					id: 13,
					title: 'Baby Strollers',
					checked: false,
				},
				{
					id: 14,
					title: 'Baby Food',
					checked: false,
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
								<View style={styles.offersListItem} key={'categories_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => this.onClick(item)}
										checkBoxColor={'#fff'}
										rightText={item.title}
										rightTextStyle={{
											color: Colors.secondaryColor,
											fontSize: Layout.moderateScale(18),
											marginLeft: Layout.moderateScale(10),
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<CheckboxBlank
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
										checkedImage={
											<CheckboxChecked
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
									/>
								</View>
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
					checked: false,
				},
				{
					id: 2,
					title: 'Di-2046',
					checked: false,
				},
				{
					id: 3,
					title: 'Di-2047',
					checked: false,
				},
				{
					id: 4,
					title: 'Di-2048',
					checked: false,
				},
				{
					id: 5,
					title: 'Di-2049',
					checked: false,
				},
				{
					id: 6,
					title: 'Di-2050',
					checked: false,
				},
				{
					id: 7,
					title: 'Di-2051',
					checked: false,
				},
				{
					id: 8,
					title: 'Di-2052',
					checked: false,
				},
				{
					id: 9,
					title: 'Di-2053',
					checked: false,
				},
				{
					id: 10,
					title: 'Di-2054',
					checked: false,
				},
				{
					id: 11,
					title: 'Di-2055',
					checked: false,
				},
				{
					id: 12,
					title: 'Di-2056',
					checked: false,
				},
				{
					id: 13,
					title: 'Di-2057',
					checked: false,
				},
				{
					id: 14,
					title: 'Di-2058',
					checked: false,
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
								<View style={styles.offersListItem} key={'template_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => this.onClick(item)}
										checkBoxColor={'#fff'}
										rightText={item.title}
										rightTextStyle={{
											color: Colors.secondaryColor,
											fontSize: Layout.moderateScale(18),
											marginLeft: Layout.moderateScale(10),
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<CheckboxBlank
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
										checkedImage={
											<CheckboxChecked
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
									/>
								</View>
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
					checked: false,
				},
				{
					id: 2,
					title: 'Stroller',
					checked: false,
				},
				{
					id: 3,
					title: 'Philips',
					checked: false,
				},
				{
					id: 4,
					title: 'Duluxe',
					checked: false,
				},
				{
					id: 5,
					title: 'Pigeon',
					checked: false,
				},
				{
					id: 6,
					title: 'Johnsons',
					checked: false,
				},
				{
					id: 7,
					title: 'Walker',
					checked: false,
				},
				{
					id: 8,
					title: 'Stroller',
					checked: false,
				},
				{
					id: 9,
					title: 'Philips',
					checked: false,
				},
				{
					id: 10,
					title: 'Duluxe',
					checked: false,
				},
				{
					id: 11,
					title: 'Pigeon',
					checked: false,
				},
				{
					id: 12,
					title: 'Johnsons',
					checked: false,
				},
				{
					id: 13,
					title: 'Walker',
					checked: false,
				},
				{
					id: 14,
					title: 'Duluxe',
					checked: false,
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
								<View style={styles.offersListItem} key={'tags_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => this.onClick(item)}
										checkBoxColor={'#fff'}
										rightText={item.title}
										rightTextStyle={{
											color: Colors.secondaryColor,
											fontSize: Layout.moderateScale(18),
											marginLeft: Layout.moderateScale(10),
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<CheckboxBlank
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
										checkedImage={
											<CheckboxChecked
												width={Layout.moderateScale(20)}
												height={Layout.moderateScale(20)}
											/>
										}
									/>
								</View>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 9) {
			var item = [
				{
					id: 1,
					checked: false,
				},
			];
			return (
				<View key={'offers'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Counter Offers</Text>
					</View>
					<View style={styles.offersListItem}>
						<CheckBox
							style={styles.chboxRemember}
							onClick={() => this.onClick(item)}
							checkBoxColor={'#fff'}
							rightText={'Allow counter offer'}
							rightTextStyle={{
								color: Colors.secondaryColor,
								fontSize: Layout.moderateScale(18),
								marginLeft: Layout.moderateScale(10),
								fontFamily: 'roboto-reguler',
							}}
							unCheckedImage={
								<CheckboxBlank
									width={Layout.moderateScale(20)}
									height={Layout.moderateScale(20)}
								/>
							}
							checkedImage={
								<CheckboxChecked
									width={Layout.moderateScale(20)}
									height={Layout.moderateScale(20)}
								/>
							}
						/>
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

		var rightComponent = (
			<View style={styles.rightComponentStyle}>
				<TouchableOpacity onPress={() => alert('RESET Clicked')}>
					<Text style={styles.headerText}>RESET</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ marginLeft: Layout.moderateScale(8) }}
					onPress={() => alert('APPLY Clicked')}>
					<Text style={styles.headerText}>APPLY</Text>
				</TouchableOpacity>
			</View>
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
				<BBBHeader
					title="Filter"
					leftComponent={leftComponent}
					rightComponent={rightComponent}
				/>

				<View style={styles.mainContent}>
					<Content style={styles.contents}>
						<View style={styles.filterContentSec}>
							{filterItem.map((item, index) => {
								return (
									<TouchableOpacity
										onPress={() => this.setState({ segment: item.id })}
										style={[
											styles.filterTitle,
											{
												backgroundColor:
													this.state.segment == item.id
														? Colors.white
														: Colors.secondaryColor,
											},
										]}
										key={index}>
										<BBBIcon
											name={item.name}
											size={Layout.moderateScale(18)}
											style={{
												color:
													this.state.segment == item.id
														? Colors.secondaryColor
														: Colors.white,
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
