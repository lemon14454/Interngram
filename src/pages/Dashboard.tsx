import { useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";
import Timeline from "../components/Timeline";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Interngram";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid grid-cols-3 gap-8 justify-between mx-auto max-w-screen-lg px-4">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
