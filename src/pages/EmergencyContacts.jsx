import { ChevronLeft, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import EmergencyContactCard from '../components/EmergencyContactCard';

function EmergencyContacts() {
     const emergencyContacts = [
          { id: 1, name: 'Emmy Jackson', relation: 'Sister', phone: '+250 788 123 456' },
          { id: 2, name: 'John Smith', relation: 'Father', phone: '+250 788 234 567' },
          { id: 3, name: 'Sarah Connor', relation: 'Friend', phone: '+250 788 345 678' },
          { id: 4, name: 'Mike Ross', relation: 'Brother', phone: '+250 788 456 789' },
     ];

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

                    {/* Contacts List */}
                    <div className="space-y-4">
                         {emergencyContacts.map((contact) => (
                              <EmergencyContactCard key={contact.id} contact={contact} />
                         ))}
                    </div>
               </div>
          </>
     )
}

export default EmergencyContacts
