import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav"
import MyCircle from "../components/MyCircle"
import Axios from "../services/axios";

function Scan() {
     const [users, setUsers] = useState([]);

     useEffect(() => {
          const fetchUsers = async () => {
               const res = await Axios.get("/users/view/all");
               setUsers(res.data.data.map(user => ({
                    id: user._id,
                    name: `${user.fname} ${user.lname}`,
                    phone: user.phone,
                    angle: Math.floor(Math.random() * 360),
               })));
          }
          fetchUsers();
     }, [])

     return (
          <main className="h-screen flex items-center pt-[80px] flex-col gap-[60px] p-3 overflow-x-hidden">

               <div className="text-center flex flex-col gap-2">
                    <h3 className="text-[28px] font-semibold">Calling emergency...</h3>
                    <p>Please stand by, we are currently requesting for help. Your emergency contacts and nearby rescue services would see your call for help </p>
               </div>

               <div className="relative -r-8">
                    <MyCircle contacts={users} size={400} />
               </div>
               <BottomNav />
          </main>
     )
}

export default Scan
