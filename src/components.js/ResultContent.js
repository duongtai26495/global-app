import React, { useEffect } from 'react'
import { useStore } from '../store'
import { DARK } from '../config/constants'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './Loading';
import WelcomeGif from '../assets/images/welcome.gif'
import SearchingGif from '../assets/images/waiting.gif'
const ResultContent = () => {

    const [state, dispatch] = useStore()
    const { localDarkmode, result_nation, page_loading } = state



    const RenderResult = () => {
        const nation = result_nation[0]
        const name = nation.name
        const nativeName = name.nativeName
        const flag = nation.flags
        const car = nation.car
        const languages = nation.languages
        const coatOfArms = nation.coatOfArms
        const cap = nation.capital
        const color_theme = localDarkmode === DARK ? "text-slate-100" : "text-slate-950"
        const region = nation.region
        const subregion = nation.subregion
        const currency = nation.currencies
        const tld = nation.tld
        const population = nation.population
        const timezones = nation.timezones
        const startOfWeek = nation.startOfWeek
        const idd = nation.idd


        const RenderInfo = ({ list, topkey }) => {
            return (
                <p className={`text-md ${color_theme}`}>{topkey}:
                    {
                        Object.keys(list).map((key, index) =>
                        (
                            <span key={index} className='font-bold'> {list[key]}</span>
                        ))
                    }
                </p>
            )
        }

        const RenderIdd = () => {
            const root = idd.root;
            const sub = idd.suffixes
            return (
                Object.keys(sub).map((key, index) =>
                (
                    <div key={index} className={`w-full flex flex-col gap-2`}>
                        <p className={`${color_theme}`}>Idd :<span className={` m-auto md:m-0 font-bold ${color_theme}`}>{root}{sub[key]}</span></p>
                    </div>
                )
                )
            )
        }


        const RenderName = () => {
            return (
                Object.keys(nativeName).map((key, index) =>
                (
                    <div key={index} className={`w-full flex flex-col gap-2 my-2`}>
                        <p className={`text-2xl m-auto md:m-0 font-bold ${color_theme}`}>{nativeName[key].official}</p>
                        <span className={`text-xl m-auto md:m-0 font-bold ${color_theme}`}>( {nativeName[key].common} )</span>
                    </div>
                )
                )
            )
        }

        const RenderCurrency = () => {
            return (
                Object.keys(currency).map((key, index) =>
                (
                    <p key={index} className={`text-md ${color_theme}`}>Currency:
                        <span className='font-bold'> {currency[key].name}</span>
                        <span className='font-bold text-md'> ( {currency[key].symbol} )</span>
                    </p>
                )
                )
            )
        }

        return (
            <>
                <div className={`w-full h-fit flex flex-row gap-2 p-2 bg-opacity-80 md:bg-opacity-100 rounded-md relative ${localDarkmode === DARK ? "out-box-effect bg-zinc-800" : "bg-slate-50 in-box-effect"}`}>

                    <img
                        className={`w-1/2 lg:w-1/3 lg:max-w-4xl object-contain`}
                        src={flag.svg}
                        alt={flag.alt} />

                    <LazyLoadImage
                        alt={coatOfArms.alt}
                        src={coatOfArms.png}
                        className='w-fit h-24 lg:max-h-40 lg:h-full lg:max-w-4xl m-auto object-contain' />
                </div>

                <div className={`w-full flex flex-col p-2 gap-2 bg-opacity-80 md:bg-opacity-100 rounded-md ${localDarkmode === DARK ? "out-box-effect bg-zinc-800" : "bg-slate-50 in-box-effect"}`}>
                    <RenderName />
                    <div className='w-full border rounded p-1'>
                        <p className={`text-md italic mb-2 ${color_theme}`}>General:</p>

                        <div className={`w-full flex flex-col justify-start gap-2 p-2`}>
                            <p className={`text-md ${color_theme}`}>Offical name: <span className='font-bold'>{name.official}</span></p>
                            <RenderInfo list={cap} topkey={"Capital"} />
                            <p className={`text-md ${color_theme}`}>Population: <span className='font-bold'>{population}</span></p>
                            <RenderInfo list={timezones} topkey={"Timezones"} />
                            <p className={`text-md ${color_theme}`}>Region: <span className='font-bold'>{region} - {subregion}</span></p>

                        </div>
                    </div>
                    <div className='w-full border rounded p-1'>
                    <p className={`text-md italic mb-2 ${color_theme}`}>Other information:</p>

                        <div className={`w-full flex flex-col justify-start gap-2 p-2 `}>
                            <RenderIdd />
                            <RenderInfo list={tld} topkey={"Tld of nation"} />
                            <RenderCurrency />

                            <RenderInfo list={languages} topkey={"Languages"} />
                            <p className={`text-md ${color_theme}`}>Car side: <span className='font-bold'>{car.side.charAt(0).toUpperCase() + car.side.slice(1)}</span></p>


                            <p className={`text-md ${color_theme}`}>Start of week: <span className='font-bold'>{startOfWeek.charAt(0).toUpperCase() + startOfWeek.slice(1)}</span></p>
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className={`w-full lg:max-w-3xl h-full flex flex-col p-3 gap-3 `}>
            {
                page_loading === false ?
                    result_nation?.length > 0
                        ?
                        <RenderResult />
                        :
                        <Loading gif={WelcomeGif} />
                    :
                    <Loading gif={SearchingGif} />
            }
        </div>
    )
}

export default ResultContent