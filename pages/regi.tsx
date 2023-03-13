import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const validAdmin = {
  uname: "admin",
  pswd: "admin12@3",
  code: 1245
};


const Registration = () => {

    const [uname, setUsername] = useState<any>();
  const [pswd, setPassword] = useState<any>();
  const [code, setCode] = useState<number>();
  const [error, setError] = useState<any>();
  const router = useRouter();

  const handleLogin = (event:any) => {
    event.preventDefault();
    if (uname === validAdmin.uname && pswd === validAdmin.pswd && code === validAdmin.code) {
      // Navigate to admin dashboard
      router.push("/dashboard");
      
    } else {
      setError(
        <div>
          <div className="bg-blue-100 border text-center border-blue-400 text-red-700 px-4 py-2 rounded relative" role="alert">
            <strong className="font-bold text-center">Invalid Credentials !!!</strong>
            
          </div>
        </div>
      );
    }
  };

    
    return <>

   <div className="body">

        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form method='POST' action='/api/login' onSubmit={handleLogin}>
                    <label htmlFor="chk" aria-hidden="true">Log In</label>
                    <input  type="text" name="uname" placeholder="User name" value={uname}
                    onChange={(e) => setUsername(e.target.value)} required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-16 my-2 py-1 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 " />

                   <input type="number" name="code" placeholder="Election Code" value={code}
                    onChange={(e) => setCode(parseInt(e.target.value))} 
                    required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-16 my-2 py-1 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />

                    <input type="password" name="pswd" placeholder="Password" value={pswd}
                    onChange={(e) => setPassword(e.target.value)} required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-16 my-2 py-1 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"/>
                    <button type="submit">Login</button>
                    {error && <div>{error}</div>}
                </form>
            </div>

            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true" id="ap">Voter Apply </label>
                    <input type="text" name="email" placeholder="Employee ID" required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-16 my-2 py-1 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    <input type="text" name="pswd" placeholder="Election Code" required className="bg-gray-200 appearance-none border-2 border-gray-200 rounded ml-16 my-2 py-1 px-4 text-gray-500 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" />
                    <button> <Link href='/login'></Link> Apply </button>
                </form>
            </div>
        </div>

   </div>
    </>
};
 
export default Registration;
