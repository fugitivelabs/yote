
import React from 'react'

import {
  ActivityIndicator
  , Image
  , Platform
  , Text
  , View
} from 'react-native';

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc';


import YTButton from '../../buttons/YTButton';

// deals with fetch info supplied by query hooks and displays loading and error states if applicable.
// only renders children when the fetch is done.
const WaitOn = ({
  fallback = (<ActivityIndicator />)
  , query
  , children
}) => {

  const {
    isError: fetchError
    , error
    , isLoading
    // , isFetching
    , isEmpty
    , refetch
  } = query;

  try {
    if(!query) return null;
    // there was an error fetching data
    if(fetchError) return (
      <View style={tw`flex flex-col items-center my-auto`}>
        <Text style={tw`text-center text-lg p-4`}>
          {error || "Oops, there was an error accessing this data."}
        </Text>
        <YTButton
          onPress={refetch}
          type='secondary'
          caption='Try again'
        />
      </View>
    )
    // still waiting for data
    if(isLoading) return fallback;
    // fetch returned empty
    if(isEmpty) return <Text style={tw`text-center text-lg p-4 my-auto`}>No data found</Text>
    // fetch is done. render children to display the fetched data
    return children || null;
  } catch(childError) {
    // debugging
    // console.log('Error in WaitOn children ', childError);
    // there was an error thrown by the children, but the app will not crash, it will display an error message instead.
    return (
      <View style={tw`flex flex-col items-center my-auto`}>
        <Text style={tw`text-center text-lg p-4`}>
          Oops, there was an error.
        </Text>
        <YTButton
          onPress={refetch}
          type='secondary'
          caption='Try again'
        />
      </View>
    )
  }
}


export default WaitOn;
