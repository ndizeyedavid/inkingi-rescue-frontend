import { ChevronLeft, Plus } from "lucide-react"
import BottomNav from "../components/BottomNav"
import { Link } from "react-router-dom"
import Searchbar from "../components/Searchbar"
import SingleReport from "../components/SingleReport"
import { MedicalIcon } from "../components/Icons"

function Report() {
     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex  gap-3'>
                         <button className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </button>

                         <h3 className="text-[20px] font-medium">Reports</h3>
                    </div>

                    <Link to="/sos/new" className="flex items-center gap-1 text-neutral">
                         <Plus /> Report emergency
                    </Link>
               </div>

               <Searchbar />

               <div className="p-3 mt-[20px] grid grid-cols-1 gap-5">
                    <SingleReport
                         emergencyType="Medical"
                         status="Active"
                         date="2024-01-20 14:30"
                         location="Kigali, Rwanda"
                         reporter="John Doe"
                         phone="+250 788 123 456"
                         isVolunteered={false}
                    />
               </div>

               <BottomNav />
          </>
     )
}

export default Report
