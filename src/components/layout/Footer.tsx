import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Movie Website
        </Link>
        <div>
          <Link href="/" className="mr-4 hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
