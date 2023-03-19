import { useState } from "react";
import styles from "../styles/dashboard.module.css";
import Navbar2 from "../../components/navbar2";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div>
        <Navbar2  />
        
    </div>
  );
};

export default Dashboard;
