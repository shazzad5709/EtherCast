import { useState } from "react";
import styles from "../styles/dashboard.module.css";
import Navbar from "../../components/navbar";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div>
        <Navbar />
        
    </div>
  );
};

export default Dashboard;
