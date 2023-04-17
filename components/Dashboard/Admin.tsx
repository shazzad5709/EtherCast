import { useState } from "react";
import Navbar from "../Utilities/Navbar";
import Input from "../Utilities/Input";
import { FiUserPlus } from "react-icons/fi";
import Form from "../Utilities/Form";

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Add Election Chairman', icon: FiUserPlus , href: '/addEC' },
        ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        <div >
          <Form buttonName={"Add Election Chairman"} />
        </div>
    </div>
  );
};

export default Admin;
