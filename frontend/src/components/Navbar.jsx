import { useContext, useState } from "react";
import { Button, Dropdown, Navbar } from "flowbite-react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export function NavComponent() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const navigate = useNavigate();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken("");
    navigate('/');
  }

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  return (
    <>
      <div className="py-4 w-full md:w-[95%] px-4 mx-auto overflow-hidden">
        <Navbar fluid rounded>
          <Navbar.Brand>
            <Link to="/">
              <img
                src={assets.logo}
                className="mr-3 w-[80px] sm:w-[120px]"
                alt="Tomato Logo"
              />
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
                <div className="w-2 h-2 bg-[#FF6347] absolute -right-1 -top-2 rounded-full"></div>
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
                      <img
                        className="w-6 h-6"
                        src={assets.profile_icon}
                        alt=""
                      />
                    </div>
                  }
                >
                  <Dropdown.Item>
                    <img src={assets.bag_icon} className="w-5 mr-2" alt="" />
                    <p>Orders</p>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <img src={assets.logout_icon} className="w-5 mr-2" alt="" />
                    <p className="">Logout</p>
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
                  activeLink === "/"
                    ? "border-b-[2px]  border-[#FF6347] pb-1"
                    : ""
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
                    ? "border-b-[2px]  border-[#FF6347] pb-1"
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
                    ? "border-b-[2px]  border-[#FF6347] pb-1"
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
                    ? "border-b-[2px]  border-[#FF6347] pb-1"
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
    </>
  );
}
