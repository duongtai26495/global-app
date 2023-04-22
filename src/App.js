import React, { useEffect, useState } from 'react'
import Header from './components.js/Header'
import { APP_NAME, DARK, DARKMODE, SLOGAN } from './config/constants'
import { useStore } from './store'
import ResultContent from './components.js/ResultContent'
import ScrollToTop from './components.js/ScrollToTop'
const App = () => {

  const [state, dispatch] = useStore()
  const { localDarkmode, page_loading, result_nation } = state

  const nation = result_nation

  if(!nation?.length > 0){
    document.title = APP_NAME + " - " + SLOGAN
  }else{
    let name = nation[0].name.official
    document.title = APP_NAME + " - " + name
  }
  
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (

    <main className={`h-full relative min-h-screen ${localDarkmode == DARK ? "bg-zinc-800" : "bg-slate-100"}`} id='main'>
      <div className={`w-full lg:max-w-5xl m-auto `}>
        <Header />
        <ResultContent />
      </div>
      <ScrollToTop />
    </main>
  )
}

export default App