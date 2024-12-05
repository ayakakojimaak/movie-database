import Link from "next/link";
import Search from "../ui/Search";
import DarkModeToggle from "../ui/DarkModeToggle";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex justify-between items-center gap-5">
          <Link href="/" className="text-lg font-bold">
            Movie Website
          </Link>
          <div className="flex justify-between items-center gap-3">
            <Link href="/movie" className="hover:text-gray-400">
              Movie
            </Link>
            <Link href="/tvshow" className="hover:text-gray-400">
              TV
            </Link>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Search />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
