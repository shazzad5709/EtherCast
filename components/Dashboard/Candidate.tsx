import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import {BsFillHandIndexThumbFill} from "react-icons/bs"
import CandidateInfo from "../MainWork/Candidate";

const Candidate = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Candidacy', icon: BsFillHandIndexThumbFill , href: '/candidacy' },
        { id: 3, label: 'Vote', icon: MdOutlineHowToVote , href: '/voting' },
        ];

  return (
    <div className="bg-gray-100 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <CandidateInfo />
      </div>
    </div>
  );
};

export default Candidate;
