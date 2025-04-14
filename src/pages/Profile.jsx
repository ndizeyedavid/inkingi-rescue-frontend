import { Link } from "react-router-dom"
import BottomNav from "../components/BottomNav"
import { UserCircleIcon, Users, ShieldCheckIcon, BellIcon, PhoneIcon, KeyIcon, ChevronRightIcon, Palette, LogOut } from "lucide-react"

function Profile() {
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

     return (
          <div className="pb-24">
               {/* Header */}
               <div className="bg-gray-50 p-6 h-[150px] rounded-[0_0_30px_30px] flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                         <UserCircleIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <div>
                         <h2 className="text-xl font-semibold">John Doe</h2>
                         <p className="text-gray-500">+250 788 123 456</p>
                    </div>
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
                                             className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
                                        >
                                             <div className="flex items-center space-x-3">
                                                  <div className="text-gray-600">
                                                       {setting.icon}
                                                  </div>
                                                  <span className="text-gray-700">{setting.name}</span>
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
