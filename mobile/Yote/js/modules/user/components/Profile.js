/**
* User profile page displays current loggedIn user information
*/

// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ImagePicker from 'react-native-image-picker';
import Linking from 'Linking';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';
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

// import styles
import userStyles from '../userStyles'; 
import YTColors from '../../../global/styles/YTColors';

var styles = StyleSheet.create({
  bottomBorder: {
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
      // fontStyle: 'italic', 
      fontSize: 12,
      color: YTColors.lightText,
      paddingVertical: 10,
      paddingHorizontal: 5
    }
  , infoWrapper: {
      flex: 1, 
      flexDirection: 'row', 
      paddingVertical: 5, 
      paddingHorizontal: 10
    }
  , labelBox: {
      flex: .2, 
      justifyContent: 'center',
      paddingLeft: 10,
    }
  , label: {
      fontSize: 15,
      fontWeight: '500', 
      // flex: .2,
    }
  , infoBox: {
      flex: .8, 
      justifyContent: 'center',
    }
  , info: {
      fontSize: 15,
      paddingVertical: 10,
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
      '_openEditProfile'
      , '_closeModal'
      , '_handleLogout'
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
    const rightItem = {
      icon: require('../../../global/img/delete.png'),
      layout: "icon", 
      onPress: () => this._closeModal()
    };

    const rightArrow = require("../../../global/img/forward.png");

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    return(
      <View style={[styles.container ]}>
        <YTHeader
          title="Profile"
          rightItem={rightItem}
        />
        <ScrollView>
          <View>
            <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center',}}>
              <Image
                style={{width: 250, height: 250, borderRadius: 250 * .5, borderColor: YTColors.actionText, borderWidth: 4}}
                source={profileImg}> 
              </Image>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
              <Text style={{fontSize: 35, fontWeight: '500'}}> {user.firstName} {user.lastName} </Text>
            </View>
            <Text style={styles.instructions}>Personal Information: </Text>
            <View style={styles.bottomBorder}/>
            <View>
              <View style={styles.infoWrapper}>
                <View style={styles.labelBox}>
                  <Text style={styles.label}>Name: </Text>
                </View>
                <View style={styles.infoBox}>
                  <Text style={styles.info}>{user.firstName} {user.lastName}</Text>
                </View>
              </View>
            </View>
            <View style={styles.bottomBorder}/>
            <View style={styles.infoWrapper}>
              <View style={styles.labelBox}>
                <Text style={styles.label}>Email: </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.info}>{user.username}</Text>
              </View>
            </View>
            <View style={styles.bottomBorder}/>
            <View style={styles.btnWrapper}>
              <YTButton
                type="secondary"
                caption={"Edit Profile"}
                onPress={this._openEditProfile}
                icon={require('../../../global/img/edit.png')}
              />
            </View>
          </View>
          <YTButton
            type="secondary"
            caption="Logout"
            captionStyle={{color: YTColors.danger}}
            onPress={this._handleLogout}
          />
        </ScrollView>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    user: store.user.loggedIn.user,
    isFetching: store.user.loggedIn.isFetching,
  }
}

export default connect(mapStoreToProps)(Profile);
