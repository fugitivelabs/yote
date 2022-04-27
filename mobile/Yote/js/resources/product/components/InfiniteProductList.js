/**
 * Infinite scrolling list of products
 */

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from '../../../global/styles/tailwind/twrnc';

// import react-native components
import {
  FlatList
  , Text
  , View
} from 'react-native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import SearchInput from '../../../global/inputs/SearchInput';

// import resource components
import ProductListItem from './ProductListItem';

// import services
import { useInfiniteProductList } from '../productService';

const InfiniteProductList = () => {
  const navigation = useNavigation();
  // set up our query object that will be used to fetch data
  const [query, setQuery] = useState({
    textSearch: ''
    // add more query params here if needed
    // , featured: true
  });

  // handler for the search input
  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQuery(query => ({ ...query, [name]: value }));
  }

  // use the hook to get the product list, convenience methods for the FlatList, and fetching state
  const { data: products, refresh, getNextPage, isFetching } = useInfiniteProductList(query);

  // defining renderItem here because we need to pass in the navigation prop
  const renderItem = ({ item: product }) => {
    return (
      <ProductListItem
        key={product?._id}
        id={product?._id}
        navigation={navigation}
      />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <YTHeader
        title="Products"
      // rightItem={rightItem}
      />
      <View style={tw`p-2`}>
        <View style={tw`p-2`}>
          <YTButton
            caption={"New Product"}
            onPress={() => navigation.navigate('CreateProduct')}
          />
        </View>
        <SearchInput
          placeholder={"Search products..."}
          name="textSearch"
          value={query.textSearch}
          change={handleQueryChange}
          debounceTime={300}
        />
        <View style={tw.style(isFetching && 'opacity-50', 'pb-80')}>
          <FlatList
            data={products}
            onRefresh={refresh}
            onEndReached={getNextPage}
            onEndReachedThreshold={0.8}
            refreshing={!products.length && isFetching}
            ListEmptyComponent={isFetching ? Skeleton : EmptyList}
            renderItem={renderItem}
          />
        </View>
      </View>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('list-item-skeleton');
  return items.map((name, index) => <ProductListItem.Skeleton key={`${name} ${index}`} />)
}

const EmptyList = () => {
  return (
    <View style={tw`flex-1 flex flex-col justify-center items-center`}>
      <Text>No products found</Text>
    </View>
  )
}

export default InfiniteProductList;
