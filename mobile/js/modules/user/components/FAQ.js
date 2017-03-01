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
import WebView from 'WebView';
import Text from 'Text';
import Image from 'Image';
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';

// import custom components
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTCard from '../../../global/components/YTCard';

// import libraries
import moment from 'moment';

// import styles
import YTColors from '../../../global/styles/YTColors';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.lightBackground
    // padding: 5
  },

  instructions: {
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },

  btnWrapper: {
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  }
});


class FAQ extends Base {
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
          title="FAQ"
          headerStyle={headerStyle}
        />
        <WebView
          ref="webview"
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: "http://www.propatient.com/FAQs/"}}
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

export default connect(mapStoreToProps)(FAQ);
