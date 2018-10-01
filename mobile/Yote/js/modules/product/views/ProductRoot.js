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
import YTColors from '../../../global/styles/YTColors';
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
     '_openProfile'
     , '_openNew'
     , '_sendDelete'
     , '_handleOpenDrawer'
    );
  }

  componentDidMount() {
    this.props.dispatch(productActions.fetchList());
  }

  _openProfile() {
    this.props.navigator.push({profile: true});
  }

  _openNew() {
    this.props.navigation.navigate('NewProduct');
  }

  _sendDelete(id) {
    this.props.dispatch(productActions.sendDelete(id)).then((res) => {
      this.props.dispatch(productActions.removeProductFromList(id));
    })
  }

  _handleOpenDrawer() {
    this.context.openDrawer();
  }

  render() {

    const { productStore, navigation, user } = this.props;

    let productList = productStore.util.getList ? productStore.util.getList('all') : null; 

    const rightItem = {
      onPress: () => this._openNew()
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
