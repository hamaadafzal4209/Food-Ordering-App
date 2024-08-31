import { useContext, useState } from "react";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBagHandleOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

export function NavComponent() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const navigate = useNavigate();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  // Check if user is admin
  const isAdmin = JSON.parse(localStorage.getItem("user") || "{}").isAdmin;
  const name = JSON.parse(localStorage.getItem("user") || "{}").name;
  const email = JSON.parse(localStorage.getItem("user") || "{}").email;

  return (
    <div className="py-4 w-full md:w-[90%] px-4 mx-auto overflow-hidden">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <Link to="/">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="text-xl sm:text-4xl font-semibold text-green-600">
                  Savory
                </div>
                <div className="text-xl sm:text-4xl font-semibold text-orange-600">
                  Bites
                </div>
              </div>
            </div>
          </Link>
        </Navbar.Brand>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 md:order-2">
          <img
            src={assets.search_icon}
            className="w-5 sm:w-6 flex-shrink-0 cursor-pointer"
            alt="Search Icon"
          />
          <div className="relative">
            {getTotalCartAmount() === 0 ? (
              ""
            ) : (
              <div className="w-2 h-2 bg-indigo-900 absolute -right-1 -top-2 rounded-full"></div>
            )}
            <Link to="/cart">
              <img
                src={assets.basket_icon}
                className="w-5 sm:w-6 flex-shrink-0 cursor-pointer"
                alt="Basket Icon"
              />
            </Link>
          </div>
          {!token ? (
            <Button className="sm:px-3" color="light" pill>
              <Link to="/login">Sign In</Link>
            </Button>
          ) : (
            <div className="flex">
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div>
                    <img className="w-6 h-6" src={assets.profile_icon} alt="" />
                  </div>
                }
              >
                <Dropdown.Header>
        <span className="block text-sm">{name}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
                <Dropdown.Divider />
                {isAdmin && (
                  <>
                    <Dropdown.Item>
                      <Link
                        to="/dashboard?tab=list"
                        className="flex items-center gap-2"
                      >
                        <LuLayoutDashboard
                          size={25}
                          className="text-green-500"
                        />
                        <p>Dashboard</p>
                      </Link>
                    </Dropdown.Item>
                  </>
                )}
                <Dropdown.Item>
                  <Link to="myorders" className="flex items-center gap-2">
                    <IoBagHandleOutline size={25} className="text-green-500" />
                    <p>Orders</p>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={logout}
                  className="flex items-center gap-2"
                >
                  <MdLogout size={25} className="text-green-500" />
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown>
            </div>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="lowercase">
          <Navbar.Link>
            <Link
              to="/"
              className={`cursor-pointer ${
                activeLink === "/" ? "border-b-[2px] border-green-700 pb-1" : ""
              }`}
              onClick={() => handleSetActiveLink("/")}
            >
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link>
            <a
              href="#explore-menu"
              className={`cursor-pointer ${
                activeLink === "/explore-menu"
                  ? "border-b-[2px] border-green-700 pb-1"
                  : ""
              }`}
              onClick={() => handleSetActiveLink("/explore-menu")}
            >
              Menu
            </a>
          </Navbar.Link>
          <Navbar.Link>
            <a
              href="#mobile-app"
              className={`cursor-pointer ${
                activeLink === "/mobile-app"
                  ? "border-b-[2px] border-green-700 pb-1"
                  : ""
              }`}
              onClick={() => handleSetActiveLink("/mobile-app")}
            >
              Mobile App
            </a>
          </Navbar.Link>
          <Navbar.Link>
            <a
              href="#footer"
              className={`cursor-pointer ${
                activeLink === "/footer"
                  ? "border-b-[2px] border-green-700 pb-1"
                  : ""
              }`}
              onClick={() => handleSetActiveLink("/footer")}
            >
              Contact Us
            </a>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
