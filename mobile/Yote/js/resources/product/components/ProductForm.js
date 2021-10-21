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
import YTStyles from '../../../global/styles/YTStyles';

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
      contentContainerStyle={{flex: 1}}
      style={YTStyles.container}
    >
      <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled" style={[YTStyles.formWrapper]}>
        <View>
          <View style={{padding: 5}}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              onChange={(e) => handleChange(e, 'title')}
              placeholder="Title"
              placeholderTextColor={YTStyles.colors.accentText}
              returnKeyType="next"
              style={YTStyles.input}
              value={updatedProduct.title || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.title')}
              // onSubmitEditing={(event) => {
              //   this.refs['product.description'].focus();
              // }}
              // ref="product.title"
            />
          </View>
          <View style={YTStyles.separator}/>
          <View style={{padding: 5}}>
            <TextInput
              autoCorrect={true}
              isRequired={true}
              multiline={true}
              onChange={(e) => handleChange(e, 'description')}
              onSubmitEditing={handleFormSubmit}
              placeholder="Write a description..."
              placeholderTextColor={YTStyles.colors.accentText}
              returnKeyType="go"
              style={[YTStyles.input, {minHeight: 90}]}
              value={updatedProduct.description || ""}
              // onFocus={ (e) => this._scrollToInput(e, 'product.description')}
              // ref="product.description"
            />
          </View>
          <View style={YTStyles.separator}/>
        </View>
        <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
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
