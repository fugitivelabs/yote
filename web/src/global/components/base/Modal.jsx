import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'

/**
 * A reusable modal component using the headlessui library
 */
const Modal = ({
  children = null
  , closeText = 'Cancel'
  , confirmText = 'Confirm'
  , handleClose
  , handleConfirm
  , isOpen = false
  , title = ''
}) => {
  // must have a close handler
  if(!handleClose) throw new Error('Modal requires a handleClose function');

  return (
    <Transition.Root show={isOpen} as={Fragment} onClose={() => {}}>
      <Dialog as="div" className="relative z-10">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative m-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5">
                  <div className="mt-3 text-center">
                    {title && (
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {title}
                      </Dialog.Title>
                    )}
                    <div className="mt-3">
                      {children}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex justify-between">
                  <button
                    type="button"
                    className="w-full mx-1"
                    onClick={handleClose}
                  >
                    {closeText}
                  </button>
                  {handleConfirm && (
                    <button
                      type="button"
                      className="w-full mx-1"
                      onClick={handleConfirm}
                    >
                      {confirmText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node)
    , PropTypes.node
  ]).isRequired
  , closeText: PropTypes.string
  , confirmText: PropTypes.string
  , handleClose: PropTypes.func.isRequired
  , handleConfirm: PropTypes.func
  , isOpen: PropTypes.bool
  , title: PropTypes.string
}

export default Modal;
