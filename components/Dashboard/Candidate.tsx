import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import {BsFillHandIndexThumbFill} from "react-icons/bs"

const Candidate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Apply as Voter', icon: BsFillHandIndexThumbFill , href: '/voterApply' },
        { id: 3, label: 'Election', icon: MdOutlineHowToVote , href: '/election' },
        ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        
    </div>
  );
};

export default Candidate;
