import React from 'react'
import GoogleMapReact from 'google-map-react';
import { useStore } from '../store';
import { DARK } from '../config/constants';

const Map = ({ lat,lng }) => {
    
    const [state, dispatch] = useStore()
    const { localDarkmode, result_nation, page_loading } = state

    const defaultProps = {
        center: {
          lat,
          lng
        },
        zoom: 5
      };

    return (
        <div className={`w-full h-fit rouned-md overflow-hidden p-2 ${localDarkmode == DARK ? "dark-box-effect" : "light-box-effect " }`}>
            <div style={{ height: '500px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBGCcrTDkzG-S5r21z8wjSlTPFdzhL5cZ4" }}
                    defaultCenter={defaultProps.center}
                    defaultZoom={defaultProps.zoom}
                >
                </GoogleMapReact>
            </div>
        </div>
    )
}

export default Map


