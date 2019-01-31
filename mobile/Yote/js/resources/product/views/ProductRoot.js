/**
 * Product component called from TabsView
 * sends productList as props to ProductTitleList component for the ListView datasource
 */

// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components & apis
import {
  ActivityIndicator
  , StyleSheet
  , ScrollView
  , Text
  , TextInput
  , TouchableOpacity
  , View
  , Platform
} from 'react-native'; 

// import global components
import ActionButton from '../../../global/buttons/ActionButton';
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import module components
import ProductList from '../components/ProductList';

// import actions
import * as productActions from '../productActions'

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class ProductRoot extends Binder {
  constructor(props) {
    super(props);
    this._bind(
     '_openCreateProduct'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    this.props.dispatch(productActions.fetchList('all'));
  }

  _openCreateProduct() {
    this.props.navigation.navigate('CreateProduct');
  }

  _sendDelete(id) {
    this.props.dispatch(productActions.removeProductFromList(id));
    this.props.dispatch(productActions.sendDelete(id)).then((res) => {
      if(res.success) {
        console.log('item deleted');
      } else {
        console.log('failed to delete item');
      }
    })
  }

  render() {
    const { productStore, navigation, user } = this.props;

    let productList = productStore.util.getList ? productStore.util.getList('all') : null; 

    const rightItem = {
      onPress: this._openCreateProduct
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    return (
      <View style={{flex: 1}}>
        <YTHeader
          title="Products"
          rightItem={rightItem}
        />
        <View style={{flex: 1}}>
          { productList && productList.length > 0 ? 
            <ProductList
              products={productList}
              navigation={navigation}
            />
          : productList && productList.length == 0 ?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text style={YTStyles.text}>Empty</Text>
            </View> 
          : 
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <ActivityIndicator/>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

ProductRoot.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    user: store.user
    , productStore: store.product
  }
}

export default connect(
  mapStoreToProps
)(ProductRoot);
