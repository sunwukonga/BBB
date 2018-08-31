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

var internalUpdate = false

export default class FilterScreen extends React.Component {
	constructor(props) {
		super(props);
    this.onClickCategory = this.onClickCategory.bind(this)
    // TODO: remove state and work directly from the props
		this.state = {
			segment: 1,
			truefalse: false,
			typography: 'Please select',
			SliderValue: 0,

      filter: this.props.navigation.state.params.filter,

			modeItemList: FilterConstants.modeItems.map( modeItem => {
        if (modeItem.title.toUpperCase() === this.props.navigation.state.params.filter.mode) {
          modeItem.checked = true
        }
        return modeItem
      }),
			ratingItemList:FilterConstants.ratingItems,
			idVerificationList:FilterConstants.idVerifications,
			daysList:FilterConstants.filterDays,
      allCategoryValueList:[],
      searchTemplateValueList:[],
			tagValueList:[],
			progressVisible:false,
			isDateTimePickerVisible: false,
			dateTime:null,
			selectedDate:null,
		};
	}

  componentDidUpdate(prevProps) {
    const { filter } = this.props.navigation.state.params
    const { filter: _filter } = prevProps.navigation.state.params
    if ( !internalUpdate ) {
      if ( JSON.stringify( filter ) !== JSON.stringify( _filter ) ) {
        this.setState({
          filter: this.props.navigation.state.params.filter
        })
      }
    } else {
      internalUpdate = false
    }
  }

  minMaxPriceValuesChange = (values) => {
    internalUpdate = true
    this.setState({
      filter: Object.assign( this.state.filter, { minPrice: values[0], maxPrice: values[1] })
    })
  }

