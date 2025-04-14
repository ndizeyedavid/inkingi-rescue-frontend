import { ChevronLeft, Upload } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom";

function PersonalSettings() {
     const [profileImage, setProfileImage] = useState(null);

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               setProfileImage(URL.createObjectURL(file));
          }
     };

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/profile" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Personal Information</h3>
                    </div>
               </div>

               <div className="p-4 max-w-2xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                         <div className="card-body">
                              {/* Profile Picture Section */}
                              <div className="flex flex-col items-center gap-4 mb-6">
                                   <div className="avatar">
                                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                             <img src={profileImage || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                                                  alt="Profile" />
                                        </div>
                                   </div>
                                   <label className="btn btn-outline btn-sm gap-2">
                                        <Upload size={16} />
                                        Change Photo
                                        <input type="file" className="hidden" onChange={handleImageChange}
                                             accept="image/*" />
                                   </label>
                              </div>

                              {/* Personal Information Form */}
                              <form className="space-y-4">
                                   <div className="grid md:grid-cols-2 gap-4">
                                        {/* First Name */}
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">First Name</span>
                                             </label>
                                             <input type="text" placeholder="Enter first name"
                                                  className="input input-bordered" />
                                        </div>

                                        {/* Last Name */}
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">Last Name</span>
                                             </label>
                                             <input type="text" placeholder="Enter last name"
                                                  className="input input-bordered" />
                                        </div>
                                   </div>

                                   {/* Email */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Email Address</span>
                                        </label>
                                        <input type="email" placeholder="Enter email address"
                                             className="input input-bordered" />
                                   </div>

                                   {/* Phone */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Phone Number</span>
                                        </label>
                                        <input type="tel" placeholder="Enter phone number"
                                             className="input input-bordered" />
                                   </div>

                                   {/* Address */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Address</span>
                                        </label>
                                        <textarea className="textarea textarea-bordered h-24"
                                             placeholder="Enter your address"></textarea>
                                   </div>

                                   {/* Submit Button */}
                                   <div className="mt-6">
                                        <button type="submit" className="btn btn-primary w-full">
                                             Save Changes
                                        </button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default PersonalSettings
