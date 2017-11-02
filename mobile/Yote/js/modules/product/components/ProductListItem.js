// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import View from 'View';

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton'; 
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';

// import styles
import productStyles from '../productStyles'; 
import YTColors from '../../../global/styles/YTColors';

class ProductListItem extends Base {
  constructor(props){
    super(props);
  }

  render() {
    const { product, onPress } = this.props;
    let icon = <Image source={require('../../../global/img/breast.png')} />;

    var cell =
              <View style={productStyles.cellBackground}>
                <View style={{flex: 1, paddingHorizontal: 5, flexDirection: 'row'}}>
                  <View style={{flex: 1, padding: 5}}>
                    <Text style={{fontSize: 20, paddingVertical: 5}}>{product.title} </Text>
                    <View style={productStyles.listSeparator}/>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flex: 1, justifyContent: 'center', paddingVertical: 5}}>
                        <View style={{paddingVertical: 10}}>
                          <Text style={[productStyles.label, {color: YTColors.lightText}]}>{product.description} </Text>
                        </View>
                        <Text style={productStyles.label}>Created: {moment(product.created).format("MMMM Do YYYY, h:mm a")}</Text>
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end', padding: 10}}>
                        <View style={{justifyContent: 'center'}}>
                          <Image
                            source={require('../../../global/img/forward.png')}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            
    if(this.props.onPress) {
      cell =
        <View style={{paddingVertical: 1}}>
          <YTTouchable onPress={this.props.onPress}>
            {cell}
          </YTTouchable>
        </View>
    }
    return cell;
  }
}

ProductListItem.propTypes = {
  product: PropTypes.object
  , onPress: PropTypes.func
}

const mapStoreToProps = (store) => {
  const user = store.user.loggedIn.user;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(ProductListItem);
