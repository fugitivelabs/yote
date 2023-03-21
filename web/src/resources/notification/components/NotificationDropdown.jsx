/**
 * Dropdown list component for notifications
 */
// import primary libraries
import React, { useState } from 'react'
import PropTypes from 'prop-types'

// import components
// heroicons/react is a library of SVG icons from the tailwindcss/heroicons project, which is licensed under the MIT license
// https://github.com/tailwindlabs/heroicons#react
import { BellIcon } from '@heroicons/react/solid'

// import global components
import WaitOn from '../../../global/components/helpers/WaitOn'
import CloseWrapper from '../../../global/components/helpers/CloseWrapper'

// import resource components
import NotificationListItem from './NotificationListItem.jsx'

// import services
import { useStreamingNotificationList } from '../notificationService'

const NotificationDropdown = ({ classes = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  // init the stream and get the notification list
  const { data, ids, sendDismissNotifications, ...notificationQuery } = useStreamingNotificationList({ init: true });

  const closeAndDismiss = (id) => {
    setIsOpen(false);
    // only update the notification if unread
    const unreadNotification = data.filter(notification => notification.unread && notification._id === id)[0];
    if(unreadNotification) {
      sendDismissNotifications([id]);
    }
  }

  const dismissAll = () => {
    setIsOpen(false);
    // only update the notifications if unread
    const unreadNotificationIds = data.filter(notification => notification.unread).map(notification => notification._id);
    if(unreadNotificationIds.length > 0) {
      sendDismissNotifications(unreadNotificationIds);
    }
  }

  const unreadCount = data && data.filter(notification => notification.unread).length;

  return (
    <>
      <span className={`cursor-pointer text-gray-400 ${unreadCount ? 'text-blue-700' : ''} ${classes}`} onClick={() => setIsOpen(!isOpen)}>
        <BellIcon className={`h-5 w-5 align-middle `} />
      </span>
      <CloseWrapper isOpen={isOpen} closeAction={() => setIsOpen(false)} />
      {isOpen ?
        <div className='relative'>
          <div className='absolute top-3 right-0 max-h-60 w-52 overflow-scroll z-50 bg-white p-2 shadow-md'>
            <ul
              className={`${notificationQuery.isFetching ? 'opacity-50' : ''}`}
            >
              <WaitOn query={notificationQuery} fallback={<Skeleton />} empty={
                <li className={`list-none p-2 block`}>
                  <span className="text-gray-400">No notifications</span>
                </li>
              }>
                {ids?.map(id => <NotificationListItem key={id} id={id} handleClick={() => closeAndDismiss(id)} />)}
              </WaitOn>
            </ul>
          </div>
          {unreadCount ?
            <button
              className='absolute bottom-0 right-10 z-50'
              onClick={dismissAll}
            >
              Dismiss All
            </button>
            :
            null
          }
        </div>
        :
        null
      }
    </>
  )
}

const Skeleton = ({ count = 10 }) => {
  const items = new Array(count).fill('notification-list-item-skeleton');
  return items.map((name, index) => <NotificationListItem.Skeleton key={`${name} ${index}`} />)
}

NotificationDropdown.propTypes = {
  classes: PropTypes.string
}


export default NotificationDropdown

