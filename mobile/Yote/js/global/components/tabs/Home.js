// import react/redux dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components & apis
import Image from 'Image'; 
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';
import ScrollView from 'ScrollView';
import Linking from 'Linking';  
import Dimensions from 'Dimensions'; 
import Platform from 'Platform'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import ScrollContainer from '../ScrollContainer';
import YTButton from '../YTButton';
import YTCard from '../YTCard';
import YTColors from '../../styles/YTColors'; 
import YTHeader from '../YTHeader';
import Hero from './Hero.js'; 

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
    this.props.navigator.push({profile: true});
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

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/skull-icon.png');

    const androidDrawerItem = {
      onPress: this._handleOpenDrawer,
      icon: require('../../../global/components/img/bulletList.png'),
      layout: "icon",
    }

    const profileItem = {
      onPress: () => this._openProfile()
      , image: profileImg
      , layout: "image"
    };

    return (
      <View style={styles.container}>
        <YTHeader
          title="Yote"
          leftItem={Platform.OS === 'ios' ? profileItem : androidDrawerItem}
          rightItem={Platform.OS === 'ios' ? null : profileItem}
        >
        </YTHeader>
        <ScrollView 
          automaticallyAdjustContentInsets={false}
        >
          <View style={{flex: 1, backgroundColor: '#333'}} >
            <View style={{height: screenHeight * .66, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image 
                  source={require('../../../global/img/howler.png')}
                  style={{height: 170, width: 200}}
                  resizeMode={'contain'}
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

Home.contextTypes = {
  openDrawer: React.PropTypes.func
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
