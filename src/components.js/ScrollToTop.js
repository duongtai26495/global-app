import React, { useEffect, useState } from 'react'
import { useStore } from '../store'
import { LIGHT } from '../config/constants'

const ScrollToTop = () => {

    const [state] = useStore()
    const { localDarkmode } = state

    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollY = window.scrollY; // or use document.documentElement.scrollTop
        if (scrollY > 200) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  

    const fillColor = localDarkmode !== LIGHT ? "#ffffff" : "#1e1e1e"
    return (
        <button onClick={() => { scrollToTop() }} className={`w-12 h-12 sticky scroll-to-top z-50 transition-all ${scrolled ? "block" : "hidden"}  bg-opacity-50 ${localDarkmode === LIGHT ? "bg-slate-200" : "bg-zinc-900"} rounded-full`}>
            <svg fill={fillColor} version="1.1" id="icons_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0"
                viewBox="0 0 128 128" >
                <g id="row2_1_">
                    <g id="_x34__3_">
                        <path className="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zM38.4 58.9V66c0 2.2 1.8 3.9 3.9 3.9l15.3-12.2v28.7c0 2.2 2.3 3.2 4.4 3.2h4c2.2 0 3.9-1.8 3.9-3.9V57.2l15.8 12.7c2.2 0 3.9-1.8 3.9-3.9v-7.1L64 32.2 38.4 58.9z" id="up" />
                    </g>
                </g>
            </svg>
        </button>
    )
}

export default ScrollToTop