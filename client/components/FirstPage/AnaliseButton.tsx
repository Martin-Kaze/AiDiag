'use client'
import React from 'react'
import ButtonPushRoute from '../ForAllPage/ButtonPushRoute'
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';

const AnaliseButton = () => {
     const value = useSelector((val: RootState) => val.UserInputReducer.selections);
      const symparr = Object.keys(value);

  return (
    <ButtonPushRoute  classname="w-50 bg-emerald-700" route='/test' text='Analise' disabled={(symparr.length == 0) ? true : false}/>
  )
}

export default AnaliseButton