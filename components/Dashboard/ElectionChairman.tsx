import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
// import Chairman from "../MainWork/Chairman";
import Chairman from "../Card/Chairman"

const ElectionChairman = () => {
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Create Election', icon: MdOutlineHowToVote , href: '/chairman/create-election' },
        { id: 3, label: 'Add Election Officer', icon: FiUserPlus, href: '/addEC' },
        // { id: 4, label: 'View Reports', icon: HiOutlineDocumentReport , href: '/viewReports' },
       ];

  return (
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <Chairman />
        
      </div>
    </div>
  );
};

export default ElectionChairman;
