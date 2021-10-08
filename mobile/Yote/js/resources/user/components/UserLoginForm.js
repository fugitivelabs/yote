// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  Alert
  , Dimensions
  , Image
  , Linking
  , Modal
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
  , Platform
} from 'react-native'; 
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton'; 

// import hooks
import { useFormState } from '../../../global/utils/customHooks';

// import styles
import YTStyles from '../../../global/styles/YTStyles'; 
import { tailwind } from '../../../global/styles/tailwind/tailwind'; 


const UserLoginForm = ({
  handleFormSubmit
  , user
}) => {
  // get route state. Below is equivalent to getting navigation obj to access params
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation(); 

  const [updatedUser, handleChange] = useFormState(user); // pass user as initialState
  
  const handleSubmit = (e) => {
    handleFormSubmit(updatedUser)
  }

  return (
    <View style={YTStyles.container}>
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 50}}>
          <Image
            resizeMode={"contain"}
            source={require('../../../global/img/logo.png')}
            style={{height: 250, width: 250, tintColor: YTStyles.colors.secondary}}
          />
        </View>
        <View style={tailwind('px-4')}>
          <View style={YTStyles.inputWrapper}>
            <View style={YTStyles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                clearButtonMode="while-editing"
                isRequired={true}
                keyboardType="email-address"
                onChange={ (e) => handleChange(e, "username") }
                // onSubmitEditing={(event) => {
                //   this.refs['password'].focus();
                // }}
                placeholder="Email"
                // ref="username"
                returnKeyType="next"
                style={tailwind('text-base font-normal text-black p-5')}
                value={updatedUser.username}
              />
            </View>
            <View style={YTStyles.inputContainer}>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                autoFocus={false}
                clearButtonMode="while-editing"
                isRequired={true}
                onChange={ (e) => handleChange(e, "password") }
                onSubmitEditing={null}
                placeholder="Password"
                // ref="password"
                returnKeyType="go"
                secureTextEntry={true}
                style={tailwind('text-base font-normal text-black p-5')}
                value={updatedUser.password}
              />
            </View>
          </View>
          <View style={tailwind('pt-4 mb-2')}>
            <YTButton
              caption={"Login"}
              isDisabled={null}
              onPress={handleSubmit}
              type="primary"
            />
          </View>
          <View style={tailwind('py-2')}>
            <YTButton
              caption={"Register"}
              isDisabled={null}
              onPress={() => navigation.navigate('UserRegister')}
              type="primary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

UserLoginForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserLoginForm;
