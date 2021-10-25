/**
 * Dropdown list component for notifications
 */
// import primary libraries
import React, { useState } from 'react'

import { BellIcon } from '@heroicons/react/solid'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'
import CloseWrapper from '../../../global/components/helpers/CloseWrapper'

// import resource components
import NotificationListItem from './NotificationListItem.jsx'

// import services
import { useStreamingNotificationList } from '../notificationService'

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  // init the stream and get the notification list
  const { data, ids, sendDismissNotification, ...notificationQuery } = useStreamingNotificationList({init: true});

  const closeAndDismiss = (id) => {
    console.log('closing!', id);
    setIsOpen(false);
    sendDismissNotification(id);
  }

  return (
    <>
      <BellIcon className="h-5 w-5 cursor-pointer mx-2" onClick={() => setIsOpen(true)}/>
      <CloseWrapper isOpen={isOpen} closeAction={() => setIsOpen(false)}/>
      { isOpen ?
        <div className="relative">
          <div className="absolute top-3 right-0 max-h-60 w-52 overflow-scroll z-50 bg-white p-2">
            <ul
              className={`${notificationQuery.isFetching ? 'opacity-50' : ''}`}
            >
              <WaitOn query={notificationQuery} fallback={<Skeleton />}>
                {ids?.map(notificationId => <NotificationListItem key={notificationId} id={notificationId} handleClick={() => closeAndDismiss(notificationId)} />)}
              </WaitOn>
            </ul>
          </div>
        </div>
        :
        null
      }
    </>
  )
}

const Skeleton = ({ count = 5 }) => {
  const items = new Array(count).fill('some-non-empty-value')
  return items.map(() => <NotificationListItem.Skeleton key={Math.random()}/>)
}


export default NotificationDropdown

