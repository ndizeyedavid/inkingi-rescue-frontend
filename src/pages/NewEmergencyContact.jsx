import { ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { addContact } from "../services/contactService"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function NewEmergencyContact() {
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false);
     const [phoneNumber, setPhoneNumber] = useState('');
     const { register, handleSubmit, formState: { errors } } = useForm();

     const onSubmit = async (data) => {
          try {
               setLoading(true);
               const contactData = {
                    ...data,
                    phone: phoneNumber
               };

               await addContact(contactData);
               navigate('/profile/contacts');
          } catch (error) {
               console.error('Error adding contact:', error);
          } finally {
               setLoading(false);
          }
     };

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/profile/contacts" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">New Contact</h3>
                    </div>
               </div>

               <div className="p-4 max-w-xl mt-[20px] mx-auto">
                    <div className="bg-base-100">
                         <div className="card-body">
                              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Contact Name</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="Enter contact name"
                                             className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                             {...register("name", { required: "Contact name is required" })}
                                        />
                                        {errors.name && (
                                             <span className="text-error text-sm mt-1">{errors.name.message}</span>
                                        )}
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Phone Number</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <PhoneInput
                                             international
                                             defaultCountry="RW"
                                             selected={phoneNumber}
                                             onChange={setPhoneNumber}
                                             className={`input input-bordered ${!phoneNumber ? 'input-error' : ''}`}
                                        />
                                        {!phoneNumber && (
                                             <span className="text-error text-sm mt-1">Phone number is required</span>
                                        )}
                                   </div>

                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Relationship</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <select
                                             className={`select select-bordered w-full ${errors.relation ? 'select-error' : ''}`}
                                             {...register("relationship", { required: "Relationship is required" })}
                                        >
                                             <option value="" disabled defaultValue>Select relationship</option>
                                             <option value="parent">Parent</option>
                                             <option value="sibling">Sibling</option>
                                             <option value="spouse">Spouse</option>
                                             <option value="friend">Friend</option>
                                             <option value="relative">Relative</option>
                                             <option value="other">Other</option>
                                        </select>
                                        {errors.relation && (
                                             <span className="text-error text-sm mt-1">{errors.relation.message}</span>
                                        )}
                                   </div>

                                   <div className="flex gap-3 pt-4">
                                        <button
                                             type="submit"
                                             className="btn btn-primary flex-1"
                                             disabled={loading || !phoneNumber}
                                        >
                                             {loading ? (
                                                  <span className="loading loading-spinner"></span>
                                             ) : (
                                                  "Save Contact"
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

export default NewEmergencyContact
