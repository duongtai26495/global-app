import React from 'react'
import { useStore } from '../store'
import Gif404 from '../assets/images/404.gif'
import { DARK } from '../config/constants'
const Loading = ({gif, text}) => {

    const [state, dispatch] = useStore()
    const {result_nation, localDarkmode} = state

    return (
        <div className='w-full'>
        <p className={`w-full text-center m-auto font-bold text-xl ${localDarkmode == DARK ? "text-slate-50" : "text-zinc-900" }`}>{result_nation !== null ? "Welcome to Nationin4": "Not found !!!"}</p>
            <img className='m-auto' src={result_nation === null ? Gif404 : gif} />
        </div>
    )
}

export default Loading