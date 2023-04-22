import React, { useEffect } from 'react'
import night from '../assets/images/night-mode.png'
import light from '../assets/images/light-mode.png'
import { useStore } from '../store'
import { changeDarkMode } from '../store/actions'
import { DARK, DARKMODE, LIGHT } from '../config/constants'

const DarkModeSwitch = () => {

    const [state, dispatch] = useStore()
    const { localDarkmode } = state

    const switchDarkMode = () => {
      if(localDarkmode == LIGHT){
        dispatch(changeDarkMode(DARK))
        localStorage.setItem(DARKMODE, DARK)
      }
      else{
        dispatch(changeDarkMode(LIGHT))  
        localStorage.setItem(DARKMODE, LIGHT)
      }
    }

    return (
        <div className='w-fit rounded'>
            <img onClick={() => switchDarkMode()} src={localDarkmode == DARK ? light : night} className={`w-12 h-10 object-contain rounded ${localDarkmode === LIGHT ? "light-box-effect" : "dark-box-effect"}`} />
        </div>
    )
}

export default DarkModeSwitch