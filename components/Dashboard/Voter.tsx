import { useEffect, useState } from "react";
import Navbar from "../Utilities/Navbar";
import { FaUserCircle} from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import {BsFillHandIndexThumbFill} from "react-icons/bs"
import VoterCard from "../Card/Voter";
import axios from "axios";

const Voter = () => {
  const [loading, setLoading] = useState(true);
  // const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);
 
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Apply as Voter', icon: BsFillHandIndexThumbFill , href: '/voterApply' },
        { id: 3, label: 'Election', icon: MdOutlineHowToVote , href: '/election' },
        ];

  return (
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        {/* <ElectionOfficer /> */}
        <VoterCard />
      </div>
    </div>
  );
};

export default Voter;