  _showDateTimePicker = () => {
    internalUpdate = true
    this.setState({ isDateTimePickerVisible: true })
  }
  _hideDateTimePicker = () => {
    internalUpdate = true
    this.setState({ isDateTimePickerVisible: false })
  }
  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date.getTime()/1000);
    internalUpdate = true
		this.setState({
			isDateTimePickerVisible: false,
      filter: Object.assign( this.state.filter, { seconds: date.getTime()/1000 }),
			selectedDate:""+date,
      isDateTimePickerVisible: false,
	 	})
  };

	_getTemplates() {
    var variables={
      "terms":[""],"limit":20,"page":1,"categoryId": this.state.filter.categories[0]
    }
    getTemplateList(variables).then((res)=>{

      var tmpList=[];
      Object.keys(res.data.searchTemplates).forEach((key,index)=>{
          tmpList.push({title:res.data.searchTemplates[key].title,id:res.data.searchTemplates[key].id,checked:false,tagList:res.data.searchTemplates[key].tags});
      });
        console.log("Array New :" , tmpList.length);
      internalUpdate = true
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

  setMode( mode ) {
    internalUpdate = true
    this.setState({
      modeItemList: this.state.modeItemList.map( modeItem => {
        if (modeItem.title.toUpperCase() === mode) {
          modeItem.checked = true
        }
        return modeItem
      })
    })
  }

	onClickMode(data) {
		var tmpList=this.state.modeItemList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { mode: data.title.toUpperCase() }),
			modeItemList:tmpList,
		});
	}

	onClickTemplate(data) {
    //TODO: This is wrong. Should be able to select multiple templates
		var tmpList=this.state.searchTemplateValueList;
		var tmpTagList;
		for(var i=0;i<tmpList.length;i++) {
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id) {
				tmpList[i].checked=true;
				tmpTagList=tmpList[i].tagList;
			}
		}

    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { templates: this.state.filter.templates.concat( [ data.id ] ) }),
			templateId:data.id,
			searchTemplateValueList:tmpList,
			tagValueList:tmpTagList,
		});
	}

	onClickTag(data) {
    //TODO: This is wrong, should be able to select multiple tags
		var tmpList=this.state.tagValueList;
		for(var i=0;i<tmpList.length;i++) {
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id) {
				tmpList[i].checked=true;
			}
		}

    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { tags: this.state.filter.tags.concat( [ data.id ] ) }),
			tagValueList:tmpList,
		});
	}

	onClickCategory({id, selected}) {
    if (!selected) {
      console.log("Undo click")
      internalUpdate = true
      this.setState({
        filter: Object.assign( this.state.filter, { categories: this.state.filter.categories.filter( categoryId => categoryId != id)})
      })
    } else {
      console.log("Do click: ", this.state.filter.categories)
      this.state.filter.categories.push( id )
      internalUpdate = true
      this.setState({
        filter: Object.assign( this.state.filter, { categories: this.state.filter.categories})
      })
    }
    this._getTemplates();
	}


	onClickRating(data) {
    //TODO: this is wrong, needs to be a bitwise addition of ratings
		var tmpList=this.state.ratingItemList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { rating: data.ratingvalue }),
			ratingItemList:tmpList,
		});
	}

	onClickOffers(){
    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { counterOffer: !this.state.counterOffer }),
		})
	}
	onClickIdentify(data) {
    //TODO: this is wrong, needs to be a bitwise addition of verifications
		var tmpList=this.state.idVerificationList;
		for(var i=0;i<tmpList.length;i++){
			tmpList[i].checked=false;
			if(data.id==tmpList[i].id){
				tmpList[i].checked=true;
			}
		}
    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter, { idVerification: data.id }),
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
    console.log("Filter_: ", this.state.filter.categories)
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
						<Text style={styles.filterDetailsTitle}>Listing newer than</Text>
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
						<Text style={styles.filterDetailsTitle}>Listing Author Ratings</Text>
						<Text>This feature is experimental. It may not work as expected.</Text>
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
						<Text style={styles.filterDetailsTitle}>Listing Author Identify Verification</Text>
						<Text>This feature is experimental. It may not work as expected.</Text>
					</View>
					<View>
						{this.state.idVerificationList.map((item, index) => {
							return (
								<View style={styles.offersListItem} key={'identify_' + index}>
                  <View style={styles.row}>
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
                    <View style={styles.bulletText}>
                      <Text style={styles.identityDescText}>{item.description}</Text>
                    </View>
                  </View>
								</View>
							);
						})}
					</View>
				</View>
			);
		} else if (segment === 5) {
			return (
				<View key={'price'}>
					<View style={styles.minMaxPrice}>
							<Text style={{ flex: 1 }}>Price Range</Text>
				<MultiSlider
           values={[this.state.filter.minPrice, this.state.filter.maxPrice]}
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

						<Text style={{ flex: 1 }}>Min: {this.state.filter.minPrice}</Text>
						<Text style={{ flex: 0 }}>Max: {this.state.filter.maxPrice}</Text>
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
            <ListCategory categoryIds={this.state.filter.categories} onClickCategory={(item) => this.onClickCategory(item)} />
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
										isChecked={this.state.filter.tags.includes( item.id )}
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
							isChecked={this.state.filter.counterOffer}
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
            key={i.toString()}
						name="Star"
						color="#feb532"
						size={Layout.moderateScale(16)}
					/>
				);
			} else {
				tempItem.push(
					<BBBIcon
            key={i.toString()}
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
										onPress={() => {
                      internalUpdate = true
                      this.setState({ segment: item.id })
                    }}
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
                    { item.type !== 'ion' ?
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
                    :
                    <Ionicons
											name={item.name}
                      size={Layout.moderateScale(18)}
                      color={
                        this.state.segment == item.id
                        ? Colors.secondaryColor
                        : Colors.white
                      }
                      style={{alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}
                    />
                    }
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
    console.log("Filter_: ", this.state.filter.categories)
		this.props.navigation.navigate({
		    routeName: 'searchResultScreen',
		    params: {
          previous_screen: 'filterScreen'
        , filter: this.state.filter
        }
		});
	}

	resetAllValues(){
    internalUpdate = true
		this.setState({
      filter: Object.assign( this.state.filter,
        { mode: "SALE"
        , seconds: null
        , rating: null
        , verification: null
        , distance: null
        , priceMax: null
        , priceMin: null
        , categories: []
        , templates: []
        , tags: []
        , counterOffer: null
        }
      )
    })
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

    internalUpdate = true
		this.setState({
			modeItemList:modeTmpList,
			ratingItemList:ratingTmpList,
			idVerificationList:idTmpList,
			searchTemplateValueList:[],
			tagList:[],
		});

	}


}
