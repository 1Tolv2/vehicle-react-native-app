import React from 'react'
import RegularText from './RegularText'

const ErrorText = ({children}) => {
  return (
    <RegularText color="red" margin="0px 0px 0px 5px">{children}</RegularText>
  )
}

export default ErrorText