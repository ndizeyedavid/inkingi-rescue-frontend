import { Mic, Search } from "lucide-react";

export default function Searchbar() {
     return (
          <div className="p-3">
               <label className="mt-[10px] input input-lg outline-none focus:border-none rounded-2xl w-full">
                    <Search />
                    <input type="search" required placeholder="Search" />
                    <Mic />
               </label>
          </div>
     )
}
