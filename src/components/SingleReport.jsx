
import { BadgeAlert, Clock, MapPin, Phone, User } from 'lucide-react';
import ReportDescriptions from './ReportDescriptions';

export default function SingleReport({
     emergencyType,
     status,
     date,
     location,
     reporter,
     phone,
     isVolunteered
}) {
     return (
          <>
               <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                    {/* Emergency Type and Status */}
                    <div className="flex justify-between items-center">
                         <div className="flex items-center space-x-2">
                              <BadgeAlert className="w-5 h-5 text-red-500" />
                              <span className="font-semibold text-gray-800">{emergencyType}</span>
                         </div>
                         <div className={`px-3 py-1 rounded-full text-sm ${status === "Active"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                              }`}>
                              {status}
                         </div>
                    </div>

                    {/* Time and Location */}
                    <div className="space-y-2">
                         <div className="flex items-center space-x-2 text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">{date}</span>
                         </div>
                         <div className="flex items-center space-x-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{location}</span>
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
                    <button
                         className={`w-full py-2.5 rounded-lg font-medium transition-colors ${isVolunteered
                              ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              : "bg-red-500 text-white hover:bg-red-600"
                              }`}
                    >
                         {isVolunteered ? "Unvolunteer" : "Volunteer to Help"}
                    </button>
                    {/* <label className="btn btn-block py-2.5 rounded-lg font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200"> */}
                    <label htmlFor="modal_desc_123" className="btn btn-base-100 btn-block  rounded-lg">
                         Details
                    </label>
               </div>

               <ReportDescriptions
                    id="123"
                    title="Medical Emergency"
                    type="Medical"
                    description="Need immediate assistance..."
                    reporter="John Doe"
                    phone="+250 788 123 456"
                    date="2024-01-20 14:30"
                    location="Kigali, Rwanda"
                    proof={["image1.jpg", "video1.mp4"]}
                    volunteers={["Jane Doe", "Mike Smith"]}
                    comments={[
                         { user: "Helper 1", text: "I'm nearby!", time: "2 min ago" }
                    ]}
               />
          </>
     )
}
