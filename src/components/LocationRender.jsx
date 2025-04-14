import { MapPin } from "lucide-react";

export default function LocationRender() {
     return (
          <div className='space-y-0.5'>
               <h4 className='font-medium'>Current Location</h4>
               <div className='flex gap-1 items-center'><MapPin size={30} stroke='#f6f0e8' fill='#000' /><span>KK 201, Kimironko</span></div>
          </div>
     )
}
