import { useState } from "react"
import BottomNav from "../components/BottomNav"
// @ts-ignore
import EmergencyPin from "../components/EmergencyPin"
import { AccidentIcon, DisastersIcon, FireIcon, MedicalIcon, RescueIcon, ViolenceIcon } from "../components/Icons"
import SosContainer from "../components/SosContainer"
import TopBar from "../components/TopBar"

function Home() {
     const [activeEmergencies, setActiveEmergencies] = useState([]);

     const toggleEmergency = (emergencyType) => {
          setActiveEmergencies(prev => {
               if (prev.includes(emergencyType)) {
                    return prev.filter(type => type !== emergencyType);
               }
               return [...prev, emergencyType];
          });
     };

     return (
          <>
               <TopBar />

               <div className="grid grid-cols-2 p-3 mt-[30px] items-center">
                    <div className="space-y-[10px]">
                         <h3 className="text-3xl font-semibold">Are you in an emergency?</h3>
                         <p className="text-[17px]">Press the SOS button, your live location will be shared wih the nearest help centre and your emergency contacts  </p>
                    </div>
                    <div>
                         <img src="/assets/illustrations/hero.svg" width={500} height={500} alt="Hero" />
                    </div>
               </div>

               <SosContainer activeEmergencies={activeEmergencies} />

               <div className="mt-[30px] mb-[130px] p-3 space-y-6">
                    <div className="flex justify-between items-center">
                         <h3 className="text-xl font-semibold">What's your emergency?</h3>
                         {activeEmergencies.length > 0 && (
                              <span className="text-sm text-gray-600">
                                   {activeEmergencies.length} selected
                              </span>
                         )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                         <EmergencyPin
                              title="Medical"
                              icon={<MedicalIcon />}
                              color="#dbe790"
                              isActive={activeEmergencies.includes('Medical')}
                              onClick={() => toggleEmergency('Medical')}
                         />
                         <EmergencyPin
                              title="Fire"
                              icon={<FireIcon />}
                              color="#f5a6a6"
                              isActive={activeEmergencies.includes('Fire')}
                              onClick={() => toggleEmergency('Fire')}
                         />
                         <EmergencyPin
                              title="Disasters"
                              icon={<DisastersIcon />}
                              color="#a6f5d4"
                              isActive={activeEmergencies.includes('Disasters')}
                              onClick={() => toggleEmergency('Disasters')}
                         />
                         <EmergencyPin
                              title="Accident"
                              icon={<AccidentIcon />}
                              color="#d4cefa"
                              isActive={activeEmergencies.includes('Accident')}
                              onClick={() => toggleEmergency('Accident')}
                         />
                         <EmergencyPin
                              title="Violence"
                              icon={<ViolenceIcon />}
                              color="#f5a6df"
                              isActive={activeEmergencies.includes('Violence')}
                              onClick={() => toggleEmergency('Violence')}
                         />
                         <EmergencyPin
                              title="Rescue"
                              icon={<RescueIcon />}
                              color="#f5e8a6"
                              isActive={activeEmergencies.includes('Rescue')}
                              onClick={() => toggleEmergency('Rescue')}
                         />
                    </div>
               </div>

               <BottomNav />
          </>
     )
}

export default Home
