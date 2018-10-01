/**
 * Displays a single product by the product sent from props
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
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
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
      '_goBack'
    )
  }

  componentDidMount() {
    const { product } = this.props.navigation.state.params;
    this.props.dispatch(productActions.fetchSingleProductById(product._id));
  }

  _goBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { product } = this.props.navigation.state.params;

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._goBack,
    }

    return(
      <View style={YTStyles.container}>
        <YTHeader
          title='Single Product'
          leftItem={leftItem}
        />
        <ScrollView>
          <View style={{padding: 10}}>
            <Text style={YTStyles.h1}>{product.title}</Text>
          </View>
          <Text style={[YTStyles.text, {padding: 10}]}>{product.description}</Text>
        </ScrollView>
      </View>
    )
  }
}

SingleProduct.propTypes = {
  product: PropTypes.object
}

const mapStoreToProps = (store) => {

  return {
    user: store.user.loggedIn.user
    , productMap: store.product.byId
  }
}

export default connect(mapStoreToProps)(SingleProduct);
