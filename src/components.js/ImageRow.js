import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageRow = ({image}) => {
    return (
        <a target='__blank' href={image.largeImageURL} className={`w-full h-fit break-inside-avoid mb-2 block`}>
            <LazyLoadImage
                alt={"Image of this nation"}
                src={image.webformatURL}
                className='m-auto object-contain nation-image' />
        </a>
    )
}

export default ImageRow