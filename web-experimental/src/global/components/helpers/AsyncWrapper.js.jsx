
import React from 'react'

// deals with fetch info supplied by query hooks and displays loading and error states if applicable.
// only renders children when the fetch is done.
const AsyncWrapper = ({
  children, // all children of this component
  // the rest of these are provided from the fetch object passed in (the one returned by the service)
  isError: dataError,
  isLoading,
  isFetching,
  refetch,
}) => {
  try {
    // there was an error fetching data
    if(dataError) return <div className={'error'}>Oops, there was an error accessing this data. {refetch && <button onClick={refetch}>Try again</button>}</div>
    // still waiting for data
    if(isLoading) return <div className={'loading'}>Loading...</div>
    // fetch is done. render children to display the fetched data
    return (
      <div className={isFetching ? 'opacity-50' : ''}>
        {children}
      </div>
    )
  } catch(childError) {
    // there was an error thrown by the children, but the app will not crash, it will display an error message instead.
    return <div className={'error'}>Oops, there was an error. {refetch && <button onClick={refetch}>Try again</button>}</div>
  }
}

export default AsyncWrapper;
