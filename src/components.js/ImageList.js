import React, { useEffect, useState } from 'react'
import ImageRow from './ImageRow'
import { getImages } from '../config/api'
import { useStore } from '../store'
import { DARK, LIGHT } from '../config/constants'

const ImageList = ({ name }) => {
    const [images, setImages] = useState([])

    const [state, dispatch] = useStore()
    const { localDarkmode, result_nation, page_loading } = state

    const getImageFromApi = async (name) => {
        let result = await getImages(name)
        if (result.status === 200) {
            let result_image = result.data.hits
            setImages(result_image)
        }
    }

    useEffect(() => {
        getImageFromApi(name)
    }, [])
    return (
        <div className={`w-full h-fit rounded overflow-hidden px-2 pb-2 ${localDarkmode == DARK ? "out-box-effect" : "in-box-effect "}`}>
            <p className={`font-bold mb-1 ${localDarkmode == LIGHT ? "text-zinc-900" : "text-zinc-100"}`}>Some images from this country:</p>
            <div className='columns-2 w-full gap-2 p-1'>
                {
                    images?.length > 0
                        ?
                        images?.map(item => (
                            <ImageRow key={item.id} image={item} />
                        ))
                        :
                        <p className={`font-bold m-auto my-10 text-xl ${localDarkmode == LIGHT ? "text-zinc-900" : "text-zinc-100"}`}>No image to show!</p>

                }
            </div>
        </div>
    )
}

export default ImageList