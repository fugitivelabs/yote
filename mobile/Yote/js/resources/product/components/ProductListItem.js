// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  Dimensions
  , Image
  , Platform
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';
import ListItem from '../../../global/components/base/ListItem';
import WaitOn from '../../../global/components/helpers/WaitOn'; 

// import libraries

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc'; 

// import services
import { useGetProductById } from '../productService';

const ProductListItem = ({ id, navigation }) => {
  const { data: product, ...productQuery } = useGetProductById(id);

  return (
    <WaitOn query={productQuery} fallback={<Skeleton/>}>
      <View style={tw.style('flex-1', { 'opacity-50': productQuery.isFetching })}>
        <TouchableHighlight style={tw`p-2`} onPress={() => navigation.navigate('SingleProduct', {productId: id})}>
          <View>
            <Text style={tw`text-lg font-semibold`}>{product.title}</Text>
            <Text style={tw`text-lg`}>{product.description}</Text>
          </View>
        </TouchableHighlight>
      </View>
    </WaitOn>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <View >
      <Text>Loading</Text>
    </View>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductListItem;
