// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components & apis
import {
  Animated
  , Dimensions
  , Image
  , Linking
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import AnimatedHeader from './AnimatedHeader'; 
import Base from './BaseComponent';
import Hero from './Hero.js';
import YTStyles from '../styles/YTStyles'; 
import YTColors from '../styles/YTColors';
import YTHeader from './YTHeader';

const { height, width } = Dimensions.get('window');

class Home extends Base {
  constructor(props) {
    super(props);
    this.state = {
      isScrolled: false
      , scrollY: new Animated.Value(0)
    }
    this._bind(
     '_openProfile'
     ,'_handleScroll'
     , '_handleClick'
    );
  }

  _openProfile() {
    this.props.navigation.navigate('Profile');
  }

  _handleScroll(event) {
    if(event.nativeEvent.contentOffset.y > (height / 3) - 15) {
      this.setState({isScrolled: true});
    } else {
      this.setState({isScrolled: false}); 
    }
  }

  _handleClick() {
    let url = "https://fugitivelabs.github.io/yote/";
    Linking.canOpenURL(url).then(supported => {
      if(supported) {
        Linking.openURL(url);
      } else {
        // console.log("Can't open link");
      }
    })
  }

  render() {
    const {  itemList, navigator, user } = this.props;

    const titleItem = {
      title: "Yote"
      , visible: this.state.isScrolled
    }

    const leftItem = {
      icon: require('../img/settings.png'),
      layout: 'icon',
      onPress: null
    }

    const rightItem = {
      icon: require('../img/settings.png'),
      layout: 'icon',

      onPress: this._closeModal
    }

    return (
      <View style={YTStyles.container}>
        <ScrollView
          // automaticallyAdjustContentInsets={false}
          scrollEventThrottle={16} 
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {listener: (event) => this._handleScroll(event)}
          )}>
          <View style={{height: height / 3, width: width}}>
          </View>
          <View style={{flex: 1}} >
            <View style={{height: height / 3, alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Hero/>
              </View>
            </View>
            <Text style={{fontSize: 18, textAlign: 'center', color: YTColors.darkText, padding: 10, fontWeight: 'normal', fontFamily: 'AvenirNextCondensed-DemiBold'}}>A product of Fugitive Labs</Text>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 50}}>
                <Text style={{fontSize: 18, fontWeight: 'normal', color: YTColors.darkText, textAlign: 'center', fontFamily: 'AvenirNextCondensed-DemiBold'}}> Check out the docs on </Text>
                <TouchableOpacity
                  onPress={this._handleClick}>
                  <Text style={{fontSize: 18, fontWeight: 'normal', textAlign: 'center', color: YTColors.actionText, fontFamily: 'AvenirNextCondensed-DemiBold'}}>Github </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <AnimatedHeader
          image={require('../img/logo2.jpg')}
          // placeholder={placeholderImg}
          rightItem={rightItem}
          leftItem={leftItem}
          titleItem={titleItem}
          headerMaxHeight={height / 3}
          // otherItem={shareItem}
          scrollY={this.state.scrollY}
          color={YTColors.yoteRed}
        />
      </View>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  /****
  APPLY  sortBy
  ****/

  /****
  APPLY ANY FILTERS
  ****/

  return {
    user: store.user
  }
}

export default connect(
  mapStoreToProps
)(Home);
// export default Home;
