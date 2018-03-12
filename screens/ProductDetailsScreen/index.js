import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, ListView } from 'react-native'
import { Container, Content, Left, Text, Icon, Button, Item } from 'native-base'
import Swiper from 'react-native-swiper'
import Ionicons from 'react-native-vector-icons/Ionicons'

//custom components
import BBBHeader from '../../components/BBBHeader'
import Baby from '../../components/Baby'
import BBBIcon from '../../components/BBBIcon'

// style
import styles from './styles'
import { Layout, Colors, Images } from '../../constants/'

export default class ProductDetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    const rowHasChanged = (r1, r2) => r1 !== r2
    const dataObjects = [
      {id: 'aimg0001', source:Images.trollie, flag: false},
      {id: 'aimg0001', source:Images.trollie, flag: false},
    ]
    // DataSource configured
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      active: false
    }
  }

  _handleMenu(menuName) {
    this.props.navigation.navigate(menuName);
  }

  _renderRow (rowData) {
    return (
      <View style={styles.imagesSubView}>

        <View>
          <Image source={Images.trollie} style={styles.rowImageProd}/>
          <View style={styles.favoriteIconSec}>
            <BBBIcon name="Favorite" size={Layout.moderateScale(18)} color="#ffffff" />
          </View>
          <View style={styles.chatIconSec}>
            <BBBIcon name="Chat" size={Layout.moderateScale(18)} color="#ffffff" />
          </View>
        </View>

        <Item style={styles.userItemDetailsSec}>
          <View style={styles.userProfileSec}>
            <Image source={Images.tempUser} style={styles.userProfile}/>
            <View style={styles.userOnlineOffline}></View>
          </View>
          <View style={styles.userNameSec}>
            <Text style={styles.userNameProd}>Best Buys</Text>
          </View>
          <View style={styles.activeuserSec}>
            {/* <Image source={Images.trollie} style={styles.activeuser}/> */}
            <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
            <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
            <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
            <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
            <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
          </View>
        </Item>

        <View>
          <Text style={styles.postDesc}>Pre-loved stroller. Used twice and kept in stoage.</Text>
        </View>

        <View style={styles.productreviewSec}>
          <View style={styles.ratingSec}>
            <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
            <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
            <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
            <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
            <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
            {/* <Image source={Images.trollie} style={styles.ratingstyle}/> */}
            <Text style={styles.ratingmsgct}> (52) </Text>
          </View>
          <View style={styles.priceSec}>
            <Text style={styles.pricetext}>$250</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    var data = [
      {
        id: 1,
        post: Images.trollie,
      },
      {
        id: 2,
        post: Images.trollie,
      },
      {
        id: 3,
        post: Images.trollie,
      },
      {
        id: 4,
        post: Images.trollie,
      },
    ];

    var leftComponent = <Button transparent onPress={()=>this.props.navigation.goBack()}>
                          <BBBIcon name="BackArrow" size={Layout.moderateScale(18)} style={styles.backarrow}/>
                        </Button>

    var rightComponent = <Button transparent onPress={()=>this._handleMenu('categoryScreen')}>
                           <BBBIcon name="CategoryIcon" size={Layout.moderateScale(18)} style={{color: '#ffffff'}} />
                         </Button>
    return (
      <Container style={styles.container}>
        <BBBHeader title="Bebe Bargains" leftComponent={ leftComponent } rightComponent={ rightComponent } />
        <Content style={styles.contentStyle}>
          <View style={styles.wrapper}>
            <Swiper
              dot={<View style={styles.dotStyle} />}
              activeDot={<View style={styles.activeDotStyle} />}>
              {
                data.map((item, index) => {
                  return(
                    <View key={index} style={styles.slide}>
                      <Image source={item.post} style={styles.rowImage}/>
                      <View style={styles.favoriteIconSec}>
                        <BBBIcon name="Favorite" size={Layout.moderateScale(18)} color="#ffffff"/>
                      </View>
                      <View style={styles.chatIconSec}>
                        <BBBIcon name="Chat" size={Layout.moderateScale(18)} color="#ffffff"/>
                      </View>
                    </View>
                  )
                })
              }
            </Swiper>
          </View>
          <View style={styles.profileContainer}>
            <View style={styles.alignment}>
              <View style={styles.ImageContainer}>
                <Image source={Images.tempUser} style={styles.profileImage}/>
                <View style={styles.activeDot}/>
              </View>
              <Text style={styles.mediumFont}>Best Buys</Text>
            </View>
            <View style={styles.progressStyle}>
              <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
              <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
              <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
              <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
              <BBBIcon name="ActivePost" size={Layout.moderateScale(12)} style={{color: '#3eb722', }}/>
            </View>
          </View>

          <View style={styles.deviderStyle}/>

          <Text style={styles.regularSmall}>Pre-loved stroller. Used twice and kept in stoage.</Text>
          <View style={styles.profileContainer}>
            <View style={styles.alignment}>
              <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
              <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
              <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
              <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
              <BBBIcon name="Star" size={Layout.moderateScale(14)} style={{color: '#feb532', marginTop: Layout.moderateScale(2)}}/>
              <Text style={styles.rateCount}>(52)</Text>
            </View>
            <Text style={styles.skyFontBold}>$250</Text>
          </View>

          <View style={styles.alignmentButton}>
            <TouchableOpacity style={styles.barterButton} onPress={()=>alert("BARTER")}>
              <Text style={styles.regularSmall}>BARTER</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.offerButton} onPress={()=>alert("COUNTER OFFER")}>
              <Text style={styles.regularSmall}>COUNTER OFFER</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.regularLarge}>Category</Text>
            <Text style={[styles.regularSmall,styles.tagContainer]}>Baby Stroller</Text>
            <Text style={styles.regularLarge}>Template</Text>
            <View style={styles.tagContainer}>
              <View style={styles.alignmentTag}>
                <Text style={styles.regularSmall}>Di-2046</Text>
                <Icon name="close" size={Layout.moderateScale(10)} style={styles.closeIcon} onPress={()=>alert("Close")} />
              </View>
              <View style={styles.alignmentTag}>
                <Text style={styles.regularSmall}>Di-2047</Text>
                <Icon name="close" size={Layout.moderateScale(10)} style={styles.closeIcon} onPress={()=>alert("Close")} />
              </View>
            </View>
            <Text style={styles.regularLarge}>Tags</Text>
            <View style={styles.tagContainer}>
              <View style={styles.alignmentTag}>
                <Text style={styles.regularSmall}>Stroller</Text>
                <Icon name="close" size={Layout.moderateScale(10)} style={styles.closeIcon} onPress={()=>alert("Close")}/>
              </View>
              <View style={styles.alignmentTag}>
                <Text style={styles.regularSmall}>Stroller-Green</Text>
                <Icon name="close" size={Layout.moderateScale(10)} style={styles.closeIcon} onPress={()=>alert("Close")} />
              </View>
            </View>
          </View>

          <View style={styles.deviderStyle}/>

          <View>
            <Text style={styles.boldFont}>Delivery Options</Text>
            <View style={styles.profileContainer}>
              <View>
                <Text style={styles.skyFontMedium}>Face to Face</Text>
                <Text style={[styles.regularSmall,{width: Layout.WIDTH * 0.3}]}>71 Pilgrim Avenue  Chevy Chase,  MD 20815</Text>
              </View>
              <Ionicons name="md-locate" size={Layout.moderateScale(20)} color='#1fa6a4' />
            </View>
          </View>

          <View style={styles.deviderStyle}/>

          <View>
            <Text style={styles.skyFontMedium}>Registered Post</Text>
            <Text style={[styles.regularSmall,{width: Layout.WIDTH * 0.3}]}>Additional Cost USD $3.00</Text>
          </View>

          <View style={styles.deviderStyle}/>

          <View style={styles.imagesMainView}>
            <View style={styles.populerSec}>
              <Text style={styles.populerText}>Related Products</Text>
            </View>
            <ListView
              horizontal={true}
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              enableEmptySections />
          </View>

        </Content>
      </Container>
    );
  }

}
