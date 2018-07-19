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

// custom components
import Baby from '../../components/Baby';
import BBBHeader from '../../components/BBBHeader';
import BBBIcon from '../../components/BBBIcon';
import getCategoryList from './AllCategoryApi';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';
// screen style
import styles from './styles';
import { Layout, Colors } from '../../constants/';
var allCategoryList = [];
var allCategoryValueList = [];
export default class CategoryScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  progressVisible:false,
			allCategoryList:[],
			allCategoryValueList:[],
		}
	}

	_renderItem = ({ item }) => (
		<List style={styles.mainlist}>
			<ListItem avatar onPress={() => alert(item.id+","+item.label)}>
				<Left style={styles.body}>
					<View style={styles.bebyview}>
						<Baby height={Layout.HEIGHT * 0.05} width={Layout.HEIGHT * 0.05} />
					</View>
				</Left>
				<Body style={styles.bodys}>
					<Text style={styles.bodyTitle}>{item.label}</Text>
				</Body>
				<Right style={styles.body}>
					<BBBIcon
						name="RightArrow"
						style={styles.nextarrow}
						size={Layout.moderateScale(14)}
					/>
				</Right>
			</ListItem>
		</List>
	);

	componentDidMount(){
		this.setState({
			progressVisible: true,

		});
		getCategoryList().then((res)=>{
				Object.keys(res.data.allCategoriesFlat).forEach((key,index)=>{
							allCategoryList.push(res.data.allCategoriesFlat[key]);
							allCategoryValueList.push({label:res.data.allCategoriesFlat[key].name,key:res.data.allCategoriesFlat[key].id});
				});
				console.log("Array:" , allCategoryList);
				this.setState({
					allCategoryList:allCategoryList,
					allCategoryValueList:allCategoryValueList,
					progressVisible: false,
				})

		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,

			});
		});

	}


	render() {

		var leftComponent = (
			<Button transparent onPress={() => this.props.navigation.navigate('homeScreen')}>
				<BBBIcon
					name="BackArrow"
					size={Layout.moderateScale(18)}
					style={styles.backarrow}
				/>
			</Button>
		);

		return (
			<Container style={styles.container}>
				<BBBHeader
					title="Categories"
					leftComponent={leftComponent}
					enableSearch
				/>
				<Content>
					<FlatList
						data={this.state.allCategoryValueList}
						keyExtractor={listItemData => listItemData.id}
						renderItem={this._renderItem}
					/>
				</Content>
				<ProgressDialog
						visible={this.state.progressVisible}
						 message="Please Wait..."
						activityIndicatorSize="large"
						activityIndicatorColor="blue"
											 />
			</Container>
		);
	}
}
