import React, { useEffect, useState, memo } from 'react'
import ImageRow from './ImageRow'
import { getImages } from '../config/api'
import { useStore, actions } from '../store'
import { DARK, IMAGES, LIGHT, PAGE, SLIDEPOS } from '../config/constants'

const ImageList = ({ name }) => {
    const [images, setImages] = useState([])

    const [state, dispatch] = useStore()
    const { localDarkmode, result_nation } = state
    const [currentPage, setCurrentPage] = useState(localStorage.getItem(PAGE) ?? 1)
    const fill_color = localDarkmode === LIGHT ? "#202020" : "#e5e5e5"

    const getImageFromApi = async (name, page) => {
        let result = await getImages(name, page)
        setCurrentPage(page)
        localStorage.setItem(PAGE, page)
        if (result.status === 200) {
            let result_image = result.data.hits
            setImages(result_image)
            localStorage.setItem(IMAGES, JSON.stringify(result_image))
        }
    }

    const Pagination = () => {
        let page = Number(currentPage)
        let previous = Number(page - 1)
        let nextPage = Number(page + 1)

        return (
            <p className={`w-fit flex flex-row gap-4`}>
                <button onClick={() => { getImageFromApi(name, 1) }} className={`${currentPage >= 5 ? "block" : "hidden"}`}>1...</button>
                <button onClick={() => { getImageFromApi(name, previous) }} className={`${currentPage > 1 ? "block" : "hidden"}`}>{previous}</button>
                <span className={`font-bold`}>{currentPage}</span>
                <button className={`${images?.length < 10 ? "hidden" : "block"}`} onClick={() => { getImageFromApi(name, nextPage) }}>{nextPage}</button>
            </p>
        )
    }

    const handleFullShow = (index) => {
        dispatch(actions.setFullSlider(index))
        localStorage.setItem(SLIDEPOS, index)
    }

    const handleNext = () => {
        if (currentPage > 0 && images?.length > 0) {
            setImages([])
            let nextPage = currentPage
            nextPage++
            setCurrentPage(nextPage)
            localStorage.setItem(PAGE, nextPage)
        }
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            setImages([])
            let prevPage = currentPage
            prevPage--
            setCurrentPage(prevPage)
            localStorage.setItem(PAGE, prevPage)
        }
    }

    useEffect(() => {
        localStorage.setItem(PAGE, 1)
        setCurrentPage(1)
    }, [result_nation])

    useEffect(() => {
        getImageFromApi(name, currentPage)
    }, [currentPage])

    return (
        <div className={`w-full h-fit rounded overflow-hidden px-2 pb-2 ${localDarkmode === DARK ? "out-box-effect" : "in-box-effect "}`}>
            <p className={`font-bold mb-1 ${localDarkmode === LIGHT ? "text-zinc-900" : "text-zinc-100"}`}>Some images from this country:</p>
            <div className='columns-2 w-full gap-2 p-1'>
                {
                    images?.length > 0
                        ?
                        images?.map((item, index) => (
                            <a target='__blank' href={item.largeImageURL} key={index} className={`w-full h-fit break-inside-avoid mb-2 block`} >
                                <ImageRow image={item} />
                            </a>
                        ))
                        :
                        <p className={`font-bold m-auto my-10 text-xl ${localDarkmode === LIGHT ? "text-zinc-900" : "text-zinc-100"}`}>No image to show!</p>

                }
            </div>

            <div className={`w-full p-2 flex flex-row gap-4 items-center justify-center text-lg lg:text-md paginations ${localDarkmode === LIGHT ? "text-zinc-900" : "text-zinc-100"}`}>
                <button onClick={() => { handlePrevious() }} className={`${currentPage > 1 ? "block" : "hidden"}`}>
                    <svg className={`rotate-180`} height="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490"><g><g><g><polygon fill={fill_color} points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" /></g></g></g></svg>
                </button>
                <Pagination />
                <button className={`w-fit h-fit ${images?.length < 10 ? "hidden" : "block"}`} onClick={() => { handleNext() }}>
                    <svg height="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 490"><g><g><g><polygon fill={fill_color} points="240.112,0 481.861,245.004 240.112,490 8.139,490 250.29,245.004 8.139,0" /></g></g></g></svg>
                </button>
            </div>
        </div>
    )
}

export default memo(ImageList)