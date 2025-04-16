import { ChevronLeft, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import EmergencyContactCard from '../components/EmergencyContactCard';
import { getContacts, deleteContact } from '../services/contactService';

function EmergencyContacts() {
     const [contacts, setContacts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetchContacts();
     }, []);

     async function fetchContacts() {
          try {
               const data = await getContacts();
               setContacts(data);
          } finally {
               setLoading(false);
          }
     }

     async function handleDelete(id) {
          try {
               await deleteContact(id);
               setContacts(contacts.filter(contact => contact._id !== id));
          } catch (error) {
               console.error("Failed to fetch contacts", error)
          }
     }

     return (
          <>
               <div className='flex items-center justify-between px-3 py-7 pt-8 bg-[#f6f0e8] text-black'>
                    <div className='flex gap-3'>
                         <Link to="/profile" className='bg-white p-1 rounded-full'>
                              <ChevronLeft />
                         </Link>
                         <h3 className="text-[20px] font-medium">Emergency Contacts</h3>
                    </div>

                    <Link to="/profile/contacts/new" className="btn flex items-center gap-1 text-neutral">
                         <Plus size={20} />
                         Add Contact
                    </Link>
               </div>

               <div className="p-4">
                    {loading ? (
                         <div className="flex justify-center items-center h-40">
                              <span className="loading loading-spinner loading-lg"></span>
                         </div>
                    ) : contacts.length === 0 ? (
                         <div className="text-center text-gray-500 mt-10">
                              <p>No emergency contacts added yet.</p>
                              <p>Add your first contact to get started.</p>
                         </div>
                    ) : (
                         <div className="space-y-4">
                              {contacts.map((contact) => (
                                   <EmergencyContactCard
                                        key={contact._id}
                                        contact={contact}
                                        onDelete={() => handleDelete(contact._id)}
                                   />
                              ))}
                         </div>
                    )}
               </div>
          </>
     )
}

export default EmergencyContacts
