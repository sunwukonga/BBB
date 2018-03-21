import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
	ListView,
	TextInput,
} from 'react-native';
import {
	ActionSheet,
	Container,
	Text,
	Button,
	Icon,
	Item,
	Input,
} from 'native-base';
import { MapView } from 'expo';
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import RedioSelected from '../../components/RedioSelected';
import RedioUnselect from '../../components/RedioUnselect';
import Add from '../../components/Add';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Dropdown from '../../components/Dropdown/dropdown';

import styles from './styles';
import BBBIcon from '../../components/BBBIcon';
import CheckBox from 'react-native-check-box';
import { Layout, Colors, Images } from '../../constants/';
// import { Dropdown } from 'react-native-material-dropdown';

import Collapsible from 'react-native-collapsible';
const dataObjectsCates = [{ id: '1', text: 'jkhf' }];
const dataObjectsTags = [{ id: '1', text: 'jsadfkhf' }];
export default class CreateNewItemScreen extends React.Component {
	constructor(props) {
		super(props);
		const rowHasChanged = (r1, r2) => r1 !== r2;
		const dataObjects = [
			{ id: 'aimg0001', source: Images.logo, flag: false },
			{ id: 'aimg0001', source: Images.logo, flag: false },
			{ id: 'aimg0001', source: Images.logo, flag: false },
			{ id: 'aimg0001', source: Images.logo, flag: true },
		];

		// DataSource configured
		const ds = new ListView.DataSource({ rowHasChanged });
		const dsCates = new ListView.DataSource({ rowHasChanged });
		const dsTags = new ListView.DataSource({ rowHasChanged });

		this.state = {
			dataSource: ds.cloneWithRows(dataObjects),
			dataSourceCates: dsCates.cloneWithRows(dataObjectsCates),
			dataSourceTags: dsTags.cloneWithRows(dataObjectsTags),
			texts: '',
			isCollapsedSale: false,
			isCollapsedBarter: true,
			isCollapsedDonate: true,
			isCollapsedDnS: true,
		};
	}
	onClick(data) {
		data.checked = !data.checked;
		let msg = data.checked ? 'you checked ' : 'you unchecked ';
	}
	static navigationOptions = {
		header: null,
	};
	_renderRow(rowData) {
		return (
			<View style={styles.imagesSubView}>
				{rowData.flag ? (
					<View>
						<ActionSheet
							ref={c => {
								ActionSheet.actionsheetInstance = c;
							}}
						/>
						{/* <TouchableOpacity
							onPress={() =>
								ActionSheet.show(
									{
										options: BUTTONS,
										cancelButtonIndex: CANCEL_INDEX,
										title: 'Vælg billede',
									},
									buttonIndex => {
										this.checkOPtion(BUTTONS[buttonIndex]);
									}
								)
							}> */}
						<View style={styles.addIcon}>
							<Add width={Layout.HEIGHT * 0.03} height={Layout.HEIGHT * 0.03} />
							<Text style={styles.addimage}>Add Image</Text>
						</View>
						{/* </TouchableOpacity> */}
					</View>
				) : (
					<View>
						<Image source={Images.trollie} style={styles.rowImage} />
						{/*<Icon name="ios-close-circle" style={styles.rowFlagImage} onPress={()=>this._handleRemoveImage(rowData.id)}/>*/}
					</View>
				)}
			</View>
		);
	}

