import React from 'react'
import HeaderComponent from '../../client/HeaderComponent/HeaderComponent'

const DefaultComponent = ({children}) => {
  return (
    <>
        <HeaderComponent/>
        {children}
    </>
  )
}

export default DefaultComponent
