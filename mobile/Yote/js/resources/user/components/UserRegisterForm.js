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
import YTHeader from '../../../global/headers/YTHeader'; 

// import hooks
import { useFormState } from '../../../global/utils/customHooks';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const UserRegisterForm = ({
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

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  return (
    <View style={tw`flex-1`}>
      <YTHeader
        title='Register'
        leftItem={leftItem}
      />
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View style={tw`flex-1 flex-row justify-center pt-8`}>
          <Image
            resizeMode={"contain"}
            source={require('../../../global/img/logo.png')}
            style={{height: 250, width: 250, tintColor: 'blue'}}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
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
          <View style={tw`pt-4`}>
            <YTButton
              caption={"Submit"}
              isDisabled={null}
              onPress={handleSubmit}
              type="primary"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

UserRegisterForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired
  , user: PropTypes.object.isRequired
  , location: PropTypes.object
}

export default UserRegisterForm;
