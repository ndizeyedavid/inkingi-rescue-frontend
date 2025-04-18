import { UserCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function MyCircle({ contacts = [], size = 300 }) {
     const [hoveredContact, setHoveredContact] = useState(null);
     const [counter, setCounter] = useState(60);
     const [rotation, setRotation] = useState(0);
     const radius = size * 0.4; // Dynamic radius based on container size
     const centerSize = size * 0.26; // Dynamic center circle size

     const demoContacts = [
          { id: 1, name: 'Emmy Jackson', role: 'Friend', angle: 0 },
          { id: 2, name: 'Sister', role: 'Family', angle: 90 },
          { id: 3, name: 'Dad', role: 'Family', angle: 180 },
          { id: 4, name: 'Albert', role: 'Friend', angle: 270 },
     ];

     // Use provided contacts if available, otherwise use demo contacts
     const displayContacts = contacts.length > 0 ? contacts : demoContacts;

     // Animation for rotation
     useEffect(() => {
          const interval = setInterval(() => {
               setRotation(prev => (prev + 0.3) % 360);
          }, 50);

          setInterval(() => {
               counter > 0 ? setCounter(prev => prev - 1) : setCounter(60);
          }, 1000);

          return () => clearInterval(interval);
     }, []);

     return (
          <div className="relative mx-auto" style={{ width: size, height: size }}>
               {/* Background Gradient */}
               <motion.div
                    className="absolute inset-0 -z-10 rounded-full
                         bg-gradient-to-r from-red-500 to-orange-500 blur-[140px]"
                    animate={{
                         opacity: [0.5, 0.7, 0.5],
                    }}
                    transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut"
                    }}
               />

               {/* White Ring around center */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    rounded-full bg-white shadow-md z-0"
                    style={{
                         width: centerSize * 1.4,
                         height: centerSize * 1.4
                    }}
               />

               {/* Center Circle */}
               <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         rounded-full bg-gradient-to-br from-red-400 to-orange-300
                         flex items-center justify-center text-white font-bold
                         shadow-lg z-10"
                    style={{ width: centerSize, height: centerSize }}
                    animate={{
                         scale: [1, 1.05, 1],
                    }}
                    transition={{
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut"
                    }}
               >
                    <span style={{ fontSize: centerSize * 0.3 }}>{counter < 10 ? "0" + counter : counter}</span>
               </motion.div>

               {/* Orbital Paths - Dashed circles */}
               <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         rounded-full border border-dashed border-white"
                    style={{
                         width: radius * 2,
                         height: radius * 2,
                         opacity: 0.4
                    }}
               />

               {/* Contact Avatars with trajectory dots */}
               {displayContacts.map((contact, idx) => (
                    <div key={contact.id || idx}>
                         {/* Trajectory dots */}
                         {[...Array(24)].map((_, dotIdx) => (
                              <div
                                   key={`dot-${contact.id || idx}-${dotIdx}`}
                                   className="absolute w-1 h-1 rounded-full bg-white"
                                   style={{
                                        top: '50%',
                                        left: '50%',
                                        opacity: dotIdx % 3 === 0 ? 0.8 : 0.3,
                                        transform: `rotate(${contact.angle + rotation + (dotIdx * 15)}deg) translateX(${radius}px)`,
                                   }}
                              />
                         ))}

                         {/* Contact Avatar */}
                         <div
                              className="absolute w-12 h-12"
                              style={{
                                   top: '50%',
                                   left: '50%',
                                   transform: `rotate(${contact.angle + rotation}deg) translateX(${radius}px) rotate(-${contact.angle + rotation}deg)`,
                              }}
                         >
                              <div
                                   className="relative group"
                                   onMouseEnter={() => setHoveredContact(contact.id || idx)}
                                   onMouseLeave={() => setHoveredContact(null)}
                              >
                                   <motion.div
                                        className="w-12 h-12 rounded-full bg-white shadow-md
                                             flex items-center justify-center cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                   >
                                        <UserCircle className="w-8 h-8 text-gray-600" />
                                   </motion.div>

                                   <motion.div
                                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2
                                             text-xs text-gray-700 font-medium whitespace-nowrap"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                             opacity: hoveredContact === (contact.id || idx) ? 1 : 0.7,
                                        }}
                                   >
                                        {contact.name}
                                   </motion.div>
                              </div>
                         </div>
                    </div>
               ))}
          </div>
     );
}