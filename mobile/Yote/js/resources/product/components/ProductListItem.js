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

// import libraries

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc';

// import services
import { useProductFromMap } from '../productService';

const ProductListItem = ({ id, navigation }) => {
  // if this is being rendered then we already fetched the list so we know this product exists in the map, no need to attempt to fetch it again
  const product = useProductFromMap(id);

  if(!product) return <Skeleton />;

  return (
    <View style={tw`flex`}>
      <TouchableHighlight style={tw`p-2`} onPress={() => navigation.navigate('SingleProduct', { productId: id })}>
        <View>
          <Text style={tw`text-lg font-semibold`}>{product?.title}</Text>
          <Text style={tw`text-lg`}>{product?.description}</Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <View style={tw`flex`} >
      <View style={tw`p-2`}>
        <Text style={tw`bg-gray-400 h-5 my-1 w-2/5`} />
        <Text style={tw`bg-gray-300 h-5 my-1 w-3/4`} />
      </View>
    </View>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
  , onPress: PropTypes.func
}

export default ProductListItem;
