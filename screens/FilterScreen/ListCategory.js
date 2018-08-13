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
  GET_CATEGORY_LIST
} from '../../graphql/Queries'
import CategoryListItem from './CategoryListItem'


class ListCategory extends Component {
  constructor(props) {
    super(props);
  }

  onClickCategory(data) {
    
    this.props.onClickCategory(data);

	}

  render() {
     let selectedCateId=this.props.selectedCateId
    return (
      <Query
        query = {GET_CATEGORY_LIST}
        fetchPolicy="cache-and-network"
      >
        {({ data, fetchMore, networkStatus, refetch, error, variables}) => {

          if (networkStatus === 1) {
            return <ActivityIndicator size="large" />;
          }
          if (error) {
            return <Text>Error: {error.message}</Text>;
          }
          if (!data.allCategoriesFlat || data.allCategoriesFlat.length == 0) {
            return null
          }
          return (
            <View>
              <FlatList
                contentContainerStyle={styles.listContent}
                data = {data.allCategoriesFlat || []}
                extraData={selectedCateId}
                keyExtractor={item => item.id+""}
                renderItem={({ item }) =>
                   <CategoryListItem item={item} selectedItem={selectedCateId}  onClickCategory={(item) => this.onClickCategory(item)} />
                }
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

export default withNavigation(ListCategory)
