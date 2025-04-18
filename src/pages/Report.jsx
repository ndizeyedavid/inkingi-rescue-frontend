import { ChevronLeft, Plus } from "lucide-react"
import BottomNav from "../components/BottomNav"
import { Link } from "react-router-dom"
import Searchbar from "../components/Searchbar"
// @ts-ignore
import SingleReport from "../components/SingleReport"
import { useEffect, useState } from "react"
import { getSosReports } from "../services/sosService"
import { getCurrentUser } from "../services/authService"

function Report() {
     const [reports, setReports] = useState([]);
     const [loading, setLoading] = useState(true);
     const [dummy, setDummy] = useState(0);

     useEffect(() => {
          async function fetchReports() {
               try {
                    const data = await getSosReports();
                    setReports(data);
               } catch (e) {
                    setReports([]);
               } finally {
                    setLoading(false);
               }
          }
          fetchReports();
     }, [dummy]);

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-base-200'>
                    <div className='flex  gap-3'>
                         <Link to="/" className='bg-base-100 p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>

                         <h3 className="text-[20px] font-medium">Reports</h3>
                    </div>

                    <Link to="/sos/new" className="flex items-center gap-1 text-neutral">
                         <Plus /> Report emergency
                    </Link>
               </div>

               <Searchbar />

               <div className="p-3 mt-[20px] grid grid-cols-1 gap-5 mb-[100px]">
                    {loading ? (
                         <div className="text-center text-gray-500">Loading reports...</div>
                    ) : reports.length === 0 ? (
                         <div className="text-center text-gray-500">No reports found.</div>
                    ) : (
                         reports.map((report) => (
                              <SingleReport
                                   data={report}
                                   key={report._id}
                                   emergencyType={report.sos_type || "Unknown"}
                                   status={report.status || "Resolved"}
                                   date={report.postDate ? new Date(report.postDate).toLocaleString() : ""}
                                   location={report.location}
                                   reporter={report.user?.fname + " " + report.user?.lname || "Unknown"}
                                   phone={report.user?.phone || ""}
                                   isVolunteered={report.volunteers?.some(volunteer => volunteer.user._id == getCurrentUser()._id) || false}
                                   setReports={setDummy}
                              />
                         ))
                    )}
               </div>

               <BottomNav />
          </>
     )
}

export default Report
