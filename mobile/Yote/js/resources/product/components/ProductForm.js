/**
 * Reusable stateless form component for Product
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

import {
  KeyboardAvoidingView
  , Platform
  , ScrollView
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTTextInput from '../../../global/inputs/YTTextInput';

// import styles
import tw from '../../../global/styles/tailwind/twrnc'; 

const ProductForm = ({
  disabled
  , formTitle
  , formType
  , handleFormChange
  , handleFormSubmit
  , product
}) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? "padding" : null}
      contentContainerStyle={tw`flex-1`}
      style={tw`flex-1 bg-white`}
    >
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled">
        <View>
          <View style={tw`p-2`}>
            <YTTextInput
              autoCorrect={true}
              isRequired={true}
              name="title"
              onChange={handleFormChange}
              placeholder="Title"
              returnKeyType="next"
              style={tw`p-2 text-lg border-b border-gray-100`}
              value={product.title || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.title')}
              // onSubmitEditing={(event) => {
              //   this.refs['product.description'].focus();
              // }}
              // ref="product.title"
            />
          </View>
          <View style={tw`h-1 border-b`}/>
          <View style={tw`p-2`}>
            <YTTextInput
              autoCorrect={true}
              isRequired={true}
              multiline={true}
              name="description"
              onChange={handleFormChange}
              onSubmitEditing={handleFormSubmit}
              placeholder="Write a description..."
              returnKeyType="go"
              style={[tw`p-2 text-lg border-b border-gray-100`]}
              value={product.description || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.description')}
              // ref="product.description"
            />
          </View>
        </View>
        <View style={tw`px-2 py-4`}>
          <YTButton
            caption={formType == "update" ? "Update product" : "Create new product"}
            isDisabled={disabled}
            onPress={handleFormSubmit}
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
  , handleFormChange: PropTypes.func.isRequired
  , handleFormSubmit: PropTypes.func.isRequired
  , product: PropTypes.object.isRequired
}

ProductForm.defaultProps = {
  disabled: false
  , formTitle: ''
}

export default ProductForm;
