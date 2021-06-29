
import React from 'react'

// deals with fetch info supplied by query hooks and displays loading and error states if applicable.
// only renders children when the fetch is done.
const AsyncWrapper = ({
  children, // all children of this component
  // the rest of these are provided from the fetch object passed in (the one returned by the service)
  isError: dataError,
  fallback = (<Spinner/>),
  isLoading,
  isFetching,
  refetch,
}) => {
  try {
    // there was an error fetching data
    if(dataError) return <div className={'error'}>Oops, there was an error accessing this data. {refetch && <button onClick={refetch}>Try again</button>}</div>
    // still waiting for data
    if(isLoading) return fallback
    // fetch is done. render children to display the fetched data
    return children;
  } catch(childError) {
    // there was an error thrown by the children, but the app will not crash, it will display an error message instead.
    // Could somehow log this error or save it as a userEvent kind of thing. Could make it easier to track bugs over time.
    return <div className={'error'}>Oops, there was an error. {refetch && <button onClick={refetch}>Try again</button>}</div>
  }
}

const Spinner = () => {
  return (
    <div className='animate-spin rounded-full border-8 border-gray-200 h-20 w-20 mx-auto' style={{borderTopColor: "lightblue"}}/>
  )
}

export default AsyncWrapper;
