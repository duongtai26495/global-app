import React, { useEffect } from 'react'
import { useStore } from '../store'
import { DARK } from '../config/constants'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loading from './Loading';
import LoadingGif from '../assets/images/loading.gif'
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
        const currency = nation.currencies
        const tld = nation.tld

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


        const RenderName = () => {
            return (
                Object.keys(nativeName).map((key, index) =>
                (
                    <div key={index} className={`w-full flex flex-col gap-2 my-2`}>
                        <p className={`text-3xl m-auto md:m-0 font-bold ${color_theme}`}>{nativeName[key].official}</p>
                        <span className={`text-2xl m-auto md:m-0 font-bold ${color_theme}`}>( {nativeName[key].common} )</span>
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
            <div className={`w-full lg:max-w-3xl h-full flex flex-col p-3 `}>

                <div className={`w-full lg:h-60 flex flex-row gap-2 p-2 rounded-md relative ${localDarkmode === DARK ? "dark-box-effect" : "bg-slate-50 light-box-effect"}`}>
                    <img
                        className={`w-1/2 lg:w-1/3 lg:max-w-4xl object-contain`}
                        src={flag.svg}
                        alt={flag.alt} />

                    <LazyLoadImage
                        alt={coatOfArms.alt}
                        src={coatOfArms.png}
                        className='w-fit h-24 lg:max-h-40 lg:h-full lg:max-w-4xl m-auto object-contain' />
                </div>

                <div className={`w-full flex flex-col p-2 gap-2`}>

                    <RenderName />
                    <div className={`w-full flex flex-col justify-start gap-2`}>
                        <RenderInfo list={cap} topkey={"Capital"} />
                        <RenderInfo list={languages} topkey={"Languages"} />
                        <RenderInfo list={tld} topkey={"Tld of nation"} />
                    </div>
                    <p className={`text-md ${color_theme}`}>Offical: <span className='font-bold'>{name.official}</span></p>
                    <p className={`text-md ${color_theme}`}>Car side: <span className='font-bold'>{car.side}</span></p>
                    <p className={`text-md ${color_theme}`}>Region: <span className='font-bold'>{region}</span></p>
                    <RenderCurrency />

                </div>
            </div>
        )
    }


    return (
        page_loading === false ?
            result_nation?.length > 0
                ?
                <RenderResult />
                :
                <Loading gif={LoadingGif} />
            :
            <Loading gif={SearchingGif} />
    )
}

export default ResultContent