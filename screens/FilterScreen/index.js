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
import { NavigationActions } from 'react-navigation';
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

import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from 'react-native-modal-datetime-picker';
// screen style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';
import FilterConstants from './FilterConstants'
import getTemplateList from './SearchTemplateApi';
import ListCategory from './ListCategory';
var selectedCateId=null;
export default class FilterScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			segment: 1,
			truefalse: false,
			typography: 'Please select',
			SliderValue: 0,
			mode:null,
			modeItemList:FilterConstants.modeItems,
			ratingItemList:FilterConstants.ratingItems,
			idVerificationList:FilterConstants.idVerifications,
			daysList:FilterConstants.filterDays,
			rating:null,
			idVerification:null,
      allCategoryValueList:[],
      searchTemplateValueList:[],
			tagValueList:[],
			progressVisible:false,
			selectedCateId:null,
			templateId:null,
			tagId:null,
			isCounterOffer:false,
			minMaxPrice: [0, 25000],
			isDateTimePickerVisible: false,
			dateTime:null,
			selectedDate:null,
		};
	}

	minMaxPriceValuesChange = (values) => {
		console.log(values);
	    this.setState({
	      minMaxPrice: values,
	    });
	  }

		_showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

		_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.getTime()/1000);
		this.setState({
			 isDateTimePickerVisible: false,
			 dateTime:date.getTime()/1000,
			 selectedDate:""+date,
	 	})
    this._hideDateTimePicker();
  };

	_getTemplates(){
		console.log("selected categoryId",selectedCateId);
    var variables={
      "terms":[""],"limit":20,"page":1,"categoryId":[selectedCateId]
    }
    getTemplateList(variables).then((res)=>{

      var tmpList=[];
      Object.keys(res.data.searchTemplates).forEach((key,index)=>{
          tmpList.push({title:res.data.searchTemplates[key].title,id:res.data.searchTemplates[key].id,checked:false,tagList:res.data.searchTemplates[key].tags});
      });
        console.log("Array New :" , tmpList.length);
      this.setState({
        searchTemplateValueList:tmpList,
      })

    })
    .catch(error => {
      console.log("Error:" + error.message);

    });
  }

	onClick(data) {
		data.checked = !data.checked;
		// let msg = data.checked ? 'you checked ' : 'you unchecked ';
	}

	onClickMode(data) {
		var tmpList=this.state.modeItemList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
		this.setState({
			mode:data.title.toUpperCase(),
			modeItemList:tmpList,
		});
	}

	onClickTemplate(data) {
		var tmpList=this.state.searchTemplateValueList;
		var tmpTagList;
		for(var i=0;i<tmpList.length;i++) {
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id) {
				tmpList[i].checked=true;
				tmpTagList=tmpList[i].tagList;
			}
		}

		this.setState({
			templateId:data.id,
			searchTemplateValueList:tmpList,
			tagValueList:tmpTagList,
		});
	}
	onClickTag(data) {
		var tmpList=this.state.tagValueList;
		for(var i=0;i<tmpList.length;i++) {
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id) {
				tmpList[i].checked=true;
			}
		}

		this.setState({
			tagId:data.id,
			tagValueList:tmpList,
		});
	}

	onClickCate(data) {
		selectedCateId=data.id;
    this._getTemplates();
    this.setState({
      selectedCateId:data.id,
    });
	}


	onClickRating(data) {
		var tmpList=this.state.ratingItemList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
		this.setState({
			rating:data.ratingvalue,
			ratingItemList:tmpList,
		});
	}

	onClickOffers(){
		this.setState({
			isCounterOffer:!this.state.isCounterOffer
		})
	}
	onClickIdentify(data) {
		var tmpList=this.state.idVerificationList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
		this.setState({
			idVerification:data.ratingvalue,
			idVerificationList:tmpList,
		});
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

			return (
				<View key={'Mode_list'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Mode</Text>
					</View>
					<View>
						{this.state.modeItemList.map((item, index) => {
							return (
								<View style={styles.offersListItem} key={'mode_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										isChecked={item.checked}
										onClick={() => this.onClickMode(item)}
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

			return (
				<View key={'dateandtime'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Date & Time</Text>
					</View>
					<View style={styles.dateTimeSec}>

					<View style={{ flex: 1 }}>
			 			<TouchableOpacity onPress={this._showDateTimePicker}>
				 			<Text>Select Date & Time</Text>
							{this.state.dateTime!=null ? <Text>{this.state.selectedDate}</Text> :
										null
							}
			 			</TouchableOpacity>
			 			<DateTimePicker
				 			isVisible={this.state.isDateTimePickerVisible}
				 			onConfirm={this._handleDatePicked}
				 			onCancel={this._hideDateTimePicker}
							mode={'datetime'}
			 			/>
		 			</View>

					</View>
				</View>
			);
		} else if (segment === 3) {

			return (
				<View key={'ratings'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Ratings</Text>
					</View>
					<View>
						{this.state.ratingItemList.map((item, index) => {
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
											isChecked={item.checked}
											onClick={() => this.onClickRating(item)}
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

			return (
				<View key={'identify'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Identify Verification</Text>
					</View>
					<View>
						{this.state.idVerificationList.map((item, index) => {
							return (
								<View style={styles.offersListItem} key={'identify_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										isChecked={item.checked}
										onClick={() => this.onClickIdentify(item)}
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
					<View style={styles.minMaxPrice}>
							<Text style={{ flex: 1 }}>Price:</Text>
				<MultiSlider
				 values={[this.state.minMaxPrice[0], this.state.minMaxPrice[1]]}
				 onValuesChange={this.minMaxPriceValuesChange}
				 min={0}
				 max={25000}
				 step={500}
				 allowOverlap
				 snapped
			 />

			 <View style={{
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
    }}>

						<Text style={{ flex: 1 }}>Min: {this.state.minMaxPrice[0]}</Text>
						<Text style={{ flex: 0 }}>Max: {this.state.minMaxPrice[1]}</Text>
				</View>

			 </View>

				</View>
			);
		} else if (segment === 6) {

			return (
				<View key={'categories'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Categories</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						  <ListCategory selectedCateId={this.state.selectedCateId} onClickCategory={(item) => this.onClickCate(item)} />
					</View>
				</View>
			);
		} else if (segment === 7) {
			return (

				<View key={'templates_list'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Templates</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						{this.state.searchTemplateValueList.map((item, index) => {
							return (
								<View style={styles.offersListItem} key={'template_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										isChecked={item.checked}
										onClick={() => this.onClickTemplate(item)}
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

			return (
				<View key={'tags_list'}>
					<View style={[styles.fltrTitleText, styles.fltrbtwn]}>
						<Text style={styles.filterDetailsTitle}>Tags</Text>
						<BBBIcon name="Search" style={styles.filterDetailsTitle} />
					</View>
					<View>
						{this.state.tagValueList.map((item, index) => {
							return (
								<View style={styles.offersListItem} key={'tags_' + index}>
									<CheckBox
										style={styles.chboxRemember}
										isChecked={item.id===this.state.tagId?true:false}
										onClick={() => this.onClickTag(item)}
										checkBoxColor={'#fff'}
										rightText={item.name}
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

			return (
				<View key={'offers'}>
					<View style={styles.fltrTitleText}>
						<Text style={styles.filterDetailsTitle}>Counter Offers</Text>
					</View>
					<View style={styles.offersListItem}>
						<CheckBox
							style={styles.chboxRemember}
							isChecked={this.state.isCounterOffer}
							onClick={() => this.onClickOffers()}
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
				<TouchableOpacity onPress={() => this.resetAllValues()}>
					<Text style={styles.headerText}>RESET</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{ marginLeft: Layout.moderateScale(8) }}
					onPress={() => this.returnToSearchList()}>
					<Text style={styles.headerText}>APPLY</Text>
				</TouchableOpacity>
			</View>
		);



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
							{FilterConstants.filterItem.map((item, index) => {
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

	returnToSearchList(){
		this.props.navigation.navigate({
		    routeName: 'searchResultScreen',
		    params: {
          previous_screen: 'filterScreen'
        , mode:this.state.mode
        , rating:this.state.rating
        , idVerify:this.state.idVerification
        , categoryId:this.state.selectedCateId
				, templateId:this.state.templateId
        , tagId:this.state.tagId
        , counterOffer:this.state.isCounterOffer
        , minPrice:this.state.minMaxPrice[0]
        , maxPrice:this.state.minMaxPrice[1]
        }
		});
	}

	resetAllValues(){

		this.setState({
			mode:null,
			rating:null,
			idVerification:null,
			templateId:null,
			tagId:null,
			categoryId:null,
			isCounterOffer:false,
			minMaxPrice:[0,25000],
		});
		this.resetAllListValues();

	}

	resetAllListValues(){
		var modeTmpList=this.state.modeItemList;
		for(var i=0;i<modeTmpList.length;i++){
			modeTmpList[i].checked=false;
		}

		var ratingTmpList=this.state.ratingItemList;
		for(var i=0;i<ratingTmpList.length;i++){
			ratingTmpList[i].checked=false;
		}

		var idTmpList=this.state.idVerificationList;
		for(var i=0;i<idTmpList.length;i++){
			idTmpList[i].checked=false;
		}


		// var templateTmpList=this.state.searchTemplateValueList;
		// for(var i=0;i<templateTmpList.length;i++){
		// 	templateTmpList[i].checked=false;
		// }
		//
		// var tagTmpList=this.state.tagList;
		//
		// for(var i=0;i<tagTmpList.length;i++){
		// 	tagTmpList[i].checked=false;
		// }


		this.setState({
			modeItemList:modeTmpList,
			ratingItemList:ratingTmpList,
			idVerificationList:idTmpList,
			searchTemplateValueList:[],
			tagList:[],
		});

	}


}
