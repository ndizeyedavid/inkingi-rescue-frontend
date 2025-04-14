import MyCircle from "../components/MyCircle"

function Scan() {
     return (
          <main className="h-screen flex items-center justify-center flex-col gap-[60px] p-3 overflow-x-hidden">

               <div className="text-center flex flex-col gap-2">
                    <h3 className="text-[28px] font-semibold">Calling emergency...</h3>
                    <p>Please stand by, we are currently requesting for help. Your emergency contacts and nearby rescue services would see your call for help </p>
               </div>

               <div className="relative -r-8">
                    <MyCircle size={400} />
               </div>
          </main>
     )
}

export default Scan
