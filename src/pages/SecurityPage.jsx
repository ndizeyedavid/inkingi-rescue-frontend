import { ChevronLeft, Lock, Phone, Eye, EyeOff } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { get, useForm } from "react-hook-form"
import { toast } from "sonner"
import { changePassword, getCurrentUser, updateProfile } from "../services/authService"
import axios from "axios"

function SecurityPage() {
     const navigate = useNavigate();
     const [showPassword, setShowPassword] = useState(false);
     const [showNewPassword, setShowNewPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const [currentPhone, setCurrentPhone] = useState("");

     const { register: passwordRegister, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors } } = useForm();
     const { register: phoneRegister, handleSubmit: handlePhoneSubmit, formState: { errors: phoneErrors } } = useForm();

     useEffect(() => {
          const user = getCurrentUser();
          if (user?.phone) {
               setCurrentPhone(user.phone);
          }
     }, []);

     const onPasswordSubmit = async (data) => {
          try {
               setLoading(true);

               const user_id = getCurrentUser()._id;

               // console.log({ ...data, user_id: user_id });
               await changePassword({ ...data, user_id: user_id })
               toast.success("Password updated successfully");
          } catch (error) {
               toast.error(error.response?.data?.message || "Failed to update password");
          } finally {
               setLoading(false);
          }
     };

     const onPhoneSubmit = async (data) => {
          try {
               setLoading(true);
               await updateProfile(data);
               toast.success("Phone number updated successfully");
               setCurrentPhone(data.phone);
          } catch (error) {
               toast.error(error.response?.data?.message || "Failed to update phone number");
          } finally {
               setLoading(false);
          }
     };

     const sendVerificationCode = async (phone) => {
          try {
               await axios.post("/api/auth/send-code", { phone });
               toast.success("Verification code sent");
          } catch (error) {
               toast.error("Failed to send verification code");
          }
     };

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
                    <div className="card bg-base-100 shadow-xl mb-6">
                         <div className="card-body">
                              <h2 className="card-title flex gap-2">
                                   <Lock size={20} />
                                   Change Password
                              </h2>
                              <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4 mt-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Current Password</span>
                                        </label>
                                        <div className="relative">
                                             <input
                                                  type={showPassword ? "text" : "password"}
                                                  className={`input input-bordered pr-10 w-full ${passwordErrors.oldPassword ? 'input-error' : ''}`}
                                                  placeholder="Enter current password"
                                                  {...passwordRegister("oldPassword", {
                                                       required: "Current password is required"
                                                  })}
                                             />
                                             <button
                                                  type="button"
                                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                                  onClick={() => setShowPassword(!showPassword)}
                                             >
                                                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                             </button>
                                        </div>
                                        {passwordErrors.oldPassword && (
                                             <span className="text-error text-sm">{passwordErrors.oldPassword.message}</span>
                                        )}
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">New Password</span>
                                        </label>
                                        <div className="relative">
                                             <input
                                                  type={showNewPassword ? "text" : "password"}
                                                  className={`input input-bordered pr-10 w-full ${passwordErrors.newPassword ? 'input-error' : ''}`}
                                                  placeholder="Enter new password"
                                                  {...passwordRegister("newPassword", {
                                                       required: "New password is required",
                                                       minLength: {
                                                            value: 6,
                                                            message: "Password must be at least 6 characters"
                                                       }
                                                  })}
                                             />
                                             <button
                                                  type="button"
                                                  className="absolute right-3 top-1/2 -translate-y-1/2"
                                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                             >
                                                  {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                             </button>
                                        </div>
                                        {passwordErrors.newPassword && (
                                             <span className="text-error text-sm">{passwordErrors.newPassword.message}</span>
                                        )}
                                   </div>

                                   <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={loading}
                                   >
                                        {loading ? <span className="loading loading-spinner"></span> : "Update Password"}
                                   </button>
                              </form>
                         </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                         <div className="card-body">
                              <h2 className="card-title flex gap-2">
                                   <Phone size={20} />
                                   Update Phone Number
                              </h2>
                              <form onSubmit={handlePhoneSubmit(onPhoneSubmit)} className="space-y-4 mt-4">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Current Phone Number</span>
                                        </label>
                                        <input
                                             type="tel"
                                             className="input input-bordered w-full bg-gray-100"
                                             value={currentPhone}
                                             disabled
                                        />
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">New Phone Number</span>
                                        </label>
                                        <input
                                             type="tel"
                                             className={`input input-bordered w-full ${phoneErrors.phone ? 'input-error' : ''}`}
                                             placeholder="Enter new phone number"
                                             {...phoneRegister("phone", {
                                                  required: "Phone number is required",
                                                  pattern: {
                                                       value: /^\+?[1-9]\d{1,14}$/,
                                                       message: "Please enter a valid phone number"
                                                  }
                                             })}
                                        />
                                        {phoneErrors.phone && (
                                             <span className="text-error text-sm">{phoneErrors.phone.message}</span>
                                        )}
                                   </div>

                                   <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                        disabled={loading}
                                   >
                                        {loading ? <span className="loading loading-spinner"></span> : "Update Phone Number"}
                                   </button>
                              </form>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default SecurityPage
