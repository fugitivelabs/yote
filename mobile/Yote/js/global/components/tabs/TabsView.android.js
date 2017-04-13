/**
* Global tabs view for android called from MainNavigator
* Calls custom Drawer Layout component
*/

// import react libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Navigator from 'Navigator';
import StatusBar from 'StatusBar'; 
import StyleSheet from 'StyleSheet';
import View from 'View';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import Platform from 'Platform'; 

// import global components
import ActionButton from '../../../global/components/ActionButton';
import Base from '../BaseComponent';
import Home from './Home';
import YTDrawerLayout from './YTDrawerLayout.js';

// import module components
import Product from '../../../modules/product/components/Product'; 
import Profile from '../../../modules/user/components/Profile';
 
// import actions


// import styles
import YTColors from '../../styles/YTColors';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : 25;
const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 + STATUS_BAR_HEIGHT : 56 + STATUS_BAR_HEIGHT;

let styles = StyleSheet.create({
  content: {
    flex: 1,
  }
  , drawer: {
      flex: 1
      , backgroundColor: 'white'
      , paddingTop: 20
    }
  , header: {
      padding: 20
      , justifyContent: 'flex-end'
    }
  , loginPrompt: {
      flex: 1
      , justifyContent: 'flex-end'
      , paddingBottom: 10
    }
  , loginText: {
      fontSize: 12
      , color: YTColors.lightText
      , textAlign: 'center'
      , marginBottom: 10
    }
  , name: {
      marginTop: 10
      , color: 'white'
      , fontSize: 12
    },
});

class TabsView extends Base {
  constructor(props) {
    super(props);
    this.state = {selectedTab: "home"}
    this._bind(
      'renderNavigationView'
      , 'openProfileSettings'
      , 'openDrawer'
      , 'closeDrawer'
      , '_goToFeed'
      , '_goToMyProducts'
      , '_goToHome'
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

  closeDrawer() {
    this.refs.drawer.closeDrawer(); 
  }

  onTabSelect(tab) {
    if (this.props.tab !== tab) {
      this.props.onTabSelect(tab);
    }
    this.refs.drawer.closeDrawer();
  }

  openProfileSettings() {
    this.refs.drawer.closeDrawer();
  }

  _goToFeed() {
    this.setState({selectedTab: "feed"}); 
    this.refs.drawer.closeDrawer(); 
  }

  _goToMyProducts() {
    this.setState({selectedTab: "products"});  
    this.refs.drawer.closeDrawer(); 
  }

  _goToHome() {
    this.setState({selectedTab: "home"});  
    this.refs.drawer.closeDrawer(); 
  }

  renderNavigationView() {
    return (
      <View style={styles.drawer}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={this.closeDrawer}>
            <Text>Close </Text>
          </TouchableOpacity>
        </View>
        <ActionButton
          caption="home"
          onPress={this._goToHome}
          style={{backgroundColor: YTColors.yoteGreen}}
        />
        <ActionButton
          caption="products"
          onPress={this._goToMyProducts}
          style={{backgroundColor: YTColors.yoteGreen}}
        />
      </View>
    )
  }

  renderContent() {
    switch (this.state.selectedTab) {
      case 'home':
        return (
          <Home
            navigator={this.props.navigator}
          />
        );

      case 'products':
        return (
          <Product
            navigator={this.props.navigator}
          />
        );

      case 'feed':
        return (
          <Feed
            navigator={this.props.navigator}
          />
        );
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

const mapStoreToProps = (store) => {

  return {
    user: store.user.current
  }
}

export default connect(
  mapStoreToProps
)(TabsView);