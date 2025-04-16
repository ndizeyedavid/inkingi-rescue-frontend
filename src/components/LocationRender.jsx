import { MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LocationRender() {
     const [address, setAddress] = useState('Loading...');
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchAddress = async () => {
               try {
                    const cachedAddress = localStorage.getItem('cachedAddress');
                    const cachedTimestamp = localStorage.getItem('addressCacheTimestamp');
                    const cacheIsValid = cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) < 3600000);

                    if (cachedAddress && cacheIsValid) {
                         setAddress(cachedAddress);
                         setLoading(false);
                         return;
                    }

                    const user = JSON.parse(localStorage.getItem('user'));
                    const [lat, lon] = user?.address || [];

                    if (!lat || !lon) {
                         setAddress('Location not available');
                         setLoading(false);
                         return;
                    }

                    const { data } = await axios.get(
                         `https://nominatim.openstreetmap.org/reverse`, {
                         params: {
                              format: 'json',
                              lat,
                              lon
                         },
                    }
                    );

                    const formattedAddress = data.display_name.split(',')[1] + ", " + data.display_name.split(',')[3];

                    localStorage.setItem('cachedAddress', formattedAddress);
                    localStorage.setItem('addressCacheTimestamp', Date.now().toString());

                    setAddress(formattedAddress);
               } catch (error) {
                    console.error('Error fetching address:', error);
                    setAddress('Location not available');
               } finally {
                    setLoading(false);
               }
          };

          fetchAddress();
     }, []);

     return (
          <div className='space-y-0.5'>
               <h4 className='font-medium'>Current Location</h4>
               <div className='flex gap-1 items-center'>
                    <MapPin size={30} stroke='#f6f0e8' fill='#000' />
                    {loading ? (
                         <div className="flex items-center gap-2">
                              <span className="loading loading-spinner loading-sm"></span>
                              <span className="text-gray-500">Fetching location...</span>
                         </div>
                    ) : (
                         <span>{address}</span>
                    )}
               </div>
          </div>
     );
}
