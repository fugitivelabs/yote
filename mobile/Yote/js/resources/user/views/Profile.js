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

import { useDispatch } from 'react-redux';

import { useGetLoggedInUser } from '../authService';
import { sendLogout } from '../authStore';

// import libraries

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 


const UserProfile = () => {
  const dispatch = useDispatch();

  // use the hook to get the loggedInUser from the authStore
  const { loggedInUser, ...authQuery } = useGetLoggedInUser();

  const handleLogout = async () => {
    const { response } = await dispatch(sendLogout());
    // history.push("/");
  }
  return (
    <View style={[YTStyles.container]}>
      <YTHeader
        title="Profile"
      />
      <Text>My profile</Text>
      <Text>{loggedInUser.username}</Text>
      <YTButton
        caption="Logout"
        captionStyle={{color: YTStyles.colors.danger}}
        onPress={handleLogout}
        type="secondary"
      />
    </View>
  )
}

export default UserProfile


  

// return(
//   <View style={[YTStyles.container]}>
//     <YTHeader
//       title="Profile"
//     />
//     {user && apiToken ?
//       <ScrollView>
//         <View>
//           <View style={{flex: 1, alignItems: 'center', padding: 20, justifyContent: 'center',}}>
//             <Image
//               style={{width: 200, height: 200, borderRadius: 200 * .5, borderColor: YTStyles.colors.primary, borderWidth: 4}}
//               source={profileImg}> 
//             </Image>
//           </View>
//           <View style={{flexDirection: 'row', justifyContent: 'center', paddingBottom: 20}}>
//             <Text style={YTStyles.h1}> {user.firstName} {user.lastName} </Text>
//           </View>
//           <Text style={[YTStyles.text, {fontSize: 16, padding: 5}]}>Personal Information: </Text>
//           <View style={YTStyles.separator}/>
//           <View>
//             <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15}}>
//               <View style={{flex: 0.2}}>
//                 <Text style={YTStyles.text}>Name: </Text>
//               </View>
//               <View style={{flex: 0.8}}>
//                 <Text style={YTStyles.text}>{user.firstName} {user.lastName}</Text>
//               </View>
//             </View>
//           </View>
//           <View style={YTStyles.separator}/>
//           <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 15}}>
//             <View style={{flex: 0.2}}>
//               <Text style={YTStyles.text}>Email: </Text>
//             </View>
//             <View style={{flex: 0.8}}>
//               <Text style={YTStyles.text}>{user.username}</Text>
//             </View>
//           </View>
//           <View style={YTStyles.separator}/>
//           <View style={YTStyles.btnWrapper}>
//             <YTButton
//               caption={"Edit Profile"}
//               // icon={require('../../../global/img/edit.png')}
//               onPress={this._openEditProfile}
//               type="secondary"
//             />
//           </View>
//           <YTButton
//             caption="Logout"
//             captionStyle={{color: YTStyles.colors.danger}}
//             onPress={this._handleLogout}
//             type="secondary"
//           />
//         </View>
//       </ScrollView>
//     : 
//       <View style={{flex: 1, justifyContent: 'center'}}>
//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           <Text style={YTStyles.text}>Enable Login and Sign In</Text>
//         </View>
//         <View style={{flexDirection: 'row', justifyContent: 'center'}}>
//           <Text style={YTStyles.text}>js/App.js</Text>
//         </View>
//       </View>
//     }
//   </View>
// )