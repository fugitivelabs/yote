// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , TouchableHighlight
  , View
} from 'react-native'; 

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';

// import libraries

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class ProductListItem extends Binder {
  constructor(props){
    super(props);
  }

  render() {
    const { product, onPress } = this.props;

    var cell =
              <View style={{padding: 10}}>
                <Text style={YTStyles.text}>{product.title}</Text>
              </View>

    if(this.props.onPress) {
      cell =
        <TouchableHighlight underlayColor={YTStyles.colors.underlay} onPress={this.props.onPress}>
          {cell}
        </TouchableHighlight>
    }
    return cell;
  }
}

const mapStoreToProps = (store) => {
  const user = store.user.loggedIn.user;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(ProductListItem);
