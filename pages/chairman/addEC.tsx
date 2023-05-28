import { useState } from "react";
import Navbar from "../../components/Utilities/Navbar";
import Input from "../../components/Utilities/Input";
import { FiUserPlus } from "react-icons/fi";
import AdminTotal from "../../components/MainWork/Admin";
import { FaUserCircle } from "react-icons/fa";
import Chairman from "../../components/MainWork/Chairman";
import { MdOutlineHowToVote } from "react-icons/md";


const AddEC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navbarItems = [
    { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
    { id: 2, label: 'Create Election', icon: MdOutlineHowToVote , href: '/chairman/create-election' },
    { id: 3, label: 'Add Election Officer', icon: FiUserPlus, href: '/chairman/addEC' },
    // { id: 4, label: 'View Reports', icon: HiOutlineDocumentReport , href: '/viewReports' },
   ];

  const [inputValue, setInputValue] = useState(''); // Declare state for input value

  // Event handler for input value change
  return (
    
    <div className="bg-gray-50 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <Chairman />
        {/* <Test /> */}
      </div>
      
    </div>
  );
};

export default AddEC;
