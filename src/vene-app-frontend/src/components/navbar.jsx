import { Search } from "lucide-react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target[0].value;

    navigate(`/search?q=${searchValue}`);
  };

  return (
    <header className="sticky">
      <div className="container p-[0.875rem] md:px-0 m-auto w-full flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <Link to="/">
            <img
              alt="logo"
              className="w-[120px] h-auto"
              src="/vene-black.png"
            />
          </Link>
          <div className="flex items-center rounded-xl gap-3 px-4 py-3 bg-[#F0F0F0]">
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
