import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FiUserPlus } from "react-icons/fi";
import { FaUserCircle, FaListAlt } from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";

const ElectionOfficers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        {id: 2, label: 'Manage Election', icon: MdViewInAr , href: '/manageElection' },
        {id: 3, label: 'Add Voter Email', icon: FiUserPlus , href: '/addVoterEmail' },
        {id: 4, label: 'View Voter List', icon: FaListAlt , href: '/voterList' },
    ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        
    </div>
  );
};

export default ElectionOfficers;
