import { ChevronLeft, Moon, Sun, CassetteTape, Waves, AirVent, Sunset, Leaf, CakeSlice, Flower2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

function ThemePage() {
     const [currentTheme, setCurrentTheme] = useState(() => {
          return localStorage.getItem('theme') || 'caramellatte';
     });

     useEffect(() => {
          const savedTheme = localStorage.getItem('theme');
          if (savedTheme) {
               setCurrentTheme(savedTheme);
               document.documentElement.setAttribute('data-theme', savedTheme);
          }
     }, []);

     const handleThemeChange = (themeId) => {
          setCurrentTheme(themeId);
          localStorage.setItem('theme', themeId);
          document.documentElement.setAttribute('data-theme', themeId);
     };

     const themes = [
          { id: 'caramellatte', name: 'Default', icon: Sun },
          { id: 'dark', name: 'Dark', icon: Moon },
          { id: 'retro', name: 'Retro', icon: CassetteTape },
          { id: 'synthwave', name: 'Synthwave', icon: Waves },
          { id: 'lofi', name: 'lofi', icon: AirVent },
          { id: 'sunset', name: 'Sunset', icon: Sunset },
          { id: 'autumn', name: 'Autumn', icon: Leaf },
          { id: 'cupcake', name: 'Cupcake', icon: CakeSlice },
          { id: 'garden', name: 'garden', icon: Flower2 },
     ];

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/profile" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Preference</h3>
                    </div>
               </div>

               <div className="p-4 max-w-xl mx-auto">
                    {/* Theme Mode Selection */}
                    <div className="card bg-base-100 shadow-xl mb-6">
                         <div className="card-body">
                              <h2 className="card-title mb-4">Theme Mode</h2>
                              <div className="grid grid-cols-3 gap-4">
                                   {themes.map(({ id, name, icon: Icon }) => (
                                        <button
                                             key={id}
                                             className={`btn btn-outline h-auto py-4 flex flex-col gap-2
                                                  ${currentTheme === id ? 'btn-active' : ''}`}
                                             onClick={() => handleThemeChange(id)}
                                        >
                                             <Icon size={24} />
                                             <span>{name}</span>
                                        </button>
                                   ))}
                              </div>
                         </div>
                    </div>
               </div>
          </>
     )
}

export default ThemePage
