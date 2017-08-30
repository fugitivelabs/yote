/**
* Displays a single product by the productId sent from props and the productMap from store
*/

// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Alert from 'Alert';
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

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

  componentWillMount() {
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
    const { productId } = this.props.navigation.state.params; 
    let product = productMap[productId];  

    const leftItem = {
      icon: require('../../../global/img/back.png'),
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
          title='Single Product'
          leftItem={leftItem}
          rightItem={rightItem}
        />
        <ScrollView>
          <View style={productStyles.cell}>
            <View style={productStyles.infoBox}>
              <Text style={[productStyles.headerLeft, {paddingBottom: 5}]}>{product.title} </Text>
              <View style={productStyles.listSeparator}/>
              <View style={{paddingVertical: 5}}>
                <View style={{paddingVertical: 10}}>
                  <Text style={productStyles.description}>{product.description}</Text>
                </View>
                <Text style={[productStyles.description, {color: YTColors.actionText}]}>Created: {moment(product.created).format("MMMM Do YYYY, h:mm a")}</Text>
              </View>
            </View>
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
