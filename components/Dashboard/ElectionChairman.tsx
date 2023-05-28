import Navbar from "../Utilities/Navbar";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineHowToVote } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import Chairman from "../Card/Chairman"
import ChairmanInfo from "../MainWork/Chairman";
import axios from "axios";
import { useState, useEffect } from "react";

const ElectionChairman = () => {
  
  const [loading, setLoading] = useState(true);
  // const [showForm, setShowForm] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    const fetchChairmen = async () => {
      try {
        const response = await axios.get('/api/data/Admin/check');
        const data = response.data;
        // console.log(data);
        
        setLoading(false);

        // Check the value of chairmen
        if (data) {
          
          setShowCard(true); // Don't show the form
        } else {
          setShowCard(false); // Show the form
        }
      } catch (error) {
        setLoading(false);
      }
    };

    fetchChairmen();
    
  }, []); // Call fetchChairmen on component mount (empty dependency array)
 
    const navbarItems = [
        { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
        { id: 2, label: 'Create Election', icon: MdOutlineHowToVote , href: '/chairman/create-election' },
        { id: 3, label: 'Add Election Officer', icon: FiUserPlus, href: '/chairman/addEC' },
       ];

  return (
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        {showCard? (<Chairman />)
        : (<ChairmanInfo />)}
        
        
      </div>
    </div>
  );
};

export default ElectionChairman;
