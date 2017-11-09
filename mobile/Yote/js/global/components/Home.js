// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

// import react-native components & apis
import Dimensions from 'Dimensions'; 
import Image from 'Image'; 
import Linking from 'Linking';  
import Platform from 'Platform'; 
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

// import global components
import Base from './BaseComponent';
import Hero from './Hero.js'; 
import YTColors from '../styles/YTColors'; 
import YTHeader from './YTHeader';

const screenHeight = Dimensions.get('window').height

var styles = StyleSheet.create({
  _bannerWrapper: {
    flex:1
    , padding: 20
    , justifyContent: 'flex-end'
  }
  , _bannerText: {
      color: '#fffFFF'
    }
  , _bannerLabel: {
      fontSize: 18
    }
  , _bannerTitle: {
      fontSize: 38
      , fontWeight: "500"
    }
  , caption: {
      fontSize: 12,
      color: YTColors.lightText
    }
  , cell: {
      flex: 1
      , backgroundColor: 'transparent'
      , marginTop: 10
      , marginBottom: 10
    }
  , comment: {
      backgroundColor: '#fff'
      , padding: 10
      , margin: 5
      , flex: 0.75
      , justifyContent: 'space-between'
    }
  , container: {
      flex: 1
      , backgroundColor: YTColors.lightBackground
    }
  , details: {
      height: 52
      , textAlign: 'center'
      , fontWeight: '500'
      , flex: 1
      , fontSize: 17
      , paddingTop: 8
      , paddingBottom: 8
    }
  , emptyMessage: {
      fontSize: 16
      , flex: 1
      , textAlign: 'center'
      , color: "#fff"
      , padding: 4
      , marginTop: 40
      , fontStyle: "italic"
      , color: YTColors.lightText
    }
  , header: {
      fontSize: 16
      , textAlign: 'center'
      , color: "#fff"
      , padding: 4
      , color: YTColors.darkText
    }
  , infoBox: {
      padding: 8
    }
  , input: {
      height: 80
      , fontSize: 17
      , padding: 4
      , backgroundColor: YTColors.listSeparator
    }
  , instructions: {
      color: YTColors.lightText
      , textAlign: 'center'
      , marginBottom: 5
    }
  , _squadListSeparator: {
      height: 0
    }
  , scrollView: {
      marginBottom: 50
    }
});


class Home extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     ,'_handleOpenDrawer'
     , '_handleClick'
    );
  }

  _openProfile() {
    this.props.navigation.navigate('UserNavigator'); 
  }
  
  _handleOpenDrawer() {
    this.context.openDrawer();  
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

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../img/default.png');

    const profileItem = {
      onPress: () => this._openProfile()
      , image: profileImg
      , layout: "image"
    };

    return (
      <View style={styles.container}>
        <YTHeader
          title="Yote"
          rightItem={profileItem}
        />
        <ScrollView 
          automaticallyAdjustContentInsets={false}
        >
          <View style={{flex: 1, backgroundColor: '#333'}} >
            <View style={{height: screenHeight * .66, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image 
                  resizeMode={'contain'}
                  source={require('../img/logo.png')}
                  style={{height: 170, width: 200}}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Hero/>
              </View>
            </View>
            <View style={{flex: 1, backgroundColor: YTColors.lightBackground, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 50}}>
                <Text style={{fontSize: 15, color: YTColors.darkText, textAlign: 'center'}}> Check out the docs on </Text>
                <TouchableOpacity
                  onPress={this._handleClick}>
                  <Text style={{fontSize: 15, textAlign: 'center', color: YTColors.actionText}}>Github </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
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
