import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 w-full mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">VENE</h3>
            <p className="text-xs mt-1">© 2024 All rights reserved.</p>
          </div>
          {/* Add social media icons */}
          <div className="flex gap-6 mb-4 md:mb-0">
            <a href="#" className="hover:text-gray-300">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Linkedin size={20} />
            </a>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="#" className="hover:text-gray-300">
              About
            </Link>
            <Link to="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
