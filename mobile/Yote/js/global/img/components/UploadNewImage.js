// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker'; 

// import global components
import Binder from '../../Binder';
import YTButton from '../../buttons/YTButton';

// import libraries
import moment from 'moment';
// import { DateTime } from 'luxon'; 

// import actions

// import styles
import YTStyles from '../../styles/YTStyles';

class UploadNewImage extends Binder {
  constructor(props){
    super(props);
    this.state = {
      newImg: null
    }
    this._bind(
      '_openImagePicker'
    )
  }

  componentDidMount() {
    
  }

  _openImagePicker() {
     var options = {
      allowsEditing: true
      , maxWidth: 500
      , maxHeight: 500
      , title: 'Select Picture'
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        console.log(response); 
      }
    })
  }

  render() {
    const { height } = this.props;
    const { newImg } = this.state; 

    return (
      <View style={{flex: 1, borderRadius: height * .5}}>
        <TouchableOpacity onPress={this._openImagePicker}>
          <Image
            style={{backgroundColor: YTStyles.colors.separator, width: height, height: height, borderRadius: Platform.OS === 'ios' ? height * .5 : null}}
            source={newImg ? {uri: newImg.uri} : require('../default.png')}
          />
          <LinearGradient colors={['rgba(0,0,0,0.11)', 'rgba(0,0,0,0.51)', 'rgba(0,0,0,0.81)']} style={{borderRadius: Platform.OS === 'ios' ? height * .5 : null, bottom: 0, flex: 1, left: 0, position: 'absolute', right: 0, top: 0}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  source={require('../camera3.png')}
                  style={{opacity: .85}}
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
  }
}

export default connect(mapStoreToProps)(UploadNewImage);