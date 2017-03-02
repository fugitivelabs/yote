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
import ScrollView from 'ScrollView';
import TouchableOpacity from 'TouchableOpacity';

// import custom components
import YTTouchable from '../../../global/components/YTTouchable';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTCard from '../../../global/components/YTCard';


// import actions
import { singleActions as singleUserActions } from '../actions';

// import styles
import YTColors from '../../../global/styles/YTColors';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
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

          <YTCard
            header="Account"
          >

          </YTCard>
          <YTCard
            header="About"
          >

          </YTCard>
          <YTCard
            header="Support"
          >

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
    user: store.user.current,
    isFetching: store.user.isFetching,
  }
}

export default connect(mapStoreToProps)(Settings);
