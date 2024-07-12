import { useEffect, useState } from "react";
import { admin_assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";

export function DashSidebar() {
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
    <aside className="min-h-screen h-full max-w-64 flex-shrink-0">
      <div className="pt-12 flex flex-col gap-6">
        <Link to="/dashboard?tab=add">
          <div
            className={`border border-[#a9a9a9] border-r-0 rounded-tl-[4px] rounded-bl-[4px] p-3 flex items-center gap-4 ${
              tab === "add" ? "bg-[#fff0ed] border-orange-500" : ""
            }`}
          >
            <img className="w-6 flex-shrink-0" src={admin_assets.add_icon} alt="" />
            <p className="hidden md:block md:pr-20">Add Items</p>
          </div>
        </Link>
        <Link to="/dashboard?tab=list">
          <div
            className={`border border-[#a9a9a9] border-r-0 rounded-tl-[4px] rounded-bl-[4px] p-3 flex items-center gap-4 ${
              tab === "list" ? "bg-[#fff0ed] border-orange-500" : ""
            }`}
          >
            <img className="w-6" src={admin_assets.list_icon} alt="" />
            <p className="hidden md:block md:pr-20">List Items</p>
          </div>
        </Link>
        <Link to="/dashboard?tab=order">
          <div
            className={`border border-[#a9a9a9] border-r-0 rounded-tl-[4px] rounded-bl-[4px] p-3 flex items-center gap-4 ${
              tab === "order" ? "bg-[#fff0ed] border-orange-500" : ""
            }`}
          >
            <img className="w-6" src={admin_assets.order_icon} alt="" />
            <p className="hidden md:block md:pr-20">Orders</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