	_renderRowCategory(rowData) {
		return (
			<View style={styles.mainRowView}>
				<Text style={styles.txttemp}>{rowData.text}</Text>
				<TouchableOpacity onPress={() => this._renderDeleteItem(rowData.id)}>
					<Ionicons
						name="md-close"
						size={Layout.moderateScale(15)}
						color="black"
						style={styles.cancle}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	onPressAdd = () => {
		// console.log(this.state.texts);
		var idss = dataObjectsCates.length + 1;
		dataObjectsCates.push({ id: idss.toString(), text: this.state.text });
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.setState({ dataSourceCates: ds.cloneWithRows(dataObjectsCates) });
	};

	onPressHeadSale = () => {
		if (this.state.isCollapsedSale) {
			this.setState({
				isCollapsedSale: false,
				isCollapsedBarter: true,
				isCollapsedDonate: true,
				isCollapsedDnS: true,
			});
		} else {
			this.setState({ isCollapsedSale: true });
		}
	};
	onPressHeadBarter = () => {
		if (this.state.isCollapsedBarter) {
			this.setState({
				isCollapsedSale: true,
				isCollapsedBarter: false,
				isCollapsedDonate: true,
				isCollapsedDnS: true,
			});
		} else {
			this.setState({ isCollapsedBarter: true });
		}
	};
	onPressHeadDonate = () => {
		if (this.state.isCollapsedDonate) {
			this.setState({
				isCollapsedSale: true,
				isCollapsedBarter: true,
				isCollapsedDonate: false,
				isCollapsedDnS: true,
			});
		} else {
			this.setState({ isCollapsedDonate: true });
		}
	};
	onPressHeadDnS = () => {
		if (this.state.isCollapsedDnS) {
			this.setState({
				isCollapsedSale: true,
				isCollapsedBarter: true,
				isCollapsedDonate: true,
				isCollapsedDnS: false,
			});
		} else {
			this.setState({ isCollapsedDnS: true });
		}
	};

	_renderDeleteItem(index) {
		let tmp = dataObjectsCates;
		let newarray = [];
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].id != index) {
				newarray.push({ id: tmp[i].id, text: tmp[i].text });
			}
		}
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.setState({ dataSourceCates: ds.cloneWithRows(newarray) });
	}

	_renderRowTags(rowData) {
		return (
			<View style={styles.mainRowView}>
				<Text style={styles.txttemp}>{rowData.text}</Text>
				<TouchableOpacity onPress={() => this._renderDeleteTag(rowData.id)}>
					<Ionicons
						name="md-close"
						size={Layout.moderateScale(15)}
						color="black"
						style={styles.cancle}
					/>
				</TouchableOpacity>
			</View>
		);
	}

	onPressAddTag = () => {
		var idss = dataObjectsTags.length + 1;
		dataObjectsTags.push({ id: idss.toString(), text: this.state.textd });
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.setState({ dataSourceTags: ds.cloneWithRows(dataObjectsTags) });
	};

	_renderDeleteTag(index) {
		let tmp = dataObjectsTags;
		let newarray = [];
		for (var i = 0; i < tmp.length; i++) {
			if (tmp[i].id != index) {
				newarray.push({ id: tmp[i].id, text: tmp[i].text });
			}
		}
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		});
		this.setState({ dataSourceTags: ds.cloneWithRows(newarray) });
	}

	render() {
		let data = [
			{
				value: 'Banana',
			},
			{
				value: 'Mango',
			},
			{
				value: 'Pear',
			},
		];
		let dataCurrency = [
			{
				value: 'USD',
			},
			{
				value: 'INR',
			},
			{
				value: 'EUR',
			},
		];
		let dataTime = [
			{
				value: 'AM',
			},
			{
				value: 'PM',
			},
		];
		let dataCate = [
			{
				value: 'Baby A',
			},
			{
				value: 'Baby B',
			},
			{
				value: 'Baby C',
			},
		];
		var temp = [
			{
				path: 'Android',
				name: 'Android',
				checked: true,
			},
		];
		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<Icon
					name="md-arrow-back"
					size={Layout.moderateScale(20)}
					style={{ color: '#ffffff' }}
				/>
			</Button>
		);
		var rightComponent = (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<Ionicons
					name="md-checkmark"
					size={Layout.moderateScale(25)}
					style={{ color: '#ffffff' }}
				/>
			</Button>
		);
		var _this = this;
		return (
			<View style={styles.container}>
				<BBBHeader
					title="Create A New Item"
					leftComponent={leftComponent}
					rightComponent={rightComponent}
				/>
				<ScrollView
					style={styles.container}
					contentContainerStyle={styles.contentContainer}>
					<View style={styles.imagesMainView}>
						<ListView
							horizontal={true}
							contentContainerStyle={styles.listContents}
							dataSource={this.state.dataSource}
							renderRow={this._renderRow.bind(this)}
							enableEmptySections
							pageSize={parseInt(this.state.pageSize)}
						/>
					</View>
					<View style={styles.exchangeMode}>
						<Text style={styles.txtExch}>Exchange Mode</Text>
						<View style={styles.saleview}>
							<TouchableOpacity onPress={this.onPressHeadSale}>
								<View style={styles.saleHeader}>
									{this.state.isCollapsedSale ? (
										<Feather
											name="circle"
											style={{
												width: Layout.moderateScale(30),
												height: Layout.moderateScale(30),
												fontSize: Layout.moderateScale(30),
												color: '#c8c8c8',
											}}
										/>
									) : (
										<RedioSelected
											width={Layout.moderateScale(30)}
											height={Layout.moderateScale(30)}
										/>
									)}
									<Text style={styles.txtfacetoFace}>Sale</Text>
								</View>
							</TouchableOpacity>
							{this.state.isCollapsedSale ? null : (
								<View style={styles.bottomline} />
							)}
							<Collapsible collapsed={this.state.isCollapsedSale}>
								<View style={styles.saleChild}>
									<View style={styles.subFacetoFace}>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Currency</Text>
											<Dropdown
												data={dataCurrency}
												labelHeight={0}
												dropdownPosition={0}
												baseColor="rgba(0, 0, 0, .00)"
												containerStyle={styles.dateDropDown}
											/>
											{/* <Dropdown containerStyle={styles.dropcontainer}
                       data={data}
                    /> */}
										</View>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Additional Cost</Text>
											<Item style={styles.txtInput} regular>
												<Input />
											</Item>
										</View>
									</View>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => _this.onClick(temp)}
										isChecked={true}
										checkBoxColor={'#fff'}
										rightText={'Allow counter offer'}
										rightTextStyle={{
											color: 'black',
											fontSize: 20,
											marginLeft: 20,
											fontFamily: 'roboto-reguler',
										}}
										unCheckedImage={
											<Ionicons
												name="ios-square-outline"
												size={Layout.moderateScale(20)}
												color="black"
												style={styles.cancle}
											/>
										}
										checkedImage={
											<Ionicons
												name="ios-checkbox-outline"
												size={Layout.moderateScale(20)}
												color="black"
												style={styles.cancle}
											/>
										}
									/>
								</View>
							</Collapsible>
						</View>
						<View style={styles.saleview}>
							<TouchableOpacity onPress={this.onPressHeadBarter}>
								<View style={styles.saleHeader}>
									{this.state.isCollapsedBarter ? (
										<Feather
											name="circle"
											style={{
												width: Layout.moderateScale(30),
												height: Layout.moderateScale(30),
												fontSize: Layout.moderateScale(30),
												color: '#c8c8c8',
											}}
										/>
									) : (
										<RedioSelected
											width={Layout.moderateScale(30)}
											height={Layout.moderateScale(30)}
										/>
									)}
									<Text style={styles.txtfacetoFace}>Barter</Text>
								</View>
							</TouchableOpacity>
							{this.state.isCollapsedBarter ? null : (
								<View style={styles.bottomline} />
							)}
							<Collapsible collapsed={this.state.isCollapsedBarter}>
								<View style={styles.saleChild}>
									<View style={styles.subFacetoFace}>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Price</Text>
											<Item style={styles.txtInput} regular>
												<Input />
											</Item>
										</View>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Time</Text>
											<Dropdown
												data={dataTime}
												labelHeight={0}
												dropdownPosition={0}
												baseColor="rgba(0, 0, 0, .00)"
												containerStyle={styles.dateDropDown}
											/>
											{/* <Dropdown containerStyle={styles.dropcontainer}
                       data={data}
                    /> */}
										</View>
									</View>
								</View>
							</Collapsible>
						</View>
						<View style={styles.saleview}>
							<TouchableOpacity onPress={this.onPressHeadDonate}>
								<View style={styles.saleHeader}>
									{this.state.isCollapsedDonate ? (
										<Feather
											name="circle"
											style={{
												width: Layout.moderateScale(30),
												height: Layout.moderateScale(30),
												fontSize: Layout.moderateScale(30),
												color: '#c8c8c8',
											}}
										/>
									) : (
										<RedioSelected
											width={Layout.moderateScale(30)}
											height={Layout.moderateScale(30)}
										/>
									)}
									<Text style={styles.txtfacetoFace}>Donate</Text>
								</View>
							</TouchableOpacity>
							{this.state.isCollapsedDonate ? null : (
								<View style={styles.bottomline} />
							)}
							<Collapsible collapsed={this.state.isCollapsedDonate}>
								<View style={styles.saleChild}>
									<View style={styles.subFacetoFace}>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>
												71 Pilgrim Avenue Chevy Chase, MD 20815
											</Text>
										</View>
									</View>
								</View>
							</Collapsible>
						</View>
						<View style={styles.saleview}>
							<TouchableOpacity onPress={this.onPressHeadDnS}>
								<View style={styles.saleHeader}>
									{this.state.isCollapsedDnS ? (
										<Feather
											name="circle"
											style={{
												width: Layout.moderateScale(30),
												height: Layout.moderateScale(30),
												fontSize: Layout.moderateScale(30),
												color: '#c8c8c8',
											}}
										/>
									) : (
										<RedioSelected
											width={Layout.moderateScale(30)}
											height={Layout.moderateScale(30)}
										/>
									)}
									<Text style={styles.txtfacetoFace}>Sale & Barter</Text>
								</View>
							</TouchableOpacity>
							{this.state.isCollapsedDnS ? null : (
								<View style={styles.bottomline} />
							)}
							<Collapsible collapsed={this.state.isCollapsedDnS}>
								<View style={styles.saleChild}>
									<Text style={styles.txtsubtxt}>Sale</Text>
									<View style={styles.subFacetoFace}>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Currency</Text>
											<Dropdown
												data={dataCurrency}
												labelHeight={0}
												dropdownPosition={0}
												baseColor="rgba(0, 0, 0, .00)"
												containerStyle={styles.dateDropDown}
											/>
											{/* <Dropdown containerStyle={styles.dropcontainer}
                       data={data}
                    /> */}
										</View>
										<View style={styles.dataFacetoFace}>
											<Text style={styles.txtTitle}>Additional Cost</Text>
											<Item style={styles.txtInput} regular>
												<Input />
											</Item>
										</View>
									</View>
									<CheckBox
										style={styles.chboxRemember}
										onClick={() => _this.onClick(temp)}
										isChecked={true}
										checkBoxColor={'#fff'}
										rightText={'Allow counter offer'}
										rightTextStyle={{
											color: 'black',
											fontSize: 20,
											marginLeft: 20,
										}}
										unCheckedImage={
											<Ionicons
												name="ios-square-outline"
												size={Layout.moderateScale(20)}
												color="black"
												style={styles.cancle}
											/>
										}
										checkedImage={
											<Ionicons
												name="ios-checkbox-outline"
												size={Layout.moderateScale(20)}
												color="black"
												style={styles.cancle}
											/>
										}
									/>
								</View>
								<View style={styles.bottomlineShort} />
								<Text style={styles.txtsubtxt}>Barter</Text>
								<View style={styles.subFacetoFace}>
									<View style={styles.dataFacetoFace}>
										<Text style={styles.txtTitle}>Price</Text>
										<Item style={styles.txtInput} regular>
											<Input />
										</Item>
									</View>
									<View style={styles.dataFacetoFace}>
										<Text style={styles.txtTitle}>Time</Text>
										<Dropdown
											data={dataTime}
											labelHeight={0}
											dropdownPosition={0}
											baseColor="rgba(0, 0, 0, .00)"
											containerStyle={styles.dateDropDown}
										/>
										{/* <Dropdown containerStyle={styles.dropcontainer}
                       data={data}
                    /> */}
									</View>
								</View>
							</Collapsible>
						</View>
					</View>
					<View style={styles.deliveryOption}>
						<Text style={styles.txtDelOpt}>Delivery Options</Text>
						<View style={styles.faceToFace}>
							<Text style={styles.txtfacetoFace}>Face to Face</Text>
							<View style={styles.bottomline} />
							<View style={styles.subFacetoFace}>
								<View style={styles.dataFacetoFace}>
									<Text style={styles.txtTitle}>Block</Text>
									<Item style={styles.txtInput} regular>
										<Input />
									</Item>
									<Text style={styles.txtTitle}>Street</Text>
									<Item style={styles.txtInput} regular>
										<Input />
									</Item>
									<Text style={styles.txtTitle}>Pincode</Text>
									<Item style={styles.txtInput} regular>
										<Input />
									</Item>
								</View>
								<View style={styles.mapFacetoFace}>
									<MapView
										style={{ flex: 1 }}
										initialRegion={{
											latitude: 37.78825,
											longitude: -122.4324,
											latitudeDelta: 0.0922,
											longitudeDelta: 0.0421,
										}}
									/>
								</View>
							</View>
						</View>
						<View style={styles.regPost}>
							<Text style={styles.txtfacetoFace}>Registered Post</Text>
							<View style={styles.bottomline} />
							<View style={styles.subFacetoFace}>
								<View style={styles.dataFacetoFace}>
									<Text style={styles.txtTitle}>Currency</Text>
									<Dropdown
										data={dataCurrency}
										labelHeight={0}
										dropdownPosition={0}
										baseColor="rgba(0, 0, 0, .00)"
										containerStyle={styles.dateDropDown}
									/>
									{/* <Dropdown containerStyle={styles.dropcontainer}
                       data={data}
                    /> */}
								</View>
								<View style={styles.dataFacetoFace}>
									<Text style={styles.txtTitle}>Additional Cost</Text>
									<Item style={styles.txtInput} regular>
										<Input />
									</Item>
								</View>
							</View>
						</View>
						<View style={styles.addmore}>
							<View style={styles.subAddmore}>
								<Add
									width={Layout.HEIGHT * 0.05}
									height={Layout.HEIGHT * 0.05}
								/>
								<Text style={styles.txtTitleAdd}>Add More</Text>
							</View>
						</View>
					</View>
					<View style={styles.Descrip}>
						<Text style={styles.txtTitle}>Short Description</Text>
						<Item style={styles.txtInput} regular>
							<Input />
							<Text style={styles.txtcount}>0/64</Text>
						</Item>
						<Text style={styles.txtTitle}>Long Description</Text>
						<Item style={styles.txtInput} regular>
							<Input
								multiline={true}
								style={{
									height: Layout.HEIGHT * 0.1,
									marginBottom: Layout.HEIGHT * 0.015,
								}}
							/>
							<Text style={styles.txtcount}>0/1024</Text>
						</Item>
					</View>
					<View style={styles.categoty}>
						<View style={styles.dataFacetoFace}>
							<Text style={styles.txtTitle}>Category</Text>
							<View>
								<Dropdown
									data={dataCate}
									labelHeight={0}
									dropdownPosition={0}
									baseColor="rgba(0, 0, 0, .00)"
									containerStyle={styles.dateDropDown}
								/>
								{/* <Dropdown containerStyle={styles.dropcontainer}
                   data={data}
                /> */}
							</View>
							<Text style={styles.txtTitles}>Templates</Text>
							<View style={styles.templateSec}>
								<Item style={styles.txtInputsmall} regular>
									<Input
										onChangeText={text => {
											this.setState({ text });
										}}
									/>
								</Item>
								<TouchableOpacity
									style={styles.addButton}
									onPress={this.onPressAdd}>
									<View style={styles.addButton}>
										<Add
											width={Layout.WIDTH * 0.08}
											height={Layout.WIDTH * 0.08}
										/>
									</View>
								</TouchableOpacity>
							</View>
							<View>
								<ListView
									horizontal={true}
									contentContainerStyle={styles.listContent}
									dataSource={this.state.dataSourceCates}
									renderRow={this._renderRowCategory.bind(this)}
									enableEmptySections
									pageSize={parseInt(this.state.pageSize)}
								/>
							</View>
							<Text style={styles.txtTitles}>Tags</Text>
							<View style={styles.templateSec}>
								<Item style={styles.txtInputsmall} regular>
									<Input
										onChangeText={text => {
											this.setState({ textd: text });
										}}
									/>
								</Item>
								<TouchableOpacity
									style={styles.addButton}
									onPress={this.onPressAddTag}>
									<View style={styles.addButton}>
										<Add
											width={Layout.WIDTH * 0.08}
											height={Layout.WIDTH * 0.08}
										/>
									</View>
								</TouchableOpacity>
							</View>
							<View>
								<ListView
									horizontal={true}
									contentContainerStyle={styles.listContent}
									dataSource={this.state.dataSourceTags}
									renderRow={this._renderRowTags.bind(this)}
									enableEmptySections
									pageSize={parseInt(this.state.pageSize)}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		);
	}
}
