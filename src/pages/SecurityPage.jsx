import { ChevronLeft, Lock, Phone, Eye, EyeOff } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

function SecurityPage() {
     const [showPassword, setShowPassword] = useState(false);
     const [showNewPassword, setShowNewPassword] = useState(false);

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/profile" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Security management</h3>
                    </div>
               </div>

               <div className="p-4 max-w-xl mx-auto">
                    {/* Password Update Section */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                         <div className="card-body">
                              <h2 className="card-title flex gap-2">
                                   <Lock size={20} />
                                   Change Password
                              </h2>
                              <form className="space-y-4 mt-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Current Password</span>
                                        </label>
                                        <div className="relative">
                                             <input
                                                  type={showPassword ? "text" : "password"}
                                                  className="input input-bordered pr-10 w-full"
                                                  placeholder="Enter current password"
                                             />
                                             <button
                                                  type="button"
                                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                                  onClick={() => setShowPassword(!showPassword)}
                                             >
                                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                             </button>
                                        </div>
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">New Password</span>
                                        </label>
                                        <div className="relative">
                                             <input
                                                  type={showNewPassword ? "text" : "password"}
                                                  className="input input-bordered pr-10 w-full"
                                                  placeholder="Enter new password"
                                             />
                                             <button
                                                  type="button"
                                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                             >
                                                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                             </button>
                                        </div>
                                   </div>

                                   <button type="submit" className="btn btn-primary w-full">
                                        Update Password
                                   </button>
                              </form>
                         </div>
                    </div>

                    {/* Phone Number Update Section */}
                    <div className="card bg-base-100 shadow-xl">
                         <div className="card-body">
                              <h2 className="card-title flex gap-2">
                                   <Phone size={20} />
                                   Update Phone Number
                              </h2>
                              <form className="space-y-4 mt-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Current Phone Number</span>
                                        </label>
                                        <input
                                             type="tel"
                                             className="input input-bordered w-full bg-gray-100"
                                             defaultValue="+250 788 123 456"
                                             disabled
                                        />
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">New Phone Number</span>
                                        </label>
                                        <input
                                             type="tel"
                                             className="input input-bordered w-full"
                                             placeholder="Enter new phone number"
                                        />
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Verification Code</span>
                                        </label>
                                        <div className="flex gap-2">
                                             <input
                                                  type="text"
                                                  className="input input-bordered flex-1"
                                                  placeholder="Enter verification code"
                                             />
                                             <button type="button" className="btn btn-outline">
                                                  Send Code
                                             </button>
                                        </div>
                                   </div>

                                   <button type="submit" className="btn btn-primary w-full">
                                        Update Phone Number
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default SecurityPage
