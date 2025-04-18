import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function SosContainer({ activeEmergencies }) {
     const navigate = useNavigate();
     const [progress, setProgress] = useState(0);
     const timerRef = useRef(null);
     const pressStartTime = useRef(null);

     const handleMouseDown = () => {
          pressStartTime.current = Date.now();
          timerRef.current = setInterval(() => {
               const elapsedTime = Date.now() - pressStartTime.current;
               const newProgress = Math.min((elapsedTime / 3000) * 100, 100);
               setProgress(newProgress);

               if (newProgress >= 100) {
                    clearInterval(timerRef.current);
                    if (activeEmergencies.length > 0) {
                         navigate("/sos/new/" + activeEmergencies[0].toLowerCase());
                    } else {
                         toast.error('Select an emergency first')
                         setProgress(0);
                    }
               }
          }, 10);
     };

     const handleMouseUp = () => {
          clearInterval(timerRef.current);
          setProgress(0);
     };

     return (
          <div className='mt-[30px] p-3 h-[406px]'>
               <div className='w-full h-full shadow-lg bg-base-200 rounded-3xl flex items-center justify-center'>
                    <div className='relative w-[290px] h-[290px] rounded-full bg-white shadow-[inset_2px_2px_10px_rgba(0,0,0,0.2),_inset_-2px_-2px_10px_rgba(255,255,255,0.2)]
                         flex items-center justify-center'>
                         <div className='absolute w-full h-full rounded-full shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.2),_inset_2px_2px_10px_rgba(255,255,255,0.3)]'
                              style={{
                                   background: `conic-gradient(#e6491e ${progress}%, transparent ${progress}%)`,
                              }}
                         />
                         <button
                              className='relative w-[230px] h-[230px] rounded-full bg-radial from-[#ffa85d] from-0% to-[#ff8279] to-100% text-white font-bold text-2xl                         
                                   active:shadow-[inset_2px_2px_10px_rgba(0,0,0,0.2),_inset_-2px_-2px_10px_rgba(255,255,255,0.3)]
                                   transition-all duration-150 flex flex-col items-center justify-center z-10'
                              onMouseDown={handleMouseDown}
                              onMouseUp={handleMouseUp}
                              onMouseLeave={handleMouseUp}
                              onTouchStart={handleMouseDown}
                              onTouchEnd={handleMouseUp}>
                              <span className='text-5xl select-none'>SOS</span>
                              <span className='text-lg mt-2 font-normal select-none'>Press 3 for second</span>
                         </button>
                    </div>
               </div>
          </div>
     )
}
