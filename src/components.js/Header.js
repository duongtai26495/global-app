import React, {memo} from 'react'
import SearchBar from './SearchBar'
import { useStore } from '../store'
import { DARK, LIGHT } from '../config/constants'

const Header = () => {
  const [state] = useStore()
  const { localDarkmode } = state
  return (
    <header className={`sticky z-50 top-0 w-full p-3 transition-all ${localDarkmode === DARK ? "bg-zinc-800" : "bg-slate-100"} `}>
      <div className={`w-full lg:max-w-5xl gap-2 m-auto flex flex-row items-center header-top rounded-lg ${localDarkmode === LIGHT ? " bg-slate-100" : "bg-zinc-800"}`}>
        <SearchBar />
      </div>
    </header>
  )
}

export default memo(Header)