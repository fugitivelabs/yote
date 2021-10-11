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
import { useNavigation } from '@react-navigation/native';

// import actions/reducers
import { useProductList } from '../productService';

// import components
import ProductListItem from './ProductListItem';
import WaitOn from '../../../global/components/helpers/WaitOn';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader'; 

// import styles
import YTStyles from '../../../global/styles/YTStyles';

// import services
import { useGetProductList } from '../productService';

const ProductList = () => {
  const { data: products, ids, pagination, ...productQuery } = useGetProductList({ page: 1, per: 5 });
  const navigation = useNavigation(); 

  return (
    <View style={{flex: 1}}>
      <YTHeader
        title="Products"
        // rightItem={rightItem}
      />
      <ScrollView>
        <View style={{padding: 10}}>
          <YTButton
            caption={"New Product"}
            onPress={() => navigation.navigate('CreateProduct')}
          />
        </View>
        <WaitOn query={productQuery} fallback={<Skeleton count={pagination.per} />}>
          {products?.map(product => <ProductListItem key={product._id} id={product._id} navigation={navigation}/>)}
          {/* {ids?.map(productId => <ProductListItem key={productId} id={productId} />)} */}
        </WaitOn>
      </ScrollView>
    </View>
  )
}

const Skeleton = ({count = 5}) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <ActivityIndicator key={Math.random()}/>)
}

export default ProductList;
