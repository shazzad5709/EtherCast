import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import Input from "../Utilities/Input";
import { FiUserPlus } from "react-icons/fi";
import Form from "../Utilities/Form/Form";

const Admin = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navbarItems = [
    { id: 1, label: 'Add Election Chairman', icon: FiUserPlus, href: '/addEC' },
  ];

  const [inputValue, setInputValue] = useState(''); // Declare state for input value

  // Event handler for input value change
  return (
    <div className="bg-gray-300 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="flex w-full justify-center items-center">
        <Form buttonName={"Add Election Chairman"} />
      </div>
    </div>
  );
};

export default Admin;
