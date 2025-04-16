import { Heart, MessageSquare, Phone } from "lucide-react";

export default function EmergencyContactCard({ contact }) {

     const handleCall = (phone) => {
          window.location.href = `tel:${phone}`;
     };

     const handleSMS = (phone) => {
          window.location.href = `sms:${phone}`;
     };

     return (
          <div className="card bg-base-100 shadow-lg">
               <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                         <div>
                              <h3 className="text-lg font-semibold flex items-center gap-2 capitalize">
                                   {contact.name}
                              </h3>
                              <p className="text-sm text-gray-500 capitalize">{contact.relationship}</p>
                              <p className="text-sm font-medium mt-1">{contact.phone}</p>
                         </div>

                         <div className="flex gap-2">
                              <button
                                   onClick={() => handleCall(contact.phone)}
                                   className="btn btn-primary btn-sm"
                              >
                                   <Phone size={16} />
                              </button>
                              <button
                                   onClick={() => handleSMS(contact.phone)}
                                   className="btn btn-info btn-sm"
                              >
                                   <MessageSquare size={16} />
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     )
}
