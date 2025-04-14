import { Compass, Contact, House, Siren, User2 } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function BottomNav() {
     return (
          <div className="dock dock-xl h-[85px] w-[90%] mx-auto rounded-2xl bg-[#f5f5fa] shadow-md border-t-0 mb-3 z-50">
               <NavLink to="/" className={({ isActive }) => isActive ? "dock-active" : ""}>
                    <House size={30} />
                    <span className="text-[15px] mb-2">Home</span>
               </NavLink>

               <NavLink to="/sos/reports" className={({ isActive }) => isActive ? "dock-active" : ""}>
                    <Siren size={30} />
                    <span className="text-[15px] mb-2">Reports</span>
               </NavLink>

               <NavLink to="/map" className={({ isActive }) => isActive ? "dock-active" : ""}>
                    <Compass size={30} />
                    <span className="text-[15px] mb-2">Map</span>
               </NavLink>

               <NavLink to="/profile" className={({ isActive }) => isActive ? "dock-active" : ""}>
                    <User2 size={30} />
                    <span className="text-[15px] mb-2">Profile</span>
               </NavLink>
          </div>
     )
}
