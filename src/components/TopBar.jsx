import { Bell, Camera, UserCircle2 } from 'lucide-react'
import React from 'react'
import LocationRender from './LocationRender'
import { Link } from 'react-router-dom'

export default function TopBar() {
     return (
          <>
               <div className='flex items-center justify-between px-3 py-5 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex items-center gap-3'>
                         <div className='bg-white p-2 rounded-lg'>
                              <img src="/assets/logo/symbol.png" className='size-[35px] object-cover' width={100} height={100} alt="Logo" />
                         </div>

                         <LocationRender />
                    </div>

                    <div className='flex gap-5'>
                         <Link to="/notifications" className='indicator'>
                              <span className="indicator-item status status-neutral"></span>
                              <Bell size={35} fill='#313a51' stroke='#313a51' />
                         </Link>
                         <Link to="/profile/personal">
                              <UserCircle2 size={39} stroke='#313a51' />
                         </Link>
                    </div>
               </div>


          </>
     )
}
