export default function EmergencyPin({ title, icon, color, isActive, onClick }) {
     return (
          <button
               onClick={onClick}
               className={`flex items-center space-x-3 rounded-full py-3 px-3 shadow-md hover:shadow-lg transition-all
                    ${isActive
                         ? 'bg-base-200 ring-2 ring-gray-300 shadow-inner'
                         : 'bg-base-100'
                    }`}
          >
               <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform
                         ${isActive ? 'scale-110' : ''}`}
                    style={{ backgroundColor: color }}
               >
                    {icon}
               </div>
               <span className={`font-medium ${isActive ? 'text-primary' : 'text-secondary'}`}>
                    {title}
               </span>
          </button>
     )
}
