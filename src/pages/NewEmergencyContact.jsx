import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

function NewEmergencyContact() {
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
                              <form className="space-y-8">
                                   {/* Contact Name */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Contact Name</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <input
                                             type="text"
                                             placeholder="Enter contact name"
                                             className="input input-bordered"
                                             required
                                        />
                                   </div>

                                   {/* Phone Number */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Phone Number</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <input
                                             type="tel"
                                             placeholder="e.g., +250 788 123 456"
                                             className="input input-bordered"
                                             required
                                        />
                                   </div>

                                   {/* Relationship */}
                                   <div className="form-control">
                                        <label className="label">
                                             <span className="label-text">Relationship</span>
                                             <span className="label-text-alt text-error">*</span>
                                        </label>
                                        <select className="select select-bordered w-full" required>
                                             <option value="" disabled selected>Select relationship</option>
                                             <option value="parent">Parent</option>
                                             <option value="sibling">Sibling</option>
                                             <option value="spouse">Spouse</option>
                                             <option value="friend">Friend</option>
                                             <option value="relative">Relative</option>
                                             <option value="other">Other</option>
                                        </select>
                                   </div>


                                   {/* Submit Buttons */}
                                   <div className="flex gap-3 pt-4">
                                        <button type="submit" className="btn btn-primary flex-1">
                                             Save Contact
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
