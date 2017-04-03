// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import View from 'View';

// import custom components
import Base from '../../../global/components/BaseComponent';
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton'; 

// import libraries
import moment from 'moment';

// import styles
import YTColors from '../../../global/styles/YTColors';
import productStyles from '../productStyles'; 

class ProductTitleCard extends Base {
  constructor(props){
    super(props);
  }

  render() {
    const { product, onPress } = this.props;
    let icon = <Image source={require('../../../global/img/breast.png')} />;

    var cell =
            <View style={productStyles.cell}>
              <View style ={productStyles.cellBackground}>
                <Text style={productStyles.cardHeader}>{product.title} </Text>
                <View style={productStyles.cellRow}>
                  <View style={productStyles.cellColumn}>
                    <Text style={productStyles.emptyMessage}>{product.description} </Text>
                    <Text style={productStyles.emptyMessage}>Created: {moment(product.created).format("MMMM Do YYYY, h:mm a")}</Text>
                  </View>
                  <View style={productStyles.cellForwardImg}>
                    <Image
                      source={require('../../../global/img/forward.png')}
                    />
                  </View>
                </View>
              </View>
            </View>;

    if(this.props.onPress) {
      cell =
        <YTTouchable onPress={this.props.onPress}>
          {cell}
        </YTTouchable>
    }

    return cell;

  }

}

ProductTitleCard.propTypes = {
  product: PropTypes.object
  , onPress: PropTypes.func
}

const mapStoreToProps = (store) => {
  const user = store.user.loggedIn.user;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(ProductTitleCard);
