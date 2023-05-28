import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import {BsFillHandIndexThumbFill} from "react-icons/bs"
import CandidateInfo from "../Card/Candidate";
import { FaCheckCircle } from 'react-icons/fa';

const Candidate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Candidacy', icon: BsFillHandIndexThumbFill , href: '/candidacy' },
        { id: 3, label: 'Vote', icon: MdOutlineHowToVote , href: '/voting' },
        { id: 4, label: 'Result', icon: FaCheckCircle , href: '/result' },
        ];

  return (
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <CandidateInfo />
      </div>
    </div>
  );
};

export default Candidate;
