/**
 * Infinite scrolling list of products, uses RecyclerListView to render massive lists with less lag. 
 */

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import tw from '../../../global/styles/tailwind/twrnc';

// import react-native components
import {
  Dimensions
  , Text
  , View
} from 'react-native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import YTButton from '../../../global/buttons/YTButton';
import InfiniteList from '../../../global/components/helpers/InfiniteList';
import SearchInput from '../../../global/inputs/SearchInput';

// import resource components
import ProductListItem from './ProductListItem';

// import services
import { useInfiniteProductList } from '../productService';

const InfiniteProductList = (props) => {
  const width = props.width || Dimensions.get('window').width;
  const navigation = useNavigation();
  // in dev mode, with debugging on, the search will not fire until the next interaction with the screen, annoying. Turn off debugging and it works fine.
  // more here: https://github.com/facebook/react-native/issues/6679
  // set up our query object that will be used to fetch data
  const [queryArgs, setQuery] = useState({
    textSearch: ''
    // add more query params here if needed
    // , featured: true
  });

  // handler for the search input
  const handleQueryChange = (e) => {
    const { name, value } = e.target;
    setQuery(queryArgs => ({ ...queryArgs, [name]: value }));
  }

  // use the hook to get the product list, convenience methods for the recycler list, and fetching state
  const infiniteProductList = useInfiniteProductList(queryArgs);

  // We have to tell the InfiniteList component how to render each item
  const rowRenderer = (type, id) => {
    // RecyclerListView allows for using `type` here to render different list items based on the data. Not currently used so only works with one type (ProductListItem in this case).
    return (
      <ProductListItem
        key={id}
        id={id}
        onPress={() => navigation.navigate('SingleProduct', { productId: id })}
      />
    )
  }

  return (
    <View style={tw`flex-1 bg-white`}>
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
          value={queryArgs.textSearch}
          change={handleQueryChange}
          debounceTime={300}
        />
        <View style={tw`mb-80`}>
          <InfiniteList
            {...infiniteProductList} //  the hook provides everything needed aside from the component level stuff below
            itemHeight={ProductListItem.fixedHeight}
            itemWidth={width}
            rowRenderer={rowRenderer}
            skeleton={<Skeleton />}
            emptyList={<EmptyList />}
          />
        </View>
      </View>
    </View>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('product-list-item-skeleton');
  return items.map((name, index) => <ProductListItem.Skeleton key={`${name} ${index}`} />)
}

const EmptyList = () => {
  return (
    <View style={tw`justify-center items-center py-4`}>
      <Text>No products found</Text>
    </View>
  )
}

export default InfiniteProductList;
