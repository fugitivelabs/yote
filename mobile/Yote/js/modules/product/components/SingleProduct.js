/**
* Displays a single product by the productId sent from props and the productMap from store
*/

// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';
import TextInput from 'TextInput';
import Alert from 'Alert';

// import custom components
import Base from '../../../global/components/BaseComponent';
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import ActionButton from '../../../global/components/ActionButton';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as productActions from '../productActions';

// import styles
import productStyles from '../productStyles'; 
import YTColors from '../../../global/styles/YTColors';

class SingleProduct extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_openEdit'
    )
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openEdit() {
    console.log("open edit product");
  }

  render() {
    const { productId, productMap } = this.props; 
    let product = productMap[productId];  

    const leftItem = {
      icon: require('../../../global/components/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    const rightItem = {
      title: "Edit",
      onPress: this._openEdit,
    };

    return(
      <View style={productStyles.container}>
        <YTHeader
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <View style={productStyles.infoBox}>
          <Text style={productStyles.header}>{product.title} </Text>
          <Text style={productStyles.description}>{product.description}</Text>
          <Text style={productStyles.description}>Created: {moment(product.created).format("MMMM Do YYYY, h:mm a")}</Text>
          <Text style={productStyles.description}>Id: {product._id}</Text>
        </View>
        <View style={{padding: 8}}>
          <YTButton
            onPress={null}
            caption={"Yote Button"}
          />
        </View>
        <View style={{padding: 8}}>
          <ActionButton
            onPress={null}
            caption={"Action Button"}
            style={{backgroundColor: '#31ce7c'}}
          />
        </View>
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
