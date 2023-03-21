import React from 'react'

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div style={{borderTopColor:"transparent"}} className="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"/>
    </div>
  )
}

export default Spinner;