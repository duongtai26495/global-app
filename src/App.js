import React, { useEffect, useState } from 'react'
import Header from './components.js/Header'
import { DARK, DARKMODE } from './config/constants'
import { useStore } from './store'
import ResultContent from './components.js/ResultContent'
import bgBody from './assets/images/body-bg.png'
const App = () => {

  const [state, dispatch] = useStore()
  const { localDarkmode, page_loading } = state

  return (
    <main className={`h-full relative flex flex-col items-center min-h-screen ${localDarkmode == DARK ? "bg-zinc-800" : "bg-slate-100"}`} id='main'>
      <Header />
      <ResultContent />
      
    </main>
  )
}

export default App