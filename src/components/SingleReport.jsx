
import { BadgeAlert, Clock, MapPin, Phone, User } from 'lucide-react';
// @ts-ignore
import ReportDescriptions from './ReportDescriptions';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Axios from '../services/axios';
import { getCurrentUser } from '../services/authService';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export default function SingleReport({
     data,
     emergencyType,
     status,
     date,
     location,
     reporter,
     phone,
     isVolunteered,
     setReports
}) {

     const [address, setAddress] = useState("");
     const [loading, setLoading] = useState(true);
     const [volLoading, setVolLoading] = useState(false);

     useEffect(() => {
          async function fetchAddress() {
               if (location) {
                    setLoading(true);
                    const coordinates = location.split(",");

                    // Check cache first
                    const cacheKey = `geocode_${location}`;
                    const cachedResult = localStorage.getItem(cacheKey);
                    const cacheTimestamp = localStorage.getItem(`${cacheKey}_timestamp`);
                    const cacheIsValid = cacheTimestamp &&
                         (Date.now() - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000); // 24 hours

                    if (cachedResult && cacheIsValid) {
                         setAddress(cachedResult);
                         setLoading(false);
                         return;
                    }

                    try {
                         const { data } = await axios.get(
                              "https://nominatim.openstreetmap.org/reverse",
                              {
                                   params: {
                                        format: "json",
                                        lat: coordinates[0],
                                        lon: coordinates[1],
                                   },
                              }
                         );
                         let formattedAddress = "";
                         if (data.address) {
                              const { road, suburb, city, town, village, state, country } = data.address;
                              formattedAddress = [
                                   road,
                                   suburb,
                                   city || town || village,
                                   state,
                                   country,
                              ]
                                   .filter(Boolean)
                                   .join(", ");
                         }
                         if (!formattedAddress && data.display_name) {
                              formattedAddress = data.display_name;
                         }

                         // Cache the result
                         localStorage.setItem(cacheKey, formattedAddress);
                         localStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());

                         setAddress(formattedAddress);
                    } catch (error) {
                         setAddress("Location not available");
                    } finally {
                         setLoading(false);
                    }
               } else {
                    setAddress("Location not available");
                    setLoading(false);
               }
          }
          fetchAddress();
     }, [location]);

     async function handleVolunteer() {
          setVolLoading(true);
          try {
               await Axios.post(`/sos/${isVolunteered ? "unvolunteer" : "volunteer"}/${data._id}`, { user: getCurrentUser()._id });
               setReports(Math.random())
               toast.success(`${isVolunteered ? "Unvolunteered" : "Volunteered"} successfully`);
          } catch (err) {
               toast.error(`Failed to ${isVolunteered ? "unvolunteer" : "volunteer"}`);
               console.error(`Failed to ${isVolunteered ? "unvolunteer" : "volunteer"}`, err)
          } finally {
               setVolLoading(false);
          }
     }

     return (
          <>
               <div className="bg-base-100 outline rounded-xl shadow-sm p-4 space-y-4">
                    {/* Emergency Type and Status */}
                    <div className="flex justify-between items-center">
                         <div className="flex items-center space-x-2">
                              <BadgeAlert className="w-5 h-5 text-red-500" />
                              <span className="font-semibold text-gray-800 capitalize">{emergencyType}</span>
                         </div>
                         {/* <div className={`px-3 py-1 rounded-full text-sm ${status === "occuring"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                              }`}>
                              {status}
                         </div> */}
                    </div>

                    {/* Time and Location */}
                    <div className="space-y-2">
                         <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{date}</span>
                         </div>
                         <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">
                                   {loading ? (
                                        <span className="loading loading-spinner loading-xs mr-2"></span>
                                   ) : (
                                        address
                                   )}
                              </span>
                         </div>
                    </div>

                    {/* Reporter Info */}
                    <div className="flex items-center justify-between py-3 border-t border-gray-100">
                         <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                   <User className="w-6 h-6 text-gray-500" />
                              </div>
                              <div>
                                   <p className="font-medium text-gray-800">{reporter}</p>
                                   <div className="flex items-center space-x-1 text-gray-500">
                                        <Phone className="w-3 h-3" />
                                        <span className="text-sm">{phone}</span>
                                   </div>
                              </div>
                         </div>
                    </div>

                    {/* Action Button */}
                    {data.user._id != getCurrentUser()._id ?
                         <button
                              onClick={handleVolunteer}
                              disabled={volLoading}
                              className={`w-full py-2.5 rounded-lg font-medium transition-colors ${isVolunteered
                                   ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                   : "bg-red-500 text-white hover:bg-red-600"
                                   }`}
                         >
                              {volLoading ? "Loading..." : isVolunteered ? "Unvolunteer" : "Volunteer to Help"}
                         </button>
                         :
                         <Link to={"/sos/reports/track/" + data._id} className='btn btn-block btn-primary'>Track My Report</Link>
                    }
                    {/* <label className="btn btn-block py-2.5 rounded-lg font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"> */}
                    <label htmlFor={"modal_desc_" + data._id} className="btn btn-base-100 btn-block  rounded-lg">
                         Details
                    </label>
               </div>

               <ReportDescriptions
                    id={data._id}
                    title={data.title}
                    type={data.sos_type}
                    description={data.description}
                    reporter={data.user?.fname + " " + data.user?.lname}
                    phone={data.user?.phone}
                    date={data.postDate ? new Date(data.postDate).toDateString() : ""}
                    location={address}
                    coordinates={data.location}
                    proof={data.proof}
                    volunteers={data.volunteers || []}
                    // volunteers={console.log(data.volunteers) || []}
                    comments={data.comments}
                    setComments={setReports}
               />
          </>
     )

}