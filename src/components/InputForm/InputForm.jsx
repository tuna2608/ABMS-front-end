import React, { useState } from 'react'
import { WrapperInputForm } from './style';

const InputForm = (props) => {
    const [valueInput,setValueInput] = useState();
    const { placeholder = 'Nhap text', ...rests } = props;
  return (
    <WrapperInputForm placeholder={placeholder} value={valueInput} {...rests}/>
  )
}

export default InputForm
