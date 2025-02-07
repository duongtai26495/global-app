import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../store'
import { CAPITAL_PLACEHOLDER, CODE_PLACCEHOLDER, DARK, ISFULLTEXT, LIGHT, NAME_PLACEHOLDER, PAGE, RESULT_NATION, SEARCHBY } from '../config/constants'
import { getDataNation } from '../config/api'
import { updateLoading, updateResult } from '../store/actions'
import DarkModeSwitch from './DarkModeSwitch'

const SearchBar = () => {

    const [state, dispatch] = useStore()
    const { localDarkmode } = state
    const inputRef = useRef()
    const [keyword, setKeyword] = useState("")
    const [isFullText, setFullText] = useState(JSON.parse(localStorage.getItem(ISFULLTEXT)) ?? false)
    const fill_value = localDarkmode === DARK ? "#fafafa" : "#202020"
    const [type, setType] = useState(localStorage.getItem(SEARCHBY) ?? "name")
    const [scrolled, setScrolled] = useState(false)
    const handleSearch = async () => {
        if (keyword !== "") {
            dispatch(updateLoading(true))
            dispatch(updateResult([]))
            localStorage.removeItem(RESULT_NATION)
            localStorage.setItem(ISFULLTEXT, isFullText)
            localStorage.setItem(PAGE, 1)
            const result = await getDataNation(keyword.toLocaleLowerCase(), type, isFullText)
            if (result.status === 200) {
                const data = result.data
                localStorage.setItem(RESULT_NATION, JSON.stringify(data))
                dispatch(updateResult(data))
            }
            else if (result.status === 404) {
                dispatch(updateResult(null))
            }
            dispatch(updateLoading(false))
        } else {
            setKeyword("")
            dispatch(updateResult([]))
            localStorage.removeItem(RESULT_NATION)
        }
    }

    const SelectType = () => {

        return (
            <select value={type} onChange={e => {
                setType(e.target.value)
                localStorage.setItem(SEARCHBY, e.target.value)
            }} className={`h-10 justify-center flex flex-row items-center ${localDarkmode === LIGHT ? "bg-zinc-100 text-slate-950 in-box-effect" : "out-box-effect bg-zinc-800 text-slate-100"}`}>
                <option hidden className={`text-center ${localDarkmode === DARK ? "text-slate-100" : "text-slate-950"} `} >Search by</option>
                <option className={`text-center ${localDarkmode === DARK ? "text-slate-100" : "text-slate-950"} `} value={"name"}>name</option>
                <option className={`text-center ${localDarkmode === DARK ? "text-slate-100" : "text-slate-950"} `} value={"code"}>code</option>
                <option className={`text-center ${localDarkmode === DARK ? "text-slate-100" : "text-slate-950"} `} value={"capital"}>capital</option>

            </select>
        )
    }

    const handleOnChange = (value) => {
        setKeyword(value)
        if (value === "") {
            handleClear()
        }
    }

    const handleClear = () => {
        setKeyword("")
        dispatch(updateResult([]))
        localStorage.removeItem(RESULT_NATION)
        inputRef.current.focus()
    }

    const handleEnterPress = (event) => {
        if (event.keyCode === 13) {
            handleSearch()
        }
    };


    const SearchFullText = () => {
        return (
            <>
                <input className={`hidden`} id='fullText' type={'checkbox'} checked={isFullText}
                    onChange={(e) => {
                        localStorage.setItem(ISFULLTEXT, JSON.stringify(e.target.checked))
                        setFullText(e.target.checked)
                    }} />
                <label className={` p-1 text-sm ${localDarkmode === LIGHT ? "text-black" : "text-white"} `} htmlFor='fullText'>Full name</label>
            </>
        )
    }

    const ReturnPlaceHolder = (type) => {
        switch (type) {
            case "name":
                return NAME_PLACEHOLDER
            case "code":
                return CODE_PLACCEHOLDER
            case "capital":
                return CAPITAL_PLACEHOLDER
            default:
                setType("name")
                return NAME_PLACEHOLDER
        }
    }

   

    useEffect(() => {
        const ScrollCheck = () => {
            const scrollY = window.scrollY; // or use document.documentElement.scrollTop
            if (scrollY >= 70) {
              setScrolled(true);
            } else {
              setScrolled(false);
            }
        }
    
        window.addEventListener("scroll", ScrollCheck);
      }, []);

    return (
        <div className={`bg-transparent transition-all w-full flex flex-col gap-2`}>
            <div className='w-full flex flex-row items-center relative gap-2'>

                <div className={`w-full flex flex-1 relative items-center`}>
                    <input value={keyword}
                        ref={inputRef}
                        autoFocus={true}
                        onKeyDown={handleEnterPress}
                        onChange={(e) => { handleOnChange(e.target.value) }}
                        className={`w-full flex-1 bg-transparent h-10 px-2 ${localDarkmode === DARK ? "text-white dark-input-effect" : "text-black light-input-effect"}`}
                        placeholder={ReturnPlaceHolder(type)} />

                    <p onClick={() => handleClear()} className={`absolute border rounded-full p-1 right-2 ${localDarkmode === LIGHT ? "text-black" : "text-white"} ${keyword !== "" ? "block" : "hidden"}`}>
                        <svg fill={fill_value} className={`w-3 h-3 `} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460.775 460.775" ><path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" /></svg>
                    </p>
                </div>
                <button onClick={() => handleSearch()} className={`w-fit flex flex-row gap-1 items-center p-1 ${localDarkmode === LIGHT ? "light-box-effect" : "dark-box-effect"} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414" clipRule="evenodd" viewBox="0 0 32 32" className='w-8 h-8'><rect width="32" height="32" fill="none"></rect><path fillRule="nonzero" d="M17.643,18.899c-1.537,1.213 -3.464,1.94 -5.427,1.982c-2.988,0.064 -5.962,-1.451 -7.661,-3.96c-1.092,-1.615 -1.647,-3.588 -1.543,-5.537c0.154,-2.874 1.762,-5.623 4.221,-7.167c0.43,-0.27 0.979,-0.408 1.386,-0.098c0.539,0.409 0.466,1.328 -0.176,1.707c-2.103,1.261 -3.46,3.657 -3.438,6.099c0.031,3.472 2.939,6.722 6.604,6.941c3.036,0.182 6.083,-1.797 7.074,-4.8c0.934,-2.831 -0.17,-6.219 -2.626,-7.947c-0.672,-0.472 -1.425,-0.82 -2.222,-1.036c0,0 -0.808,-0.393 -0.734,-1.075c0.048,-0.444 0.424,-0.83 0.869,-0.887c0.15,-0.019 0.187,-0.005 0.235,-0.002c0.293,0.043 0.582,0.15 0.868,0.252c2.392,0.857 4.381,2.782 5.327,5.148c1.072,2.68 0.761,5.868 -0.841,8.301c-0.152,0.232 -0.316,0.455 -0.49,0.671l1.448,1.447c0.391,-0.185 0.822,-0.288 1.259,-0.295c0.036,-0.001 0.036,-0.001 0.072,0c0.765,0.013 1.506,0.318 2.061,0.853c1.425,1.407 2.832,2.832 4.249,4.248c1.156,1.171 1.133,3.306 -0.138,4.428c-1.08,0.955 -2.866,0.965 -3.958,-0.024c-0.027,-0.025 -0.054,-0.05 -0.081,-0.076c-1.441,-1.423 -2.865,-2.865 -4.298,-4.298c-0.865,-0.875 -1.064,-2.287 -0.57,-3.405l-1.47,-1.47Zm4.156,1.748c-0.775,0.014 -1.302,1.083 -0.705,1.703c1.42,1.438 2.849,2.867 4.287,4.287c0.472,0.454 1.401,0.256 1.614,-0.435c0.11,-0.356 0.014,-0.762 -0.248,-1.033c-1.403,-1.422 -2.816,-2.834 -4.238,-4.238c-0.189,-0.182 -0.447,-0.285 -0.71,-0.284Z" fill={fill_value} className="color000 svgShape"></path></svg>
                    <p className={`hidden lg:block ${localDarkmode === DARK ? "text-white" : "text-black"}`}>Search</p>
                </button>


            </div>
            <div className={`add-on-searchbar w-full overflow-hidden flex flex-row gap-2 justify-end ${scrolled ? "h-0" : "h-fit"}`}>
                <div className={`{ ${type !== "name" ? "hidden" : "flex"} w-fit h-10 p-1 justify-end flex-row gap-2 items-center ${localDarkmode === LIGHT ? "light-checkbox-effect" : "dark-checkbox-effect"}  ${isFullText === true ? "bg-teal-400" : ""}`}>
                    <SearchFullText />
                </div>
                <SelectType />
                <DarkModeSwitch />
            </div>
        </div>
    )
}

export default SearchBar