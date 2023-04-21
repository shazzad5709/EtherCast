import { useState } from "react";
import styles from "../styles/dashboard.module.css";
import Navbar from "../../../components/OldOnes/navbar3";
import Image from 'next/image'
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("home");

  const handleTabClick = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <div>
        <Navbar  />
          <div className="pl-100">
        </div>
    </div>
  );
};

export default Dashboard;
