import React from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { FiUserPlus } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

const Navbar = () => {
  return (
    <div>
      <div className='dark:bg-zinc-800 [&>*]:leading-[1.6]'>
        <nav
          id='full-screen-example'
          className="fixed top-0 left-0 z-[1035] h-screen w-72 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] md:data-[te-sidenav-hidden='false']:translate-x-0"
          data-te-sidenav-init
          data-te-sidenav-mode-breakpoint-over='0'
          data-te-sidenav-mode-breakpoint-side='sm'
          data-te-sidenav-hidden='false'
          data-te-sidenav-color='dark'
          data-te-sidenav-content='#content'
          data-te-sidenav-scroll-container='#scrollContainer'
        >
          <div className='pt-6 bg-cyan-800 text-white'>
            <div id='header-content' className='pl-8'>
              <h4 className='mb-2 text-3xl font-medium leading-[1.2] text-white'>
                EtherCast
              </h4>
              <p className='mb-4 text-xl text-white'>Dashboard</p>
            </div>
            <hr className='border-gray-300 my-12' />
          </div>
          <div id='scrollContainer'>
            <ul
              className='relative m-0 list-none px-[0.2rem]'
              data-te-sidenav-menu-ref
            >
              <li className='relative '>
                <a href='/Dashboard/ElectionOfficer/addElecOff'>
                  <div className='flex mx-4 my-10 mb-2 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                    <FiUserPlus className='text-2xl text-gray-600 group-hover:text-white ' />
                    <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                      Add Users
                    </h3>
                  </div>
                </a>
              </li>
            </ul>
            <hr className='border-gray-300 my-12' />
            <ul className='relative m-0 list-none px-[0.2rem] '>
              <li className='relative '>
                <a>
                  <div className='flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                    <MdOutlineSettings className='text-2xl text-gray-600 group-hover:text-white ' />
                    <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                      Settings
                    </h3>
                  </div>
                </a>
              </li>

              <li className='relative '>
                <a>
                  <div className='flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                    <FaUserCircle className='text-2xl text-gray-600 group-hover:text-white ' />
                    <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                      Profile
                    </h3>
                  </div>
                </a>
              </li>

              <li className='relative '>
                <a href='/LogIn'>
                  <div className='flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-cyan-800 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
                    <BiLogOutCircle className='text-2xl text-gray-600 group-hover:text-white ' />
                    <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
                      LogOut
                    </h3>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
      </div>
    </div>
  );
};

export default Navbar;
