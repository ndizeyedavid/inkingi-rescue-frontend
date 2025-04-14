
import { BadgeAlert, Clock, Flag, MapPin, MessageSquare, Phone, Send, ThumbsUp, User } from 'lucide-react';

export default function ReportDescriptions({
     id,
     title,
     type,
     description,
     reporter,
     phone,
     date,
     location,
     proof,
     volunteers,
     comments
}) {
     return (
          <>
               <input type="checkbox" id={`modal_desc_` + id} className="modal-toggle" />
               <div className="modal" role="dialog">
                    <div className="modal-box max-w-3xl">
                         {/* Header */}
                         <div className="flex justify-between items-start mb-4">
                              <div>
                                   <h3 className="text-2xl font-bold">{title}</h3>
                                   <div className="flex items-center space-x-2 mt-2">
                                        <BadgeAlert className="w-5 h-5 text-red-500" />
                                        <span className="badge badge-error">{type}</span>
                                   </div>
                              </div>
                              <label htmlFor={`modal_desc_` + id} className="btn btn-sm btn-circle btn-ghost">✕</label>
                         </div>

                         {/* Reporter Info */}
                         <div className="flex items-center space-x-3 mb-4">

                              <div className="size-[48px] flex items-center shadow-md justify-center rounded-full bg-neutral-focus">
                                   <User className="w-6 h-6 flex" />
                              </div>

                              <div>
                                   <h4 className="font-semibold">{reporter}</h4>
                                   <div className="flex items-center text-sm text-gray-500">
                                        <Phone className="w-4 h-4 mr-1" />
                                        {phone}
                                   </div>
                              </div>
                         </div>

                         {/* Time and Location */}
                         <div className="flex space-x-4 mb-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                   <Clock className="w-4 h-4 mr-1" />
                                   {date}
                              </div>
                              <div className="flex items-center">
                                   <MapPin className="w-4 h-4 mr-1" />
                                   {location}
                              </div>
                         </div>

                         {/* Description */}
                         <div className="prose max-w-none mb-6">
                              <p>{description}</p>
                         </div>

                         {/* Proof Gallery */}
                         <div className="mb-6">
                              <h4 className="font-semibold mb-2">Proof</h4>
                              <div className="grid grid-cols-2 gap-2">
                                   {proof.map((item, index) => (
                                        <div key={index} className="rounded-lg bg-base-200 h-40 flex items-center justify-center">
                                             {item.endsWith('.mp4') ? (
                                                  <video className="h-full w-full object-cover rounded-lg" controls>
                                                       <source src={item} type="video/mp4" />
                                                  </video>
                                             ) : (
                                                  <img src={item} alt="Proof" className="h-full w-full object-cover rounded-lg" />
                                             )}
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Volunteers */}
                         <div className="mb-6">
                              <h4 className="font-semibold mb-2">Volunteers ({volunteers.length})</h4>
                              <div className="flex flex-wrap gap-2">
                                   {volunteers.map((volunteer, index) => (
                                        <div key={index} className="badge badge-outline gap-2">
                                             <ThumbsUp className="w-3 h-3" />
                                             {volunteer}
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Comments Section */}
                         <div className="mb-6">
                              <h4 className="font-semibold mb-2">Comments</h4>
                              <div className="space-y-4">
                                   {comments.map((comment, index) => (
                                        <div key={index} className="bg-base-200 p-3 rounded-lg">
                                             <div className="flex justify-between mb-2">
                                                  <span className="font-medium">{comment.user}</span>
                                                  <span className="text-sm text-gray-500">{comment.time}</span>
                                             </div>
                                             <p className="text-sm">{comment.text}</p>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Comment Form */}
                         <div className="form-control">
                              <div className="join w-full">
                                   <input type="text" placeholder="Write a comment..." className="input input-bordered w-full join-item" />
                                   <button className="btn btn-square join-item">
                                        <Send className="w-5 h-5" />
                                   </button>
                              </div>
                         </div>

                         {/* Action Buttons */}
                         <div className="modal-action">
                              <button className="btn btn-error gap-2">
                                   <Flag className="w-4 h-4" />
                                   Report Scam
                              </button>
                              <button className="btn btn-primary gap-2">
                                   <MessageSquare className="w-4 h-4" />
                                   Volunteer
                              </button>
                              <button className="btn">Map</button>
                         </div>
                    </div>
               </div>
          </>
     )
}
