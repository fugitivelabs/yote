// import react/redux dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import appKeys from '../../../app.json'; 

// import react-native components & apis
import {
  Dimensions
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
import Binder from '../Binder';
import Hero from './Hero.js';
import YTHeader from '../headers/YTHeader';

// import styles
import YTTailwind from '../styles/tailwind/YTTailwind'

const height = Dimensions.get('window').height

class Home extends Binder {
  constructor(props) {
    super(props);
    this._bind(
     '_handleClick'
    );
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

    return (
      <View style={YTTailwind.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          <View style={YTTailwind.brandContainer} >
            <View style={{height: height * .66, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
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
            <View style={[YTTailwind.container, {justifyContent: 'center'}]}>
              <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 50}}>
                <Text style={[YTTailwind.text, {textAlign: 'center'}]}> Check out the docs on </Text>
                <TouchableOpacity
                  onPress={this._handleClick}>
                  <Text style={[YTTailwind.text, {textAlign: 'center', color: YTTailwind.colors.accent}]}>Github </Text>
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
