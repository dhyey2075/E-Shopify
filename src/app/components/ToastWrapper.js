"use client"
import React from 'react'
import { ToastContainer } from 'react-toastify'

const ToastWrapper = ({children}) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  )
}

export default ToastWrapper