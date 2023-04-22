import React from 'react'
import { useStore } from '../store'
import Gif404 from '../assets/images/404.gif'
const Loading = ({gif}) => {

    const [state, dispatch] = useStore()
    const {result_nation} = state

    return (
        <div className='w-full'>
            <img src={result_nation === null ? Gif404 : gif} />
        </div>
    )
}

export default Loading