import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useStore } from '../store';
import { DARK, GOOGLE_API } from '../config/constants';

const Map = ({ lat,lng }) => {
    
    const [state] = useStore()
    const { localDarkmode } = state

    const defaultProps = {
        center: {
          lat,
          lng
        },
        zoom: 5
      };

    return (
        <div className={`w-full h-fit rounded overflow-hidden px-2 pb-2 ${localDarkmode === DARK ? "out-box-effect" : "in-box-effect " }`}>
            <p className={`w-full text-md font-bold mb-2 ${localDarkmode === DARK ? "text-neutral-100" : "text-neutral-900 " }`}>Position on map:</p>
            <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_API }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map


