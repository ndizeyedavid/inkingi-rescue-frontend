import { MapContainer, TileLayer, Marker, useMap, Circle } from 'react-leaflet'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSosReports } from '../services/sosService';
import { toast } from 'sonner';

// Component to handle map center changes
function ChangeView({ center }) {
     const map = useMap();
     useEffect(() => {
          map.setView(center);
     }, [center]);
     return null;
}

export default function TrackingContainer() {
     const [searchParams] = useSearchParams();
     const [reports, setReports] = useState([]);
     const lat = parseFloat(searchParams.get('lat'));
     const long = parseFloat(searchParams.get('long'));
     const position = lat && long ? [lat, long] : [-1.9672809, 30.090572];
     const zoom = 14;

     useEffect(() => {
          async function fetchReports() {
               try {
                    if (!lat || !long) {
                         const data = await getSosReports();
                         setReports(data);
                    }
               } catch (error) {
                    toast.error("Failed to fetch emergency locations");
               }
          }
          fetchReports();
     }, [lat, long]);

     return (
          <div className='w-full h-screen p-5 relative z-40'>
               <MapContainer
                    center={position}
                    zoom={zoom}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%", borderRadius: "10px" }}
               >
                    <ChangeView center={position} />
                    <TileLayer
                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {lat && long ? (
                         <>
                              <Marker position={position} />
                              <Circle
                                   center={position}
                                   radius={100}
                                   pathOptions={{ color: '#077bff' }}
                              />
                         </>
                    ) : (
                         reports.map((report) => {
                              if (report.location) {
                                   const [reportLat, reportLong] = report.location.split(',').map(Number);
                                   const reportPosition = [reportLat, reportLong];
                                   return (
                                        <div key={report._id}>
                                             <Marker position={reportPosition} />
                                             <Circle
                                                  center={reportPosition}
                                                  radius={100}
                                                  pathOptions={{ color: '#077bff' }}
                                             />
                                        </div>
                                   );
                              }
                              return null;
                         })
                    )}
               </MapContainer>
          </div>
     )
}
