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
import { tailwind } from '../styles/tailwind/tailwind'; 

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
      <View style={tailwind('bg-white flex-1')}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
        >
          <View style={tailwind('bg-blue-500')} >
            <View style={tailwind('py-8')}>
              <View style={tailwind('flex items-center py-8')}>
                <Image
                  resizeMode={'contain'}
                  source={require('../img/logo.png')}
                  style={tailwind('w-40 h-40')}
                />
              </View>
              <View>
                <Hero/>
              </View>
            </View>
            <View style={tailwind('bg-white')}>
              <View style={tailwind('p-8 flex-row justify-center')}>
                <Text style={tailwind('text-center text-lg')}> Check out the docs on </Text>
                <TouchableOpacity
                  onPress={this._handleClick}>
                  <Text style={tailwind('text-center text-lg text-blue-500 underline')}> Github</Text>
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
