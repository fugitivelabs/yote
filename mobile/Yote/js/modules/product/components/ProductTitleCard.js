// import react things
import React, { PropTypes } from 'react';
import Base from '../../../global/components/BaseComponent';
import { connect } from 'react-redux';

// import react-native components
import ListView from 'ListView';
import Dimensions from 'Dimensions';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import Image from 'Image';

// import custom components
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
            <View style={{flex: 1, flexDirection: 'row', borderWidth: 1, borderColor: 'black', margin: 5}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={productStyles.content}>{product.title} </Text>
                <Text style={productStyles.emptyMessage}>{product.description} </Text>
              </View>
              <View style={{justifyContent: 'center', paddingHorizontal: 10}}>
                <Image
                  source={require('../../../global/img/forward.png')}
                />
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
