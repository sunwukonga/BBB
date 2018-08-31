import React, { Component } from 'react';
import { Query } from "react-apollo";
import {
  FlatList
, View
, Text
, ActivityIndicator
} from 'react-native';
import styles from './styles';
import { withNavigation } from 'react-navigation'

import {
  GET_NESTED_CATEGORY_LIST
} from '../../graphql/Queries'
import CategoryListItem from './CategoryListItem'
import ExpandableList from 'react-native-expandable-section-flatlist';


class ListCategory extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {categoryIds} = this.props
    return (
      <Query
        query = {GET_NESTED_CATEGORY_LIST}
        fetchPolicy="cache-only"
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
          let inputData = []
          Object.keys(data.allCategoriesNested).forEach((key,index)=>{
            inputData.push({
              id: data.allCategoriesNested[key].id
            , name: data.allCategoriesNested[key].name
            , data: data.allCategoriesNested[key].children
            })
          });
          return (
            <View>
              <ExpandableList
                dataSource={inputData}
                headerKey="name"
                memberKey="data"
                renderRow={( item ) => <CategoryListItem item={item} categoryIds={categoryIds}  onClickCategory={(input) => this.props.onClickCategory(input)} /> }
                renderSectionHeaderX={(section, sectionId)  =>(
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

export default withNavigation(ListCategory)
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
