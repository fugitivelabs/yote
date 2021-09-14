
import React from 'react';
import PropTypes from 'prop-types'

import {
  ActivityIndicator
  , Text
  , View
} from 'react-native'; 

const ListItem = ({
  children
  , className = ''
}) => {

  return (
    <View>
      {children}
    </View>
  )
}

ListItem.propTypes = {
  className: PropTypes.string
}

export default ListItem