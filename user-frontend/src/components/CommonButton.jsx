import React, { Component } from 'react'

// This is the Common Button Component to use all over the site by passing the dynamic 
// properities.

const CommonButton = ({children,
    type="button",
    className="",
    bgColor = "",
    textColor = "",
    ...props
}) => {
  return <button className={`${className} ${bgColor} ${textColor}`}
  {...props} >
    {children}
  </button>
}

export default CommonButton