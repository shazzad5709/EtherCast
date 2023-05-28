import { useEffect, useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle, FaListAlt, FaCheckCircle } from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";
import Officer from "../Card/Officer";
import ElectionOfficer from "../MainWork/ElectionOfficer";
import axios from "axios";

const ElectionOfficers = () => {

    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        {id: 2, label: 'Manage Election', icon: MdViewInAr , href: '/manageElection' },
        {id: 3, label: 'Add Voter Info', icon: FiUserPlus , href: './MainWork/ElectionOfficer' },
        {id: 4, label: 'View Voter List', icon: FaListAlt , href: '/officer/voterList' },
        { id: 5, label: 'Result', icon: FaCheckCircle , href: '/result' },
    ];

  return (
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <ElectionOfficer />
        {/* <Officer /> */}
      </div>
    </div>
  );
};

export default ElectionOfficers;
