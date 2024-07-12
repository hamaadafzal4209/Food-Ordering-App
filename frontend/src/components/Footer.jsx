import { assets } from "../assets/assets";

function Footer() {
  return (
    <footer id="footer" className="bg-[#323232] text-[#d9d9d9] p-5 pt-10 flex flex-col items-center">
      <div className="w-full md:w-[95%] grid gap-10 md:gap-5 md:grid-cols-2fr-1fr-1fr">
        <div className="">
          <img src={assets.logo} alt="Logo" className="mb-5" />
          <p className="mb-5">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
            quo laboriosam neque perferendis corporis ipsum.
          </p>
          <div className="flex gap-3">
            <img src={assets.facebook_icon} className="w-10" alt="Facebook" />
            <img src={assets.twitter_icon} className="w-10" alt="Twitter" />
            <img src={assets.linkedin_icon} className="w-10" alt="LinkedIn" />
          </div>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-3">COMPANY</h2>
          <ul className="space-y-2">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Delivery</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>
        <div className="">
          <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
          <ul className="space-y-2">
            <li>00 1111 222 333</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full md:w-[95%] my-6 border-[#d9d9d9]" />
      <p className="text-center text-sm">
        &copy; 2024 Tomato.com. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
