import { Search, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { signIn, signOut } from "@junobuild/core";
import { useAuth } from "./auth";
import UserDropdownMenu from "./user-dropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;

    navigate(`/search?q=${searchValue}`);
  };

  return (
    <header className="sticky top-0 z-40">
      <div className="container p-[0.875rem] md:px-0 m-auto w-full flex justify-between items-center bg-white">
        <button
          className="md:hidden mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex flex-grow gap-8 items-center">
          <Link to="/">
            <img
              alt="logo"
              className="w-[120px] h-auto"
              src="/vene-black.png"
            />
          </Link>
          <div className="hidden md:flex items-center rounded-xl gap-3 px-4 py-3 bg-[#F0F0F0]">
            <Search className="w-5 h-5 stroke-muted-foreground" />
            <form onSubmit={onSearch}>
              <input
                type="search"
                placeholder="Find amazing event"
                className="focus:outline-none bg-transparent text-sm w-64"
              />
            </form>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 relative">
          <Link to="/discover">Discover</Link>
          <Link to="/create">Create Event</Link>
          {!user && <button onClick={signIn}>Sign In</button>}
        </div>

        {user && (
          <div className="ml-4 md:ml-8">
            <UserDropdownMenu />
          </div>
        )}

        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden">
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center rounded-xl gap-3 px-4 py-3 bg-[#F0F0F0]">
                <Search className="w-5 h-5 stroke-muted-foreground" />
                <form onSubmit={onSearch}>
                  <input
                    type="search"
                    placeholder="Find amazing event"
                    className="focus:outline-none bg-transparent text-sm w-full"
                  />
                </form>
              </div>
              <Link to="/discover" className="p-2">
                Discover
              </Link>
              <Link to="/create" className="p-2">
                Create Event
              </Link>
              {user ? (
                <Link onClick={signOut} className="p-2">
                  Sign Out
                </Link>
              ) : (
                <Link onClick={signIn} className="text-left p-2">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
