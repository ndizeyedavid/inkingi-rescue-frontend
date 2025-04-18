import { Bell, Bot, Camera, UserCircle2 } from 'lucide-react'
import React from 'react'
import LocationRender from './LocationRender'
import { Link } from 'react-router-dom'

export default function TopBar() {
     return (
          <>
               <div className='flex items-center justify-between px-3 py-5 pt-8 bg-base-200 rounded-[0_0_20px_20px] shadow-sm'>
                    <div className='flex items-center gap-3'>
                         <div className='bg-white p-2 rounded-lg'>
                              <img src="/assets/logo/symbol.png" className='size-[35px] object-cover' width={100} height={100} alt="Logo" />
                         </div>

                         <LocationRender />
                    </div>

                    <div className='flex gap-3'>
                         <Link to="/ai">
                              <Bot size={39} className='btn p-1 btn-circle btn-base-200' />
                         </Link>
                         <Link to="/profile/personal">
                              <UserCircle2 size={39} className='btn p-1 btn-circle btn-base-200' />
                         </Link>
                    </div>
               </div>


          </>
     )
}
