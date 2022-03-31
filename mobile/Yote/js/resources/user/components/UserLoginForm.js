// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc'; 

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
    <View style={tw`flex-1`}>
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View style={tw`flex-1 flex-row justify-center py-8 bg-red-500`}>
          <Image
            resizeMode={"contain"}
            source={require('../../../global/img/logo.png')}
            style={tw`w-full`}
          />
        </View>
        <View style={tw`p-4`}>
          <View>
            <View style={tw`mb-4`}>
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
                style={tw`p-2 text-lg border-b border-gray-100`}
                value={updatedUser.username}
              />
            </View>
            <View style={tw`mb-4`}>
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
                style={tw`p-2 text-lg border-b border-gray-100`}
                value={updatedUser.password}
              />
            </View>
          </View>
          <View style={tw`mb-4`}>
            <YTButton
              caption={"Login"}
              isDisabled={null}
              onPress={handleSubmit}
              type="primary"
            />
          </View>
          <View style={tw`px-2 py-4`}>
            <YTButton
              caption={"Register"}
              isDisabled={null}
              onPress={() => navigation.navigate('UserRegister')}
              type="bordered"
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
