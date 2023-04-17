import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle,FaPersonBooth } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";

const Voter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Apply as Voter', icon: FaPersonBooth , href: '/voterApply' },
        { id: 3, label: 'Election', icon: MdOutlineHowToVote , href: '/election' },
        ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        
    </div>
  );
};

export default Voter;
