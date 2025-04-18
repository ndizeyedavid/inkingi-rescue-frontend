import { Link } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import { UserCircleIcon, Users, ShieldCheckIcon, ChevronRightIcon, Palette, LogOut } from "lucide-react"
import { getCurrentUser, logoutUser } from "../services/authService"

function Profile() {

     function handleLogout() {
          if (confirm("Are you sure you want to log out?")) {
               logoutUser();
          }
     }

     const settingsGroups = [
          {
               title: "Account",
               settings: [
                    { name: "Personal Information", icon: <UserCircleIcon className="w-6 h-6" />, link: "/profile/personal" },
                    { name: "Emergency Contacts", icon: <Users className="w-6 h-6" />, link: "/profile/contacts" },
                    { name: "Security", icon: <ShieldCheckIcon className="w-6 h-6" />, link: "/profile/security" },
               ]
          },
          {
               title: "Preferences",
               settings: [
                    { name: "Theme", icon: <Palette className="w-6 h-6" />, link: "/profile/theme" },
               ]
          }
     ]

     const userInfo = getCurrentUser();

     return (
          <div className="pb-24">
               {/* Header */}
               <div className="bg-base-100 p-6 h-[150px] flex items-center justify-between rounded-[0_0_30px_30px] shadow">
                    <div className="flex items-center space-x-2">
                         <div className="w-20 h-20 rounded-full bg-base-300 flex items-center justify-center">
                              <UserCircleIcon className="w-12 h-12 t" />
                         </div>
                         <div>
                              <h2 className="text-xl font-semibold">{userInfo?.fname + " " + userInfo?.lname}</h2>
                              <p className="">{userInfo?.phone}</p>
                         </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center btn btn-outline btn-danger">
                         <LogOut className="w-6 h-6" />
                         <span>Log Out</span>
                    </button>
               </div>

               {/* Settings Groups */}
               <div className="p-6 space-y-8">
                    {settingsGroups.map((group, index) => (
                         <div key={index} className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-700">{group.title}</h3>
                              <div className="space-y-2">
                                   {group.settings.map((setting, idx) => (
                                        <Link
                                             to={setting.link}
                                             key={idx}
                                             className="w-full flex items-center justify-between p-4 bg-base-100 outline rounded-xl shadow-sm hover:bg-base-200 transition-colors"
                                        >
                                             <div className="flex items-center space-x-3">
                                                  <div className="text-gray-600">
                                                       {setting.icon}
                                                  </div>
                                                  <span className="">{setting.name}</span>
                                             </div>
                                             <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                        </Link>
                                   ))}
                              </div>
                         </div>
                    ))}

               </div>

               <BottomNav />
          </div>
     )
}

export default Profile
