// NOTE: this is the older version of WaitOn
// Leaving it here because pr0ductRTK depends on it, but going forward use WaitOn instead
import React from 'react'
import Button from '../base/Button';


// deals with fetch info supplied by query hooks and displays loading and error states if applicable.
// only renders children when the fetch is done.

const AsyncWrapper = ({
  children
  , isError: fetchError
  , isLoading
  , isFetching
  , isEmpty
  , refetch
}) => {

  try {
    // there was an error fetching data
    if(fetchError) return <div className={'error'}>Oops, there was an error accessing this data. {refetch && <Button onClick={refetch} size='sm'>Try again</Button>}</div>
    // still waiting for data
    if(isLoading) return <Spinner/>
    // fetch returned empty
    if(isEmpty) return <div>No data found</div>
    // fetch is done. render children to display the fetched data
    return <div className={`${isFetching ? 'opacity-50' : ''}`}>{children}</div>
    // return children;
  } catch(childError) {
    // debugging
    // console.log('Error in AsyncWrapper children ', childError);
    // there was an error thrown by the children, but the app will not crash, it will display an error message instead.
    // Could somehow log this error or save it as a userEvent kind of thing. Could make it easier to track bugs over time.
    return <div className={'error'}>Oops, there was an error. {refetch && <Button onClick={refetch} size='sm'>Try again</Button>}</div>
  }
}

const Spinner = () => {
  return (
    <div className='animate-spin rounded-full border-8 border-gray-200 h-20 w-20 mx-auto' style={{borderTopColor: "lightblue"}}/>
  )
}

export default AsyncWrapper;
