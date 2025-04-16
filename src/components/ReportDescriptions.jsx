
import { BadgeAlert, Clock, Flag, MapPin, MessageSquare, Phone, Send, ThumbsUp, User, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { getCurrentUser } from '../services/authService';
import { useState } from 'react';
import { toast } from 'sonner';
import Axios from '../services/axios';
import { Link } from 'react-router-dom';

export default function ReportDescriptions({
     id,
     title,
     type,
     description,
     reporter,
     phone,
     date,
     location,
     coordinates,
     proof,
     volunteers,
     comments,
     setComments
}) {
     const [loading, setLoading] = useState(false);

     const { register, handleSubmit, reset } = useForm();

     async function sendComment(data) {
          try {
               const formData = {
                    user: getCurrentUser()._id,
                    comment: data.comment
               }
               await Axios.post("/sos/comment/" + id, formData)
               toast.success("Comment posted successfully")
               setComments(Math.random())
          } catch (err) {
               toast.error(err.response?.data?.message || "Failed to send comment")
               console.error(err.response);
          } finally {
               setLoading(false);
               reset();
          }
     }

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
                         <div className="flex flex-wrap gap-1 space-x-4 mb-4 text-sm text-gray-500">
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
                                                       <source src={import.meta.env.VITE_BACKEND + item} type="video/mp4" />
                                                  </video>
                                             ) : (
                                                  <img src={import.meta.env.VITE_BACKEND + item} alt="Proof" className="h-full w-full object-cover rounded-lg" />
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
                                             {volunteer.user.fname}
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Comments Section */}
                         <div className="mb-6">
                              <h4 className="font-semibold mb-2">Comments({comments.length})</h4>
                              <div className="space-y-4">
                                   {comments.map((comment, index) => (
                                        <div key={index} className="bg-base-200 p-3 rounded-lg">
                                             <div className="flex justify-between mb-2">
                                                  <span className="font-medium">{comment.user?.fname + " " + comment.user?.lname}</span>
                                                  <span className="text-sm text-gray-500">{new Date(comment.postDate).toLocaleString()}</span>
                                             </div>
                                             <p className="text-sm">{comment.comment}</p>
                                        </div>
                                   ))}
                              </div>
                         </div>

                         {/* Comment Form */}
                         <form onSubmit={handleSubmit(sendComment)} className="form-control">
                              <div className="join w-full">
                                   <input type="text" placeholder="Write a comment..." className="input input-bordered w-full join-item" required {...register("comment")} />
                                   <button disabled={loading} type='submit' className="btn btn-square join-item">
                                        {loading ? <span className='loading loading-spinner'></span> : <Send className="w-5 h-5" />}
                                   </button>
                              </div>
                         </form>

                         {/* Action Buttons */}
                         <div className="modal-action">
                              <Link to={`/map?lat=${coordinates.split(',')[0]}&long=${coordinates.split(',')[1]}`} className="btn btn-block mt-2"><MapPin className='size-4' /> Map</Link>
                         </div>
                    </div>
               </div>
          </>
     )
}
