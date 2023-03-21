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

// Import tailwind with config
import tw from '../styles/tailwind/twrnc'; 

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
      <View style={tw`bg-white flex-1`}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          <View style={tw`bg-red-500`} >
            <View style={tw`py-8`}>
              <View style={tw`flex items-center py-8`}>
                <Image
                  resizeMode={'contain'}
                  source={require('../img/logo.png')}
                  style={tw`w-40 h-40`}
                />
              </View>
              <View>
                <Hero/>
              </View>
            </View>
            <View style={tw`bg-white`}>
              <View style={tw`p-8 flex-row justify-center`}>
                <Text style={tw`text-center text-lg`}> Check out the docs on </Text>
                <TouchableOpacity
                  onPress={this._handleClick}>
                  <Text style={tw`text-center text-lg text-blue-500 underline`}> Github</Text>
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
