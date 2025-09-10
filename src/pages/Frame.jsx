import React from 'react'

function Frame() {
     return (
          <section className='absolute top-[-90px] bg-[#1d232a] right-0 left-0 flex justify-center '>
               <div className="mockup-phone scale-[77%]">
                    {/* <div className="mockup-phone-camera"></div> */}
                    <div className="mockup-phone-display">
                         <iframe src="https://inkingirescue.netlify.app" className='h-full w-[101%]'></iframe>
                    </div>
               </div>
          </section>
     )
}

export default Frame
