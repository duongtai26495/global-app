import React, { useEffect, useState } from 'react'
import Header from './components.js/Header'
import { DARK, DARKMODE } from './config/constants'
import { useStore } from './store'
import ResultContent from './components.js/ResultContent'
import Loading from './components.js/Loading'
const App = () => {

  const [state, dispatch] = useStore()
  const { localDarkmode, page_loading } = state

  return (
    <main className={`h-full min-h-screen ${localDarkmode == DARK ? "bg-zinc-800" : "bg-slate-100"}`} id='main'>
      <Header />
      <ResultContent />
    </main>
  )
}

export default App