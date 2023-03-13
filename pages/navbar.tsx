import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import {MdOutlineSettings} from 'react-icons/md'

const Navbar = () => {
  return (
    <div>
      <body className="dark:bg-zinc-800 [&>*]:leading-[1.6]">
        <nav
        id="full-screen-example"
        className="fixed top-0 left-0 z-[1035] h-screen w-72 -translate-x-full overflow-hidden bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800 md:data-[te-sidenav-hidden='false']:translate-x-0"
        data-te-sidenav-init
        data-te-sidenav-mode-breakpoint-over="0"
        data-te-sidenav-mode-breakpoint-side="sm"
        data-te-sidenav-hidden="false"
        data-te-sidenav-color="dark"
        data-te-sidenav-content="#content"
        data-te-sidenav-scroll-container="#scrollContainer">
        <div className="pt-6 bg-current">
          <div id="header-content" className="pl-8 ">
            <h4 className="mb-2 text-3xl font-medium leading-[1.2] text-white">EtherCast</h4>
            <p className="mb-4 text-xl text-white">Dashboard</p>
          </div>
          <hr className="border-gray-300 my-12" />
        </div>
        <div id="scrollContainer">
          <ul
            className="relative m-0 list-none px-[0.2rem]"
            data-te-sidenav-menu-ref>
         
          <li className="relative ">
              <a>
                  
                    <div className="flex mx-4 my-10 mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <FiUserPlus className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Profile
                      </h3>
                    </div>
                  
                </a>
            </li>

          </ul>
          <hr className="border-gray-300 my-12" />
          <ul className="relative m-0 list-none px-[0.2rem] ">
            <li className="relative ">
              <a>
                  <div className="flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Settings
                      </h3>
                    </div>
                </a>
            </li>

            <li className="relative ">
              <a>
                    <div className="flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <FaUserCircle className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        Profile
                      </h3>
                    </div>
                </a>
            </li>

            <li className="relative ">
              <a>
                    <div className="flex mb-2 mx-4 my-10 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                      <BiLogOutCircle className="text-2xl text-gray-600 group-hover:text-white " />
                      <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                        LogOut
                      </h3>
                    </div>
                </a>
            </li>
           
          </ul>
        </div>
        
      </nav>
 
        <div
          className="min-h-screen w-full bg-gray-50 !pl-0 text-center sm:!pl-60"
          id="content">
          <div className="py-12 text-center">
            <h3 className="my-12 text-[1.75rem] font-medium leading-[1.2]">
              Resize to change the mode
            </h3>
            <div>
              <img
                className="inline-block w-[80%] rounded"
                src="https://tecdn.b-cdn.net/img/Photos/Others/img%20(53).webp" />
            </div>
            <button
              id="toggler"
              className="m-12 inline-block rounded bg-zinc-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-black hover:shadow-lg focus:bg-black focus:shadow-lg focus:outline-none focus:ring-0 active:bg-zinc-900 active:shadow-lg sm:hidden"
              data-te-sidenav-toggle-ref
              data-te-target="#full-screen-example"
              data-te-ripple-init
              data-te-ripple-color="white">
              <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5">
                  <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </button>
          </div>
        </div>
 
      </body>
      
    </div>
  )
}

export default Navbar