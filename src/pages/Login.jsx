import { Link } from "react-router-dom"
import { loginUser } from '../services/authService';
import { useState } from "react";
import { useForm } from "react-hook-form";

function Login() {

     const [loading, setLoaidng] = useState(false);

     const { register, handleSubmit, reset } = useForm();

     async function login(data) {
          setLoaidng(true);
          const act = await loginUser(data)

          console.log(act)
          // setLoaidng(false);
     }

     return (
          <main className="h-screen w-full flex items-center justify-center">
               <div className="flex flex-col gap-[40px] w-[86%] mx-auto">
                    <div className="flex justify-center">
                         <img src="/assets/logo/logo-no-bg.png" className="object-contain" width={300} height={300} alt="Logo" />
                    </div>

                    <div className="text-center space-y-1.5">
                         <h3 className="text-3xl font-medium">Welcome Back</h3>
                         <h4 className="text-xl">Login to access your account</h4>
                    </div>

                    <form onSubmit={handleSubmit(login)} className="flex flex-col gap-7">
                         <label className="floating-label">
                              <input type="text" placeholder="Email" className="input input-lg outline-none focus:border-none w-full" {...register("email")} />
                              <span>Email</span>
                         </label>
                         <label className="floating-label">
                              <input type="password" placeholder="Password" className="input input-lg outline-none focus:border-none w-full" {...register("password")} />
                              <span>Password</span>
                         </label>
                         <div className="text-right relative bottom-3">
                              <Link to="/forget-password" className="w-fit text-[#e6491e] pb-[0.5px] border-b">Forgot Password?</Link>
                         </div>

                         <button type="submit" disabled={loading} className="btn btn-neutral btn-block text-xl relative bottom-2">
                              {loading ? <span className="loading loading-spinner"></span> : "Login"}
                         </button>

                         <span className="text-center relative top-3">Don't have an account? <Link to="/signup" className="w-fit text-[#e6491e] pb-[0.5px] border-b">Signup</Link></span>
                    </form>
               </div>
          </main>
     )
}

export default Login
