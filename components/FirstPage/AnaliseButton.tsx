'use client'
import React, { useEffect } from 'react'
import ButtonPushRoute from '../ForAllPage/ButtonPushRoute'
import { useDispatch } from 'react-redux'
import { setSubList } from '@/state/slices/UserInputSlice'

const AnaliseButton = ({ feed }: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!feed?.length) return

    const channels = feed.map((x: any) => {
      const f = x?.feed
      if (!f) return null

      const entries = f.entry || []

      return {
        id: f['yt:channelId'],
        t: f.title, 
        u: f.author?.uri, 
        vc: entries.length, 

        lv: entries[0]
          ? {
              id: entries[0]['yt:videoId'],
              t: entries[0].title,
            }
          : null,
      }
    }).filter(Boolean)

    dispatch(setSubList(channels))
  }, [feed, dispatch])

  return (
    <ButtonPushRoute
      classname="w-50 bg-emerald-700 mx-auto my-2 justify-center self-center center"
      route="/test"
      text="Analise"
    />
  )
}

export default AnaliseButton