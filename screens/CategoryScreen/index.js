import React from 'react';
import { FlatList, Image, View,SectionList,StyleSheet } from 'react-native';
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
import getNestedCategoryList from './NestedCategoryApi';
import { ProgressDialog,Dialog } from 'react-native-simple-dialogs';
// screen style
import styles from './styles';
import { Layout, Colors } from '../../constants/';

export default class CategoryScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		  progressVisible:false,
			allCategoryList:[],
		};
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
		getNestedCategoryList().then((res)=>{

				const data =[];// this.state.allCategoryList.concat(res.data.allCategoriesNested);
				console.log("Len: "+data);

				Object.keys(res.data.allCategoriesNested).forEach((key,index)=>{
						data.push({name:res.data.allCategoriesNested[key].name,data:res.data.allCategoriesNested[key].children})

				});
			//	console.log("Len: "+data);
				this.setState({
					allCategoryList:data,
					progressVisible: false,
				});
			//	console.log(this.state.allCategoryList);
				console.log("Length: "+this.state.allCategoryList.length);
		})
		.catch(error => {
			console.log("Error:" + error.message);
			this.setState({
				progressVisible: false,

			});
		});

	}

	_renderItem = ({ item }) => (
		<List style={styles.mainlist}>
			<ListItem avatar onPress={() => alert(item.id+","+item.name)}>
						<Body style={styles.bodys}>
					<Text style={styles.bodyTitle}>{item.name}</Text>
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
			{this.state.allCategoryList.length == 0 && this.state.allCategoryList == 'undefiend' ?
					(<Text style={styles.noDataText}>
						No Data Found
					</Text>)
					:
					(<SectionList
						sections={this.state.allCategoryList}
						renderSectionHeader={ ({section}) => <Text style={styles.SectionHeaderStyle}> { section.name } </Text> }
						/*renderItem={ ({item}) => <Text style={styles.SectionListItemStyle} > { item.name } </Text> }*/
						renderItem={this._renderItem}
						keyExtractor={ (item, index) => index }
						/>
)
					}
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
