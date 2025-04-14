import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Link } from "react-router-dom"
import { useState } from "react"

function Signup() {
     const [phoneNumber, setPhoneNumber] = useState('')


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

                    <form className="flex flex-col gap-4">
                         <div className="grid grid-cols-2 gap-2">
                              <label className="floating-label">
                                   <input type="text" placeholder="First Name" className="input input-lg outline-none focus:border-none w-full" />
                                   <span>First Name</span>
                              </label>
                              <label className="floating-label">
                                   <input type="text" placeholder="Last Name" className="input input-lg outline-none focus:border-none w-full" />
                                   <span>Last Name</span>
                              </label>
                         </div>
                         <label className="floating-label">
                              <PhoneInput
                                   international
                                   defaultCountry="RW"
                                   placeholder="Phone"
                                   className="input input-lg outline-none focus:border-none w-full"
                                   value={phoneNumber}
                                   onChange={setPhoneNumber}
                              />
                              <span>Phone</span>
                         </label>
                         <label className="floating-label">
                              <input type="text" placeholder="Email" className="input input-lg outline-none focus:border-none w-full" />
                              <span>Email</span>
                         </label>
                         <label className="floating-label">
                              <input type="password" placeholder="Password" className="input input-lg outline-none focus:border-none w-full" />
                              <span>Password</span>
                         </label>
                         <label className="floating-label">
                              <input type="password" placeholder="Confirm Password" className="input input-lg outline-none focus:border-none w-full" />
                              <span>Confirm Password</span>
                         </label>

                         <button className="btn btn-neutral btn-block text-xl"> Enroll </button>

                         <span className="text-center relative top-3">Already have an account? <Link to="/login" className="w-fit text-[#e6491e] pb-[0.5px] border-b">Login</Link></span>
                    </form>
               </div>
          </main>
     )
}

export default Signup
