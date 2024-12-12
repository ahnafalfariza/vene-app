import { Search } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky">
      <div className="container p-[0.875rem] md:px-0 m-auto w-full flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link to="/">
            <img
              alt="logo"
              className="w-[167px] h-[40px]"
              src="/logo-vene.png"
            />
          </Link>
          <div className="flex items-center rounded-xl gap-3 px-4 py-3 bg-[#F0F0F0]">
            <Search className="w-5 h-5 stroke-muted-foreground" />
            <input
              placeholder="Find amazing event"
              className="focus:outline-none bg-transparent text-sm w-64"
            />
          </div>
        </div>
        <div className="flex gap-8">
          <Link to="/discover">Discover</Link>
          <Link to="/create">Create Event</Link>
          <a>Sign In</a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
