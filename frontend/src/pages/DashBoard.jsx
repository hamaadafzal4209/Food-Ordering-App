import { useLocation } from "react-router-dom";
import { DashSidebar } from "../components/DashSidebar";
import { useEffect, useState } from "react";
import DashAddItem from "../components/DashAddItem";
import DashLists from "../components/DashLists";
import DashOrders from "../components/DashOrders";

function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="border-t border-black">
      <div className="px-4 max-w-6xl mx-auto">
        <div className="flex items-start">
          <DashSidebar />
          {tab === "add" && <DashAddItem />}
          {tab === "list" && <DashLists />}
          {tab === "order" && <DashOrders />}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
