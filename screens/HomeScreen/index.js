import React from 'react';
import { Image, TouchableOpacity, View, ListView } from 'react-native';
import {
	Container,
	Content,
	List,
	ListItem,
	Text,
	Button,
	Icon,
	Item,
	Input,
	Fab,
} from 'native-base';

//custom components
import BBBHeader from '../../components/BBBHeader';
import Baby from '../../components/Baby';
import BBBIcon from '../../components/BBBIcon';

// style
import styles from './styles';
import { Layout, Colors, Images } from '../../constants/';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		const rowHasChanged = (r1, r2) => r1 !== r2;
		const dataObjects = [
			{ id: 'aimg0001', source: Images.trollie, flag: false },
			{ id: 'aimg0001', source: Images.trollie, flag: false },
		];
		// DataSource configured
		const ds = new ListView.DataSource({ rowHasChanged });

		this.state = {
			dataSource: ds.cloneWithRows(dataObjects),
			active: false,
		};
	}

	_handleMenu(menuitem) {
		this.props.navigation.navigate(menuitem);
	}

	_renderRow(rowData) {
		return (
			<View style={styles.imagesSubView}>
				<View>
					<Image source={Images.trollie} style={styles.rowImage} />
					<View style={styles.favoriteIconSec}>
						<BBBIcon
							name="Favorite"
							size={Layout.moderateScale(18)}
							color="#ffffff"
						/>
					</View>
					<View style={styles.chatIconSec}>
						<BBBIcon
							name="Chat"
							size={Layout.moderateScale(18)}
							color="#ffffff"
						/>
					</View>
				</View>

				<Item style={styles.userItemDetailsSec}>
					<View style={styles.userProfileSec}>
						<Image source={Images.tempUser} style={styles.userProfile} />
						<View style={styles.userOnlineOffline} />
					</View>
					<View style={styles.userNameSec}>
						<Text style={styles.userName}>Best Buys</Text>
					</View>
					<View style={styles.activeuserSec}>
						{/* <Image source={Images.trollie} style={styles.activeuser}/> */}
						<BBBIcon
							name="ActivePost"
							size={Layout.moderateScale(12)}
							style={{ color: '#3eb722' }}
						/>
						<BBBIcon
							name="ActivePost"
							size={Layout.moderateScale(12)}
							style={{ color: '#3eb722' }}
						/>
						<BBBIcon
							name="ActivePost"
							size={Layout.moderateScale(12)}
							style={{ color: '#3eb722' }}
						/>
						<BBBIcon
							name="ActivePost"
							size={Layout.moderateScale(12)}
							style={{ color: '#3eb722' }}
						/>
						<BBBIcon
							name="ActivePost"
							size={Layout.moderateScale(12)}
							style={{ color: '#3eb722' }}
						/>
					</View>
				</Item>

				<View>
					<Text style={styles.postDesc}>
						Pre-loved stroller. Used twice and kept in stoage.
					</Text>
				</View>

				<View style={styles.productreviewSec}>
					<View style={styles.ratingSec}>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={{ color: '#feb532', marginTop: Layout.moderateScale(2) }}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={{ color: '#feb532', marginTop: Layout.moderateScale(2) }}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={{ color: '#feb532', marginTop: Layout.moderateScale(2) }}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={{ color: '#feb532', marginTop: Layout.moderateScale(2) }}
						/>
						<BBBIcon
							name="Star"
							size={Layout.moderateScale(14)}
							style={{ color: '#feb532', marginTop: Layout.moderateScale(2) }}
						/>
						{/* <Image source={Images.trollie} style={styles.ratingstyle}/> */}
						<Text style={styles.ratingmsgct}> (52) </Text>
					</View>
					<View style={styles.priceSec}>
						<Text style={styles.pricetext}>$250</Text>
					</View>
				</View>
			</View>
		);
	}

	render() {
		var leftComponent = (
			<Button transparent onPress={() => this._handleMenu('DrawerOpen')}>
				<BBBIcon
					name="Menu"
					size={Layout.moderateScale(18)}
					color="#fff"
					style={{ color: '#ffffff' }}
				/>
			</Button>
		);

		var rightComponent = (
			<Button transparent onPress={() => this._handleMenu('categoryScreen')}>
				<BBBIcon
					name="CategoryIcon"
					size={Layout.moderateScale(18)}
					style={{ color: '#ffffff' }}
				/>
			</Button>
		);
		return (
			<Container>
				<BBBHeader
					title="Bebe Bargains"
					leftComponent={leftComponent}
					rightComponent={rightComponent}
				/>
				<Content style={styles.container}>
					<View>
						<View style={styles.searchSec}>
							<Item regular style={styles.searchItem}>
								<Input
									placeholder="What are you looking for?"
									style={styles.mainSearch}
									keyboardType="default"
									returnKeyType="search"
									onSubmitEditing={() =>
										this.props.navigation.navigate('searchResultScreen')
									}
								/>
								<BBBIcon name="Search" style={styles.searchicon} />
							</Item>
						</View>

						<View style={styles.imagesMainView}>
							<View style={styles.populerSec}>
								<Text style={styles.populerText}>Most Populer Items</Text>
							</View>
							<ListView
								horizontal={true}
								contentContainerStyle={styles.listContent}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow}
								enableEmptySections
							/>
						</View>

						<View style={styles.adSec}>
							<Text style={styles.mainadText}>
								Do you have something to sell or give away?
							</Text>
							<Text style={styles.subtitle}>
								Post it with us and we'll give you an audience.
							</Text>
						</View>

						<View style={styles.imagesMainView}>
							<View style={styles.populerSec}>
								<Text style={styles.populerText}>
									Your Recently Visited Items
								</Text>
							</View>
							<ListView
								horizontal={true}
								contentContainerStyle={styles.listContent}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow}
								enableEmptySections
							/>
						</View>
					</View>
				</Content>
				<Fab
					active={this.state.active}
					direction="up"
					containerStyle={{}}
					style={{ backgroundColor: '#1fa6a4' }}
					position="bottomRight"
					onPress={() => this.props.navigation.navigate('CreateNewItemScreen')}>
					<Icon name="ios-add" />
					<Button disabled style={{ backgroundColor: '#DD5144' }}>
						<Icon name="share" />
					</Button>
				</Fab>
			</Container>
		);
	}
}
