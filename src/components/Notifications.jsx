import { AlertOctagon, AlertTriangle, CheckCircle, ChevronLeft, Inbox, Info, X } from "lucide-react"
import BottomNav from "./BottomNav"
import { Link } from "react-router-dom"
import { useState } from "react"

function Notifications() {
     const [notifications, setNotifications] = useState([
          {
               id: 1,
               type: "warning",
               title: "Mellow",
               message: "particularly temperature copper send indicate expect right serious",
               isRead: false
          }
     ])

     const markAllAsRead = () => {
          setNotifications(notifications.map(notif => ({ ...notif, isRead: true })))
     }

     const handleDeleteNotification = (id) => {
          setNotifications(notifications.filter(notif => notif.id !== id))
     }

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Notifications</h3>
                    </div>

                    <button
                         onClick={markAllAsRead}
                         className="btn flex items-center gap-1 text-neutral"
                    >
                         <Inbox /> Mark all as read
                    </button>
               </div>

               <div className="grid grid-cols-1 p-3 gap-5">
                    {notifications.map((notification) => (
                         <div
                              key={notification.id}
                              className={`flex items-center justify-between p-4 bg-white rounded-lg shadow ${notification.isRead ? 'opacity-70' : ''
                                   }`}
                         >
                              <div className="flex items-center gap-3">
                                   {notification.type === 'success' && (
                                        <div className={`p-2 ${notification.isRead ? 'bg-green-50' : 'bg-green-100'} rounded-full`}>
                                             <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                   )}
                                   {notification.type === 'warning' && (
                                        <div className={`p-2 ${notification.isRead ? 'bg-yellow-50' : 'bg-yellow-100'} rounded-full`}>
                                             <AlertTriangle className="w-5 h-5 text-yellow-500" />
                                        </div>
                                   )}
                                   {notification.type === 'error' && (
                                        <div className={`p-2 ${notification.isRead ? 'bg-red-50' : 'bg-red-100'} rounded-full`}>
                                             <AlertOctagon className="w-5 h-5 text-red-500" />
                                        </div>
                                   )}
                                   {notification.type === 'info' && (
                                        <div className={`p-2 ${notification.isRead ? 'bg-blue-50' : 'bg-blue-100'} rounded-full`}>
                                             <Info className="w-5 h-5 text-blue-500" />
                                        </div>
                                   )}
                                   <div>
                                        <h4 className={`font-medium ${notification.isRead ? 'text-gray-600' : 'text-black'}`}>
                                             {notification.title}
                                        </h4>
                                        <p className={`text-sm ${notification.isRead ? 'text-gray-400' : 'text-gray-500'}`}>
                                             {notification.message}
                                        </p>
                                   </div>
                              </div>
                              <button
                                   onClick={() => handleDeleteNotification(notification.id)}
                                   className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                   <X className="w-5 h-5" />
                              </button>
                         </div>
                    ))}
               </div>

               <BottomNav />
          </>
     )
}

export default Notifications
