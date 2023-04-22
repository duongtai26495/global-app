import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageRow = ({image}) => {
    return (
        <div className={`w-full h-fit break-inside-avoid mb-2`}>
            <LazyLoadImage
                alt={"Image of this nation"}
                src={image.webformatURL}
                className='m-auto object-contain' />
        </div>
    )
}

export default ImageRow