
// import react things
import React, { PropTypes } from 'react';
import Base from '../BaseComponent';
import { connect } from 'react-redux';


// import react-native components
import StatusBar from 'StatusBar';
import YTDrawerLayout from './YTDrawerLayout.js'; 


import Navigator from 'Navigator';
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';

// import components
import Profile from '../../../modules/user/components/Profile';

// import actions


// import styles
import YTColors from '../../styles/YTColors';
var styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
  },
  name: {
    marginTop: 10,
    color: 'white',
    fontSize: 12,
  },
  loginPrompt: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  loginText: {
    fontSize: 12,
    color: YTColors.lightText,
    textAlign: 'center',
    marginBottom: 10,
  },
});

class TabsView extends Base {
  constructor(props) {
    super(props);
    this.state = {selectedTab: "showings"}
    this._bind(
      'renderNavigationView'
      , 'openProfileSettings'
      , 'openDrawer'
    )
  }

  getChildContext() {
    return {
      openDrawer: this.openDrawer,
      hasUnreadNotifications: this.props.notificationsBadge > 0,
    }
  }

  openDrawer() {
    this.refs.drawer.openDrawer();
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  openProfileSettings() {
    this.refs.drawer.closeDrawer();
    // this.props.navigator.push({shareSettings: true});
  }

  renderNavigationView() {
    return (
      <View style={styles.drawer}>
        <View><Text>THINGS HERE </Text></View>
      </View>
    )
  }

  renderContent() {
    switch (this.state.selectedTab) {
      case 'squads':
        return (
          <MySquads
            navigator={this.props.navigator}
          />
        );

      case 'profile':
        return <Profile navigator={this.props.navigator} />;
    }
    throw new Error(`Unknown tab ${this.props.tab}`);
  }

  render() {
    return (
      <YTDrawerLayout
        ref="drawer"
        drawerWidth={290}
        drawerPosition="left"
        renderNavigationView={this.renderNavigationView}>
        <View style={styles.content} key={this.props.tab}>
          {this.renderContent()}
        </View>
      </YTDrawerLayout>
    );
  }
}

TabsView.childContextTypes = {
  openDrawer: React.PropTypes.func,
  hasUnreadNotifications: React.PropTypes.bool,
};

TabsView.propTypes = {
  dispatch: PropTypes.func
  // tab: PropTypes.string
}
//
// QHTabsView.defaultProps = {
//   tab: 'showings'
// }

const mapStoreToProps = (store) => {

  return {
    user: store.user.current,
  }
}

export default connect(
  mapStoreToProps
)(TabsView);