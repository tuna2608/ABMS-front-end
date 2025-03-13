import React from 'react'
import { WrapperInputForm } from './style';

const InputForm = (props) => {
    const { placeholder = 'Nhap text', ...rests } = props;
  return (
    <WrapperInputForm placeholder={placeholder} value={props.value} {...rests} />
  )
}

export default InputForm
