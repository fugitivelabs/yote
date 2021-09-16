// List Component for Product

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  ActivityIndicator
  , Image
  , FlatList
  , Platform
  , RefreshControl
  , ScrollView
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native';

// import actions/reducers
import { useProductList } from '../productService';

// import components
import ProductListItem from './ProductListItem';
import WaitOn from '../../../global/components/helpers/WaitOn';

import YTHeader from '../../../global/headers/YTHeader'; 

// import styles
import YTStyles from '../../../global/styles/YTStyles';

// import services
import { useGetProductList } from '../productService';

const ProductList = () => {
  const { data: products, ids, pagination, ...productQuery } = useGetProductList({ page: 1, per: 5 });
  
  return (
    <View style={{flex: 1}}>
      <YTHeader
        title="Products"
        // rightItem={rightItem}
      />
      <ScrollView>
        <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
          {products?.map(product => <ProductListItem key={product._id} id={product._id} />)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ActivityIndicator/>)
}

export default ProductList;
