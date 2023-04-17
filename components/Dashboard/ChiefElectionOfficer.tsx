import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";

const ChiefElectionOfficer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'View Reports', icon: HiOutlineDocumentReport , href: '/viewReports' },
       ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        
    </div>
  );
};

export default ChiefElectionOfficer;
