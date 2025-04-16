import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { registerUser } from "../services/authService"
import { toast } from 'sonner'

function Signup() {
     const navigate = useNavigate();
     const [phoneNumber, setPhoneNumber] = useState('');
     const [loading, setLoading] = useState(false);
     const [coordinates, setCoordinates] = useState(null);

     useEffect(() => {
          // Tracking...................................
          if ("geolocation" in navigator) {
               navigator.geolocation.getCurrentPosition(
                    (position) => {
                         setCoordinates({
                              lat: position.coords.latitude,
                              lng: position.coords.longitude
                         });
                    },
                    (error) => {
                         toast.error("Please enable location services to continue");
                         console.error("Error getting location:", error);
                    }
               );
          } else {
               toast.error("Geolocation is not supported by your browser");
          }
     }, []);

     async function onSubmit(data) {
          if (!coordinates) {
               toast.error("Location access is required for registration");
               return;
          }
          if (data.password !== data.confirmPassword) {
               toast.error("Passwords do not match");
               return;
          }

          try {
               setLoading(true);
               const userData = {
                    ...data,
                    phone: phoneNumber,
                    address: [
                         coordinates.lat,
                         coordinates.lng
                    ]
               };
               await registerUser(userData);
               navigate('/');
          } catch (error) {
               console.error("Error during registration:", error);
          } finally {
               setLoading(false);
          }
     }

     const {
          register,
          handleSubmit,
          watch,
          formState: { errors }
     } = useForm();

     const password = watch("password", "");

     return (
          <main className="h-screen w-full flex items-center justify-center">
               <div className="flex flex-col gap-[40px] w-[86%] mx-auto">
                    <div className="flex justify-center">
                         <img src="/assets/logo/logo-no-bg.png" className="object-contain" width={300} height={300} alt="Logo" />
                    </div>

                    <div className="text-center space-y-1.5">
                         <h3 className="text-3xl font-medium">Sign Up</h3>
                         <h4 className="text-lg">Create an account and start saving lives</h4>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                         <div className="grid grid-cols-2 gap-2">
                              <label className="floating-label">
                                   <input
                                        type="text"
                                        placeholder="First Name"
                                        className={`input input-lg outline-none focus:border-none w-full ${errors.firstName ? 'input-error' : ''}`}
                                        {...register("fname", {
                                             required: "First name is required"
                                        })}
                                   />
                                   <span>First Name</span>
                                   {errors.firstName && (
                                        <p className="text-error text-sm mt-1">{errors.firstName.message}</p>
                                   )}
                              </label>
                              <label className="floating-label">
                                   <input
                                        type="text"
                                        placeholder="Last Name"
                                        className={`input input-lg outline-none focus:border-none w-full ${errors.lastName ? 'input-error' : ''}`}
                                        {...register("lname", {
                                             required: "Last name is required"
                                        })}
                                   />
                                   <span>Last Name</span>
                                   {errors.lastName && (
                                        <p className="text-error text-sm mt-1">{errors.lastName.message}</p>
                                   )}
                              </label>
                         </div>
                         <label className="floating-label">
                              <PhoneInput
                                   international
                                   defaultCountry="RW"
                                   placeholder="Phone"
                                   className={`input input-lg outline-none focus:border-none w-full ${!phoneNumber ? 'border-error' : ''}`}
                                   value={phoneNumber}
                                   onChange={setPhoneNumber}
                              />
                              <span>Phone</span>
                              {!phoneNumber && (
                                   <p className="text-error text-sm mt-1">Phone number is required</p>
                              )}
                         </label>
                         <label className="floating-label">
                              <input
                                   type="text"
                                   placeholder="Email"
                                   className={`input input-lg outline-none focus:border-none w-full ${errors.email ? 'input-error' : ''}`}
                                   {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                             message: "Invalid email address"
                                        }
                                   })}
                              />
                              <span>Email</span>
                              {errors.email && (
                                   <p className="text-error text-sm mt-1">{errors.email.message}</p>
                              )}
                         </label>
                         <label className="floating-label">
                              <input
                                   type="password"
                                   placeholder="Password"
                                   className={`input input-lg outline-none focus:border-none w-full ${errors.password ? 'input-error' : ''}`}
                                   {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                             value: 6,
                                             message: "Password must be at least 6 characters"
                                        }
                                   })}
                              />
                              <span>Password</span>
                              {errors.password && (
                                   <p className="text-error text-sm mt-1">{errors.password.message}</p>
                              )}
                         </label>
                         <label className="floating-label">
                              <input
                                   type="password"
                                   placeholder="Confirm Password"
                                   className={`input input-lg outline-none focus:border-none w-full ${errors.confirmPassword ? 'input-error' : ''}`}
                                   {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                   })}
                              />
                              <span>Confirm Password</span>
                              {errors.confirmPassword && (
                                   <p className="text-error text-sm mt-1">{errors.confirmPassword.message}</p>
                              )}
                         </label>

                         <button
                              type="submit"
                              disabled={loading || !phoneNumber}
                              className="btn btn-neutral btn-block text-xl"
                         >
                              {loading ? <span className="loading loading-spinner"></span> : "Enroll"}
                         </button>

                         <span className="text-center relative top-3">Already have an account? <Link to="/login" className="w-fit text-[#e6491e] pb-[0.5px] border-b">Login</Link></span>
                    </form>
               </div>
          </main>
     )
}

export default Signup
