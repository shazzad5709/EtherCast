import Link from 'next/link';
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
  const [error, setError] = useState("");

  const handleLogin = (event:any) => {
    event.preventDefault();
    if (uname === validAdmin.uname && pswd === validAdmin.pswd) {
      // Navigate to admin dashboard
      alert("Admin login successful");
    } else {
      setError("Invalid username or password");
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
                    onChange={(e) => setUsername(e.target.value)} required className="inputStyle" />

                   <input type="number" name="code" placeholder="Election Code" value={code}
                    onChange={(e) => setCode(parseInt(e.target.value))} 
                    required className="inputStyle" />

                    <input type="password" name="pswd" placeholder="Password" value={pswd}
                    onChange={(e) => setPassword(e.target.value)} required className="inputStyle"/>
                    <button type="submit">Login</button>
                    {error && <div>{error}</div>}
                </form>
            </div>

            <div className="login">
                <form>
                    <label htmlFor="chk" aria-hidden="true" id="ap">Voter Apply </label>
                    <input type="text" name="email" placeholder="Employee ID" required className="inputStyle" />
                    <input type="text" name="pswd" placeholder="Election Code" required className="inputStyle" />
                    <button> <Link href='/login'></Link> Apply </button>
                </form>
            </div>
        </div>

   </div>
    </>
};
 
export default Registration;
