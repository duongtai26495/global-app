import React from 'react'
import { useStore } from '../store'
import Gif404 from '../assets/images/404.gif'
import { DARK } from '../config/constants'
const Loading = ({ gif }) => {

    const [state] = useStore()
    const { result_nation, localDarkmode, page_loading } = state

    return (
        <div className='w-full lg:1/2'>
            <p className={`w-full text-center m-auto font-bold text-xl ${localDarkmode === DARK ? "text-slate-50" : "text-zinc-900"}`}>

                {
                    !page_loading
                        ? result_nation !== null
                            ? "Welcome to Nationin4"
                            : "Not found !!!"
                        : "Please wait..."
                }
            </p>
            <img className='m-auto w-2/3 lg:w-1/2 my-5' src={result_nation === null ? Gif404 : gif} />
        </div>
    )
}

export default Loading