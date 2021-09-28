// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';
import ListItem from '../../../global/components/base/ListItem';

// import libraries

// import styles
import YTStyles from '../../../global/styles/YTStyles';

// import services
import { useGetProductById } from '../productService';

const ProductListItem = ({ id, navigation }) => {
  const { data: product, ...productQuery } = useGetProductById(id);

  if(productQuery.isLoading) return <Skeleton />
  if(productQuery.isError) return <ListItem>An error occurred 😬 <YTButton onPress={productQuery.refetch}>Refetch</YTButton></ListItem>
  if(!product) return <ListItem>No product found</ListItem>

  return (
    <ListItem style={{opacity: productQuery.isFetching ? 0.5 : ''}}>
      <TouchableHighlight onPress={() => navigation.navigate('SingleProduct', {productId: id})}>
        <View>
          <Text>{product.title}</Text>
          <Text>{product.description}</Text>
        </View>
      </TouchableHighlight>
    </ListItem>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <ListItem className="animate-pulse">
      <Text>Loading</Text>
    </ListItem>
  )
}
// add the skeleton to the component so we can access it in other components (ProductList in this case)
ProductListItem.Skeleton = Skeleton;

ProductListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default ProductListItem;
