import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const ImageRow = ({image}) => {
    return (
            <LazyLoadImage
                alt={"Image of this nation"}
                src={image.webformatURL}
                className='m-auto object-contain nation-image' />
    )
}

export default ImageRow