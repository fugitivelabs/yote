// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from '../../../global/components/BaseComponent';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import YTCard from '../../../global/components/YTCard';

// import actions
import * as singleActions from '../userActions.js';

// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  btnWrapper: {
    borderTopWidth: 1
    , borderColor: YTColors.listSeparator
  }
  , container: {
      flex: 1
      , backgroundColor: YTColors.primaryHeader
    }
  , instructions: {
      textAlign: 'center'
      , color: '#222'
      , marginBottom: 5
    }
});

class Settings extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_handleBack'
      , '_handleLogout'
    )
  }

  _handleBack() {
    console.log("_handleBack fired");
    this.props.navigator.pop();
  }

  _handleLogout() {
    console.log("_handleLogout firled");
    this.props.dispatch(singleUserActions.sendLogout());
  }

  render() {
    const { user } = this.props;

    const leftItem = {
      title: 'Close',
      onPress: () => this._handleBack(),
      icon: require('./img/settings.png'),
    };

    return(
      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Settings"
        />
        <ScrollContainer >
          <YTCard header="Account">
          </YTCard>

          <YTCard header="About">
          </YTCard>

          <YTCard header="Support">
          </YTCard>

          <YTButton
            type="secondary"
            caption="Logout"
            onPress={this._handleLogout}
          />
        </ScrollContainer>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.current
    , isFetching: store.user.isFetching
  }
}

export default connect(mapStoreToProps)(Settings);
