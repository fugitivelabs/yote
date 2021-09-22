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
  , ScrollView
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
  , WebView
} from 'react-native'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';

// import styles
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  btnWrapper: {
    borderTopWidth: 1
    , borderColor: YTColors.listSeparator
  }
  , container: {
      flex: 1
      , backgroundColor: YTColors.lightBackground
    }
  , instructions: {
      textAlign: 'center'
      , color: '#222'
      , marginBottom: 5
    }
});

class Privacy extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_onNavigationStateChange'
      , '_goBack'
    )
  }

  _onNavigationStateChange() {
    console.log("_onNavigationStateChange");
  }

  _goBack() {
    this.props.navigator.pop();
  }

  render() {
    const { user } = this.props;
    const headerStyle = {
      background: {
        backgroundColor: 'transparent'
      },
      title: {
        color: YTColors.darkText
      },
      itemsColor: YTColors.darkText
    }
    const leftItem = {
      title: 'Close',
      onPress: () => this._goBack(),
    };

    return(
      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          title="Privacy"
          headerStyle={headerStyle}
        />
        <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: "http://yote.f-labs.co"}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this._onNavigationStateChange}
          onShouldStartLoadWithRequest={() => true}
          startInLoadingState={true}
          scalesPageToFit={true}
        />
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.current,
    isFetching: store.user.isFetching,
  }
}

export default connect(mapStoreToProps)(Privacy);
