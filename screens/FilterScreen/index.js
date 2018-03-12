import React from 'react'
import { FlatList, Image, TouchableOpacity, View } from 'react-native'
import { Container, Content, List, ListItem, Body, Left, Right, Text, Button, Icon, Segment } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

// custom components
import Baby from '../../components/Baby'
import BBBHeader from '../../components/BBBHeader'
import BBBIcon from '../../components/BBBIcon'

// screen style
import styles from './styles'
import { Layout, Colors } from '../../constants/'

export default class FilterScreen extends React.Component {

  constructor(props) {
		super(props);
		this.state = {
			segment: 1,
		};
	}

  _renderActiveComponent = () => {

		const { segment } = this.state;

		var items = [
		    {
					id: 1,
	        title:'Adam Carlson',
					userType: 'Electrical Mechanic',
					userId: '#298640',
					userText: 'Optus Brisbane',
					timesheetList: [
							{
								id: 'T1001',
								day: 'Monday',
								date: 'May 25th',
								startTime: '09:30',
								finishTime: '18:00',
								totalTime: '08:00',
							},
							{
								id: 'T1002',
								day: 'Monday1',
								date: 'May 25th',
								startTime: '09:30',
								finishTime: '18:00',
								totalTime: '08:00',
							},
					],
					totalHours: '40:30',
		    },
		];

		// Awaiting Approval Timesheets
		if(segment === 1) {
			return items.map((item,value)=> {
				 return (
					 <View style={styles.timesheetList} key={"main"+item.id}>
						 <View style={styles.timesheetAwaitingTopBorder}></View>
						 <View style={styles.tsToggle}>
							 <Text>Pragnesh Patel</Text>
						 </View>
					 </View>
				 )
			 });
		}

		// Approved Timesheet Cards
		if(segment === 2) {
			return items.map((item,value)=>{
				return (
					<View style={styles.timesheetApprovedList} key={"main"+item.id}>
						<View style={styles.timesheetApprovedTopBorder}></View>
						<View style={styles.tsToggle}>
							<Text>Pragnesh_PJ</Text>
						</View>
					</View>
				)
			});
		}

    if(segment === 3) {
			return items.map((item,value)=>{
				return (
					<View style={styles.timesheetApprovedList} key={"main"+item.id}>
						<View style={styles.timesheetApprovedTopBorder}></View>
						<View style={styles.tsToggle}>
							<Text>Text details</Text>
						</View>
					</View>
				)
			});
		}


	}

  render() {
    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
								          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
												</Button>

    return (
      <Container style={styles.container}>
        <BBBHeader title="Filter" leftComponent={ leftComponent } />

          <View style={{flexDirection: 'row', width: Layout.WIDTH, height: Layout.HEIGHT}}>
            <View style={{width: Layout.WIDTH * 0.30, height: Layout.HEIGHT, backgroundColor: 'red'}}>
              <Content>
              <Segment style={{flexDirection: 'column'}}>

		              <TouchableOpacity
                    style={{borderTopLeftRadius: 4, borderBottomLeftRadius: 4,}}
										active={(this.state.segment === 1) ? true : false}
										onPress={() => this.setState({segment: 1})}
									>
										<Text style={this.state.segment === 1 ? styles.activeTab : styles.normalTab}>
											aa
										</Text>
									</TouchableOpacity>

                  <TouchableOpacity
										style={{borderTopLeftRadius: 4, borderBottomLeftRadius: 4,}}
										active={(this.state.segment === 2) ? true : false}
										onPress={() => this.setState({segment: 2})}
									>
										<Text style={this.state.segment === 2 ? styles.activeTab : styles.normalTab}>
											vv
										</Text>
									</TouchableOpacity>

		              <TouchableOpacity
										style={{borderTopRightRadius: 4, borderBottomRightRadius: 4}}
										active={(this.state.segment === 3) ? true : false}
										onPress={() => this.setState({segment: 3})}
									>
										<Text style={this.state.segment === 3 ? styles.activeTab : styles.normalTab}>
											bb
										</Text>
									</TouchableOpacity>

		          </Segment>
            </Content>
            </View>

            <View style={{width: Layout.WIDTH * 0.70, height: Layout.HEIGHT, backgroundColor: 'green'}}>
              <Content>
  							{this._renderActiveComponent()}
              </Content>
            </View>

          </View>

          {/* <View style={{width: 200}}>
						<View>
							<Segment style={{flexDirection: 'column'}}>

		              <Button
										first
										style={[styles.segmentTab,{borderTopLeftRadius: 4, borderBottomLeftRadius: 4,}]}
										active={(this.state.segment === 1) ? true : false}
										onPress={() => this.setState({segment: 1})}
									>
										<Text style={this.state.segment === 1 ? styles.activeTab : styles.normalTab}>
											Awaiting
										</Text>
									</Button>

									<View style={styles.segmentBorder}></View>

		              <Button
										last
										style={[styles.segmentTab,{borderTopRightRadius: 4, borderBottomRightRadius: 4}]}
										active={(this.state.segment === 2) ? true : false}
										onPress={() => this.setState({segment: 2})}
									>
										<Text style={this.state.segment === 2 ? styles.activeTab : styles.normalTab}>
											Approved
										</Text>
									</Button>

		          </Segment>
						</View>
					</View>

					{/* Render Timesheet Cards */}
					{/* <View style={{width: 300}}>
						<View style={styles.cardContainer}>
							{this._renderActiveComponent()}
						</View>
					</View> */}


      </Container>
    );
  }

}
