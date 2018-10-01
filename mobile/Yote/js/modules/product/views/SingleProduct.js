/**
 * Displays a single product by the productId sent from props and the productMap from store
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Dimensions
  , Image
  , ListView
  , Platform
  , ScrollView
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import ActionButton from '../../../global/buttons/ActionButton';
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import styles
import YTStyles from '../../../global/styles/YTStyles';
import YTColors from '../../../global/styles/YTColors';

class SingleProduct extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_openEdit'
    )
  }

  componentDidMount() {
    const { productId } = this.props.navigation.state.params;
    this.props.dispatch(productActions.fetchSingleProductById(productId));
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openEdit() {
    const { productId } = this.props.navigation.state.params;
    this.props.navigation.navigate('UpdateProduct', {productId: productId});
  }

  render() {
    const { productMap } = this.props;
    const { product } = this.props.navigation.state.params;
    
    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    return(
      <View style={YTStyles.container}>
        <YTHeader
          title='Single Product'
          leftItem={leftItem}
        />
        <ScrollView>
          <View style={{padding: 10}}>
            <Text style={YTStyles.h}>{product.title}</Text>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Text style={YTStyles.text}>{product.description}</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

SingleProduct.propTypes = {
  productId: PropTypes.string
}

const mapStoreToProps = (store) => {

  return {
    user: store.user.loggedIn.user
    , productMap: store.product.byId
  }
}

export default connect(mapStoreToProps)(SingleProduct);
