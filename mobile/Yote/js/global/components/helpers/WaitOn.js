
import React from 'react'

import {
  ActivityIndicator
  , Image
  , Platform
  , Text
  , View
} from 'react-native';
import YTButton from '../../buttons/YTButton';

// deals with fetch info supplied by query hooks and displays loading and error states if applicable.
// only renders children when the fetch is done.
const WaitOn = ({
  fallback = (<ActivityIndicator/>)
  , query
  , children
}) => {

  const {
    isError: fetchError
    , isLoading
    // , isFetching
    , isEmpty
    , refetch
  } = query;

  try {
    // there was an error fetching data
    if(fetchError) return <Text> Oops, there was an error accessing this data. {refetch && <YTButton onPress={refetch} >Try again</YTButton>}</Text>
    // still waiting for data
    if(isLoading) return fallback
    // fetch returned empty
    if(isEmpty) return <Text>No data found</Text>
    // fetch is done. render children to display the fetched data
    return children;
  } catch(childError) {
    // debugging
    // console.log('Error in WaitOn children ', childError);
    // there was an error thrown by the children, but the app will not crash, it will display an error message instead.
    // Could somehow log this error or save it as a userEvent kind of thing. Could make it easier to track bugs over time.
    return <Text> Oops, there was an error. {refetch && <YTButton onPress={refetch}>Try again</YTButton>}</Text>
  }
}


export default WaitOn;
