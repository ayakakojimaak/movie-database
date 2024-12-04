import Link from "next/link";
import Search from "../ui/Search";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Movie Website
        </Link>
        <div className="flex justify-between items-center gap-3">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
          <Search />
        </div>
      </nav>
    </header>
  );
};

export default Header;
