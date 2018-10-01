// List Component for Product

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
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

// import actions
import * as productActions from '../productActions';

// import global components
import Binder from '../../../global/Binder';

// import module components
import ProductListItem from './ProductListItem';

// import Styles
import YTStyles from '../../../global/styles/YTStyles';
import YTColors from '../../../global/styles/YTColors';

class ProductList extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this._bind(
      '_handleRefresh'
      , '_openProduct'
      , '_renderSeparator'
    )
  }

  _handleRefresh() {
    this.props.dispatch(productActions.fetchList()).then(() => {
    });
  }

  _openProduct(product) {
    console.log("open product", product);
    this.props.navigation.navigate('SingleProduct', {product: product});
  }

  _renderSeparator() {
    return (
      <View style={YTStyles.separator}/>
    )
  }

  render() {
    const { products } = this.props;
    const isEmpty = !products || products.length < 1;

   return (
     <View style={YTStyles.container}>
        <FlatList
          data={products}
          keyExtractor={(product, index) => index.toString()}
          ItemSeparatorComponent={() => this._renderSeparator()}
          onRefresh={this._handleRefresh}
          refreshing={this.state.refreshing}
          renderItem={(product) => 
            <ProductListItem
              product={product.item}
              onPress={() => this._openProduct(product.item)}
            />
          }
        />
     </View>
   )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user
    , productMap: store.product.byId
  }
}

export default connect(mapStoreToProps)(ProductList);
