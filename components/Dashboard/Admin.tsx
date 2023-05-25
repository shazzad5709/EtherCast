import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import Input from "../Utilities/Input";
import { FiUserPlus } from "react-icons/fi";
import AdminTotal from "../MainWork/Admin";
import { FaUserCircle } from "react-icons/fa";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navbarItems = [
   { id: 1, label: 'Profile', icon: FaUserCircle , href: '/profile' },
   { id: 2, label: 'Add Election Chairman', icon: FiUserPlus, href: '/addEC' },
  ];

  const [inputValue, setInputValue] = useState(''); // Declare state for input value

  // Event handler for input value change
  return (
    
    <div className="bg-gray-100 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <AdminTotal />
      </div>
    </div>
  );
};

export default Admin;
