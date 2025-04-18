import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, updateProfile } from "../services/authService";
import { Districts } from "rwanda";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

function PersonalSettings() {
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [address, setAddress] = useState([]);
     const { register, handleSubmit, setValue } = useForm();

     useEffect(() => {
          const user = getCurrentUser();
          if (user) {
               setValue("fname", user.fname);
               setValue("lname", user.lname);
               setValue("phone", user.phone);
               setValue("district", user.district);
          }
     }, [setValue]);

     const onSubmit = async (data) => {
          try {
               setLoading(true);

               const addressFetch = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                    params: {
                         format: 'json',
                         q: `${data.district}, Rwanda`,
                         limit: 1
                    }
               });

               if (!addressFetch.data || addressFetch.data.length === 0) {
                    toast.error('Location not found. Please try a different district.');
                    return;
               }

               const coordinates = [
                    parseFloat(addressFetch.data[0].lat),
                    parseFloat(addressFetch.data[0].lon)
               ];

               const userData = {
                    ...data,
                    address: coordinates
               };

               await updateProfile(userData);
               toast.success("Profile updated successfully");
               navigate('/profile');
          } catch (error) {
               console.error("Failed to update profile:", error);
               toast.error("Failed to update profile. Please try again.");
          } finally {
               setLoading(false);
          }
     };

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-base-200'>
                    <div className='flex gap-3'>
                         <Link to="/profile" className='bg-base-100 p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Personal Information</h3>
                    </div>
               </div>

               <div className="p-4 max-w-2xl mx-auto">
                    <div className="card bg-base-100 shadow-xl">
                         <div className="card-body">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                   <div className="grid md:grid-cols-2 gap-4">
                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">First Name</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="input input-bordered"
                                                  {...register("fname", { required: "First name is required" })}
                                             />
                                        </div>

                                        <div className="form-control">
                                             <label className="label">
                                                  <span className="label-text">Last Name</span>
                                             </label>
                                             <input
                                                  type="text"
                                                  className="input input-bordered"
                                                  {...register("lname", { required: "Last name is required" })}
                                             />
                                        </div>
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Phone Number</span>
                                        </label>
                                        <input
                                             type="tel"
                                             className="input input-bordered"
                                             {...register("phone", { required: "Phone number is required" })}
                                        />
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Address</span>
                                        </label>
                                        <select
                                             className="select select-bordered"
                                             {...register("district")}
                                        >
                                             {Districts().map((district, index) => (
                                                  <option key={index} value={district}>{district}</option>
                                             ))}
                                        </select>
                                   </div>

                                   <div className="mt-6">
                                        <button
                                             type="submit"
                                             className="btn btn-primary w-full"
                                             disabled={loading}
                                        >
                                             {loading ? (
                                                  <span className="loading loading-spinner"></span>
                                             ) : (
                                                  "Save Changes"
                                             )}
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
