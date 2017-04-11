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

// import global components
import Base from '../../../global/components/BaseComponent';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTButton from '../../../global/components/YTButton';
import YTCard from '../../../global/components/YTCard';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import actions
import * as singleActions from '../userActions.js';

// import libraries
import moment from 'moment';

// import styles
import YTColors from '../../../global/styles/YTColors';


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: YTColors.primaryHeader,
    // padding: 5
  },

  instructions: {
    textAlign: 'center',
    color: '#222',
    marginBottom: 5,
  },

  btnWrapper: {
    borderTopWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  linkOut: {
    // paddingTop: 10,
    flex: 1,
    // paddingBottom: 10,
    flexDirection: "row",
  },
  linkOutText: {

  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: YTColors.listSeparator,
  },
  statusBox: {
    // flex: 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'green'
  },
  details: {
    justifyContent: 'center',
    paddingVertical: 15,
    // paddingLeft: 17,
    // paddingRight: 9,
    flexDirection: 'row',
    flex: 1
  },
  titleSection: {
    // flexDirection: 'row',
    flex: 1,
    // alignItems: 'center',
    // backgroundColor: 'red'
  },
  info: {
    fontSize: 17,
    padding: 10,
  },
  editImage: {
    flex: 1, 
    flexDirection: 'row',
    padding: 2
  },
});


class Profile extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_openEditProfile'
      , '_openSettings'
      , '_closeModal'
      , '_handleLogout'
      , '_openPrivacy'
      , '_openTeam'
      , '_openFAQ'
      , '_openContact'
      , '_openImagePicker'
    )
  }

  _openEditProfile() {
    this.props.navigator.push({editProfile: true});
  }

  _openSettings() {
    this.props.navigator.push({settings: true});
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _handleLogout() {
    // console.log("_handleLogout firled");
    this.props.dispatch(singleActions.sendLogout());
  }

  _openPrivacy() {
    this.props.navigator.push({privacy: true});

  }
  _openTeam() {
    this.props.navigator.push({team: true});

  }
  _openFAQ() {
    this.props.navigator.push({faq: true});

  }

  _openContact() {
    var url = "erik@fugitivelabs.com";
    Linking.canOpenURL(url).then(supported => {
      if(supported) {

        Linking.openURL(url);
      } else {
        this.props.navigator.push({privacy: true});
      }
    })
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
      // newUser.info._profilePicObject = file._id;
      this.props.dispatch(singleUserActions.sendUpdateProfile(newUser)).then((action)=> {
        console.log(action);
      });

    });
  }

  render() {
    const { user } = this.props;

    const leftItem = {
      title: 'Close',
      onPress: () => this._closeModal(),
      icon: require('../../../global/img/settings.png'),
      // layout: "icon"
    };
    const rightItem = null;

    const rightArrow = require("../../../global/img/forward.png");
    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/skull-icon.png');

    

    return(

      <View style={[styles.container ]} >
        <YTHeader
          navigator={navigator}
          leftItem={leftItem}
          rightItem={rightItem}
          title="Account"
        />
        <ScrollView  >
          
          <YTCard
            header="Profile"
          >
            <View style={styles.editImage}>
              <Image
                style={{width: 200, height: 200}}
                source={profileImg}> 
              </Image>
            </View>
            <Text style={styles.info}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.info}>{user.username}</Text>

            <View style={styles.btnWrapper}>
              <YTButton
                type="secondary"
                caption={"Edit Profile"}
                onPress={this._openEditProfile}
                icon={require('../../../global/img/edit.png')}
              />
            </View>
          </YTCard>
          
          
          <YTButton
            type="secondary"
            caption="Logout"
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
