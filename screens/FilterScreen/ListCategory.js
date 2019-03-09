import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, View
, Text
, ActivityIndicator
} from 'react-native';
import styles from './styles';
//import { withNavigation } from 'react-navigation'

import {
  GET_NESTED_CATEGORY_LIST
} from '../../graphql/Queries'
import CategoryListItem from './CategoryListItem'
import ExpandableList from 'react-native-expandable-section-flatlist';
import { i18nTransformCategories } from '../../utils/helpers.js'


class ListCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
        //fetchPolicy="cache-only"
    const { categoryIds, loginStatus, translations } = this.props
    return (
      <Query
        query = {GET_NESTED_CATEGORY_LIST}
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {

          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.allCategoriesNested || data.allCategoriesNested.length == 0) {
            return null
          }
          /*
          let inputData = []
          Object.keys(data.allCategoriesNested).forEach((key,index)=>{
            inputData.push({
              id: data.allCategoriesNested[key].id
            , name: data.allCategoriesNested[key].name
            , data: data.allCategoriesNested[key].children
            })
          });
          */

          _renderRow = (rowItem, rowId, sectionId) => (
            <CategoryListItem
              item={rowItem}
              categoryIds={categoryIds}
              onClickCategory={(input) => this.props.onClickCategory(input)}
            />
          )

          return (
            <View>
              <ExpandableList
                dataSource={i18nTransformCategories(data.allCategoriesNested, loginStatus, translations)}
                headerKey="name"
                memberKey="data"
                renderRow={ this._renderRow }
                renderSectionHeaderX= { (section, sectionId) => (
                  <View style={styles.mainlist}>
                    <Text style={styles.SectionHeaderStyle}>{section}</Text>
                  </View>
                )}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default ListCategory
/*
              <FlatList
                contentContainerStyle={styles.listContent}
                data = {data.allCategoriesFlat || []}
                extraData={selectedCateId}
                keyExtractor={item => item.id+""}
                renderItem={({ item }) =>
                   <CategoryListItem item={item} selectedItem={selectedCateId}  onClickCategory={(item) => this.props.onClickCategory(item)} />
                }
              />
              */
