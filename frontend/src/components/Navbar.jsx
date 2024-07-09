import { Button, Navbar } from "flowbite-react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export function NavComponent() {
  return (
    <div className="py-4">
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
        <Navbar.Collapse>
          <Navbar.Link>
            <Link to="/" className="cursor-pointer" active="true">Home</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to="/menu" className="cursor-pointer">Menu</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to="/mobile-app" className="cursor-pointer">Mobile-App</Link>
          </Navbar.Link>
          <Navbar.Link>
            <Link to="/contact-us" className="cursor-pointer">Contact-Us</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
