import { MapContainer, TileLayer } from 'react-leaflet'

export default function TrackingContainer() {
     const position = [-1.9672809, 30.090572]
     const zoom = 13;

     return (
          <div className='w-full h-screen p-5 relative z-40'>
               <MapContainer
                    center={position}
                    zoom={zoom}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%", borderRadius: "10px" }}
               >
                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
               </MapContainer>
          </div>
     )
}
