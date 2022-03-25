/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  ActivityIndicator
  , Alert
  , Image
  , KeyboardAvoidingView
  , Platform
  , ScrollView
  , StyleSheet
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';

// hooks
import { useFormState } from '../../../global/utils/customHooks';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const ProductForm = ({
  disabled
  , formTitle
  , formType
  , handleFormSubmit
  , product
}) => {

  // use the helper to handle product state
  const [updatedProduct, handleChange] = useFormState(product); // pass product as initialState

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : null}
      contentContainerStyle={tw`flex-1`}
      style={tw`flex-1 bg-white`}
    >
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View>
          <View style={tw`p-2`}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              onChange={(e) => handleChange(e, 'title')}
              placeholder="Title"
              returnKeyType="next"
              style={tw`p-2 text-lg border-b border-gray-100`}
              value={updatedProduct.title || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.title')}
              // onSubmitEditing={(event) => {
              //   this.refs['product.description'].focus();
              // }}
              // ref="product.title"
            />
          </View>
          <View style={tw`h-1 border-b`}/>
          <View style={tw`p-2`}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              multiline={true}
              onChange={(e) => handleChange(e, 'description')}
              onSubmitEditing={handleFormSubmit}
              placeholder="Write a description..."
              returnKeyType="go"
              style={[tw`p-2 text-lg border-b border-gray-100`]}
              value={updatedProduct.description || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.description')}
              // ref="product.description"
            />
          </View>
        </View>
        <View style={tw`px-2 py-4`}>
          <YTButton
            caption={formType == "update" ? "Update product" : "Create new product"}
            isDisabled={disabled}
            onPress={() => handleFormSubmit(updatedProduct)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

ProductForm.propTypes = {
  disabled: PropTypes.bool
  , formTitle: PropTypes.string
  , formType: PropTypes.string.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default ProductForm;
