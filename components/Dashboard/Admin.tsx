import { useState } from "react";
import Navbar from "../Utilities/Navbar";

import { FiUserPlus } from "react-icons/fi";

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navbarItems = [
        { id: 1, label: 'Add Election Chairman', icon: FiUserPlus , href: '/addEC' },
        ];

  return (
    <div>
        <Navbar NavbarItems={navbarItems} />
        
    </div>
  );
};

export default Admin;
