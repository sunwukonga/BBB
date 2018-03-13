import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList
} from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
  Button,
  Icon,
  Item,
  Title
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Baby from "../../components/Baby";
import BBBHeader from "../../components/BBBHeader";
import styles from "./styles";
import BBBIcon from "../../components/BBBIcon";
import { Layout, Colors, Images } from "../../constants/";
export default class StrollersScreen extends React.Component {
  _renderItem = ({ item }) => (
    <View style={styles.imagesSubView}>
      <View>
        <Image source={Images.trollie} style={styles.rowImage} />
        <View style={styles.favoriteIconSec}>
          <BBBIcon
            name="Favorite"
            size={Layout.moderateScale(13)}
            color="#ffffff"
          />
        </View>
        <View style={styles.chatIconSec}>
          <BBBIcon
            name="Chat"
            size={Layout.moderateScale(13)}
            color="#ffffff"
          />
        </View>
      </View>
      <View>
      <Item style={styles.userItemDetailsSec}>
        <View style={styles.userProfileSec}>
          <Image source={Images.tempUser} style={styles.userProfile} />
          <View style={styles.userOnlineOffline} />
        </View>
        <View style={styles.userNameSec}>
          <Text style={styles.userName}>Best Buyss</Text>
        </View>
        <View style={styles.activeuserSec}>
          {/* <Image source={Images.trollie} style={styles.activeuser}/> */}
          <BBBIcon
            name="ActivePost"
            size={Layout.moderateScale(12)}
            style={{ color: "#3eb722" }}
          />
          <BBBIcon
            name="ActivePost"
            size={Layout.moderateScale(12)}
            style={{ color: "#3eb722" }}
          />
          <BBBIcon
            name="ActivePost"
            size={Layout.moderateScale(12)}
            style={{ color: "#3eb722" }}
          />
          <BBBIcon
            name="ActivePost"
            size={Layout.moderateScale(12)}
            style={{ color: "#3eb722" }}
          />
          <BBBIcon
            name="ActivePost"
            size={Layout.moderateScale(12)}
            style={{ color: "#3eb722" }}
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
            style={{ color: "#feb532", marginTop: Layout.moderateScale(2) }}
          />
          <BBBIcon
            name="Star"
            size={Layout.moderateScale(14)}
            style={{ color: "#feb532", marginTop: Layout.moderateScale(2) }}
          />
          <BBBIcon
            name="Star"
            size={Layout.moderateScale(14)}
            style={{ color: "#feb532", marginTop: Layout.moderateScale(2) }}
          />
          <BBBIcon
            name="Star"
            size={Layout.moderateScale(14)}
            style={{ color: "#feb532", marginTop: Layout.moderateScale(2) }}
          />
          <BBBIcon
            name="Star"
            size={Layout.moderateScale(14)}
            style={{ color: "#feb532", marginTop: Layout.moderateScale(2) }}
          />
          {/* <Image source={Images.trollie} style={styles.ratingstyle}/> */}
          <Text style={styles.ratingmsgct}> (52) </Text>
        </View>
        <View style={styles.priceSec}>
          <Text style={styles.pricetext}>$250</Text>
        </View>
      </View>

      <View style={styles.offerTypeSec}>
        {(item.barter)?
          <View style={styles.bartedSec}>
            <Text style={styles.bartedTxt}>BARTER</Text>
          </View>
          :
          null
        }
        {(item.counter)?
          <View style={styles.counterSec}>
            <Text style={styles.counterTxt}>COUNTER OFFER</Text>
          </View>
          :
          null
        }
        {(item.sale)?
          <View style={styles.saleSec}>
            <Text style={styles.saleTxt}>SALE</Text>
          </View>
          :
          null
        }
      </View>
      </View>
    </View>
  );

  render() {
    var listItemData = [
      { id: "aimg0001", source: Images.trollie, flag: false, barter:true, counter:true, sale:false},
      { id: "aimg0002", source: Images.trollie, flag: false, barter:true, counter:false, sale:false},
      { id: "aimg0003", source: Images.trollie, flag: false, barter:true, counter:true, sale:false},
      { id: "aimg0004", source: Images.trollie, flag: false, barter:false, counter:false, sale:true},
      { id: "aimg0005", source: Images.trollie, flag: false, barter:false, counter:true, sale:false},
      { id: "aimg0006", source: Images.trollie, flag: false, barter:false, counter:true, sale:true},
    ];
    var leftComponent = (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon
          name="md-arrow-back"
          size={Layout.moderateScale(20)}
          style={{ color: "#ffffff" }}
        />
      </Button>
    );

    return (
      <Container style={styles.container}>
        <BBBHeader title="Strollers" leftComponent={leftComponent} />
        <Content >
          <View style={styles.liststyle}>
            <FlatList
              data={listItemData}
              keyExtractor={listItemData => listItemData.id}
              renderItem={this._renderItem}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
