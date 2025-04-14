import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

function ForgetPassword() {
     const [phoneNumber, setPhoneNumber] = useState('')

     return (
          <main className="h-screen w-full flex items-center justify-center">
               <div className="flex flex-col gap-[40px] w-[86%] mx-auto">
                    <div className="flex justify-center">
                         <img src="/assets/logo/logo-no-bg.png" className="object-contain" width={300} height={300} alt="Logo" />
                    </div>

                    <div className="text-center space-y-1.5">
                         <h3 className="text-3xl font-medium">Forgot Password</h3>
                         <h4 className="text-xl">Help recover your account</h4>
                    </div>

                    <form className="flex flex-col gap-10">
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

                         <button className="btn btn-neutral btn-block text-xl relative bottom-2"> Send Verification Code </button>
                    </form>
               </div>
          </main>
     )
}

export default ForgetPassword
