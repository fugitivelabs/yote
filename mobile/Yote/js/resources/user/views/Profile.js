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

import { NavigationActions } from 'react-navigation'

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import actions
import * as singleActions from '../userActions.js';

// import libraries
import moment from 'moment';

// import styles
import userStyles from '../userStyles'; 
import YTStyles from '../../../global/styles/YTStyles'; 

var styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1
    , borderColor: YTStyles.colors.listSeparator
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
      color: YTStyles.colors.lightText
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

class Profile extends Binder {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_handleLogout'
      , '_openEditProfile'
    )
  }

  _openEditProfile() {
    this.props.navigation.navigate('UpdateProfile'); 
  }

  _closeModal() { 
    this.props.navigation.dispatch(NavigationActions.back()); 
  }

  _handleLogout() {
    this.props.dispatch(singleActions.sendLogout()).then((res) => {
      if(res.success) {
        this.props.navigation.navigate('Auth'); 
      }
    })
  }

  render() {
    const { apiToken, user } = this.props;

    const profileImg = user && user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/default.png');

    return(
      <View style={[YTStyles.container]}>
        <YTHeader
          title="Profile"
        />
        {user && apiToken ?
          <ScrollView>
            <View>
              <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center',}}>
                <Image
                  style={{width: 200, height: 200, borderRadius: 200 * .5, borderColor: YTStyles.colors.primary, borderWidth: 4}}
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
                    <Text style={YTStyles.text}>{user.firstName} {user.lastName}</Text>
                  </View>
                </View>
              </View>
              <View style={YTStyles.separator}/>
              <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15}}>
                <View style={{flex: 0.2}}>
                  <Text style={YTStyles.text}>Email: </Text>
                </View>
                <View style={{flex: 0.8}}>
                  <Text style={YTStyles.text}>{user.username}</Text>
                </View>
              </View>
              <View style={YTStyles.separator}/>
              <View style={YTStyles.btnWrapper}>
                <YTButton
                  caption={"Edit Profile"}
                  // icon={require('../../../global/img/edit.png')}
                  onPress={this._openEditProfile}
                  type="secondary"
                />
              </View>
              <YTButton
                caption="Logout"
                captionStyle={{color: YTStyles.colors.danger}}
                onPress={this._handleLogout}
                type="secondary"
              />
            </View>
          </ScrollView>
        : 
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={YTStyles.text}>Enable Login and Sign In</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={YTStyles.text}>js/App.js</Text>
            </View>
          </View>
        }
      </View>
    )
  }
}

const mapStoreToProps = (store) => {
  return {
    apiToken: store.user.loggedIn.apiToken
    , isFetching: store.user.loggedIn.isFetching
    , user: store.user.loggedIn.user
  }
}

export default connect(mapStoreToProps)(Profile);