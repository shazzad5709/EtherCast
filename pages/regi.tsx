import Link from 'next/link';
import React from 'react'

const Registration = () => {
      
    return <>

   <div className="body">

        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div className="signup">
                <form>
                    <label htmlFor="chk" aria-hidden="true">Log In</label>
                    <input type="text" name="txt" placeholder="User name" required className="inputStyle" />
                    <input type="email" name="email" placeholder="Email" required className="inputStyle" />
                    <input type="password" name="pswd" placeholder="Password" required className="inputStyle"/>
                    <button>Log In</button>
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
