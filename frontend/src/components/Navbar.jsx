import { useState } from "react";
import { Button, Navbar } from "flowbite-react";
import { assets } from "../assets/assets";
import { Link, useLocation } from "react-router-dom";

export function NavComponent() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleSetActiveLink = (path) => {
    setActiveLink(path);
  };

  return (
    <div className="py-4 max-w-6xl px-4 mx-auto overflow-hidden">
      <Navbar fluid rounded>
        <Navbar.Brand>
          <img src={assets.logo} className="mr-3 h-6" alt="Tomato Logo" />
        </Navbar.Brand>
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 md:order-2">
          <img
            src={assets.search_icon}
            className="w-6 h-6 flex-shrink-0 cursor-pointer"
            alt="Search Icon"
          />
          <Link to="/cart">
            <img
              src={assets.basket_icon}
              className="w-6 h-6 flex-shrink-0 cursor-pointer"
              alt="Basket Icon"
            />
          </Link>
          <Button className="sm:px-3" color="light" pill>
            Sign In
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="lowercase">
          <Navbar.Link>
            <Link
              to="/"
              className={`cursor-pointer ${
                activeLink === "/" ? 'border-b-[2px]  border-orange-500 pb-1' : ""
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
                  ? "border-b-[2px]  border-orange-500 pb-1"
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
                  ? "border-b-[2px]  border-orange-500 pb-1"
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
                  ? "border-b-[2px]  border-orange-500 pb-1"
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
