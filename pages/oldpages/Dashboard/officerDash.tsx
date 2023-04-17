import { useState } from "react";
import styles from "../styles/dashboard.module.css";
import Navbar2 from "../../components/OldOnes/navbar2";
import Image from "next/image";
const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div>
        <Navbar2  />
        <div className="pl-100">
            <Image className="pl-12 ml-60" src={"/EtherCast.png"} alt={""} height={100} width={1300}></Image>
        </div>
    </div>
  );
};

export default Dashboard;
