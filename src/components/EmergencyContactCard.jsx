import { Heart, MessageSquare, Phone } from "lucide-react";
import Axios from "../services/axios";
import { getCurrentUser } from "../services/authService";
import { toast } from "sonner";

export default function EmergencyContactCard({ contact }) {

     const handleCall = (phone) => {
          window.location.href = `tel:${phone}`;
     };

     const handleSMS = async (phone) => {
          try {
               await Axios.post("/contacts/send/msg/" + contact._id, {
                    message: `${getCurrentUser().fname + " " + getCurrentUser().lname} needs your help. Please contact them at ${getCurrentUser().phone}`,
               })

               toast.success("Message sent successfully");
          } catch (err) {
               toast.error(err.response.data.message);
               console.error(err);
          };
     }

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
