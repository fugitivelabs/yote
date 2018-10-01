/**
* User profile page displays current loggedIn user information
*/

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , Linking
  , ListView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TouchableOpacity
  , View
} from 'react-native'; 

import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation'

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import actions
import * as singleActions from '../userActions.js';

// import libraries
import moment from 'moment';

// import YTStyles
import YTColors from '../../../global/styles/YTColors';
import YTStyles from '../../../global/styles/YTStyles'; 

var styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1
    , borderColor: YTColors.listSeparator
  }
  , btnWrapper: {
      paddingTop: 10
    }
  , container: {
      flex: 1
      , backgroundColor: '#fff'
    }
  , details: {
      justifyContent: 'center'
      , paddingVertical: 15
      , flexDirection: 'row'
      , flex: 1
    }
  , editImage: {
      flex: 1
      , flexDirection: 'row'
      , padding: 2
    }
  , instructions: {
      color: YTColors.lightText
      , fontSize: 12
      , paddingVertical: 10
      , paddingHorizontal: 5
    }
  , infoWrapper: {
      flex: 1
      , flexDirection: 'row' 
      , paddingVertical: 5 
      , paddingHorizontal: 10
    }
  , labelBox: {
      flex: .2 
      , justifyContent: 'center'
      , paddingLeft: 10
    }
  , label: {
      fontSize: 15
      , fontWeight: '500'
    }
  , infoBox: {
      flex: .8 
      , justifyContent: 'center'
    }
  , info: {
      fontSize: 15
      , paddingVertical: 10
    }
  , linkOut: {
      flex: 1
      , flexDirection: "row"
    }
  , linkOutText: {

    }
  , statusBox: {
      justifyContent: 'center'
      , alignItems: 'flex-end'
    }
  , titleSection: {
      flex: 1
    }
});

class Profile extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_handleLogout'
      , '_openEditProfile'
      , '_openImagePicker'
    )
  }

  _openEditProfile() {
    this.props.navigation.navigate('UpdateProfile'); 
  }

  _closeModal() { 
    this.props.navigation.dispatch(NavigationActions.back()); 
  }

  _handleLogout() {
    this.props.dispatch(singleActions.sendLogout());
  }

  _openImagePicker() { 
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);
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
        let source;

        // You can display the image using either data...
        source = { uri: 'data:image/jpeg;base64,' + response.data };

        // Or a reference to the platform specific asset location
        if (Platform.OS === 'android') {
          source = { uri: response.uri };
        } else {
          source = { uri: response.uri.replace('file://', '') };
        }
        console.log(source); 
        this.setState({
          profilePicUrl: source
        });
        console.log(this.state.profilePicUrl); 
      }
      let newUser = JSON.parse(JSON.stringify(this.props.user));
      newUser.info.profilePicUrl = this.state.profilePicUrl.uri;
      this.props.dispatch(singleUserActions.sendUpdateProfile(newUser)).then((action)=> {
        console.log(action);
      });
    });
  }

  render() {
    const { user } = this.props;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    return(
      <View style={[YTStyles.container]}>
        <YTHeader
          title="Profile"
        />
        <ScrollView>
          <View>
            <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center',}}>
              <Image
                style={{width: 200, height: 200, borderRadius: 200 * .5, borderColor: YTColors.actionText, borderWidth: 4}}
                source={profileImg}> 
              </Image>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
              <Text style={YTStyles.h1}> {user.firstName} {user.lastName} </Text>
            </View>
            <Text style={[YTStyles.text, {fontSize: 16, padding: 5}]}>Personal Information: </Text>
            <View style={YTStyles.separator}/>
            <View>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15}}>
                <View style={{flex: 0.2}}>
                  <Text style={YTStyles.text}>Name: </Text>
                </View>
                <View style={{flex: 0.8}}>
                  <Text style={YTStyles.darkText}>{user.firstName} {user.lastName}</Text>
                </View>
              </View>
            </View>
            <View style={YTStyles.separator}/>
            <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15}}>
              <View style={{flex: 0.2}}>
                <Text style={YTStyles.text}>Email: </Text>
              </View>
              <View style={{flex: 0.8}}>
                <Text style={YTStyles.darkText}>{user.username}</Text>
              </View>
            </View>
            <View style={YTStyles.separator}/>
            <View style={YTStyles.btnWrapper}>
              <YTButton
                caption={"Edit Profile"}
                icon={require('../../../global/img/edit.png')}
                onPress={this._openEditProfile}
                type="secondary"
              />
            </View>
          </View>
          {user._id ? 
            <YTButton
              caption="Logout"
              captionStyle={{color: YTColors.danger}}
              onPress={this._handleLogout}
              type="secondary"
            />
          : null
          }
        </ScrollView>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    isFetching: store.user.loggedIn.isFetching
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(Profile);
