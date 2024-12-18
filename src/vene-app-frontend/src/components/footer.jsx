import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="text-black py-6 w-full mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img
              alt="logo"
              className="w-[100px] h-auto mb-3"
              src="/vene-black.png"
            />
            <p className="text-xs mt-1">© 2024 All rights reserved.</p>
          </div>
          {/* Add social media icons */}
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="">
              <Facebook size={20} />
            </a>
            <a href="#" className="">
              <Twitter size={20} />
            </a>
            <a href="#" className="">
              <Instagram size={20} />
            </a>
            <a href="#" className="">
              <Linkedin size={20} />
            </a>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="#" className="">
              About
            </Link>
            <Link to="/privacy" className="">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
