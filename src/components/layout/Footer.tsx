import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-slate-300 text-gray-800 dark:bg-blue-950 dark:text-gray-100 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Movie Website
        </Link>
        <div>
          <Link href="/about" className="hover:text-gray-400">
            About
          </Link>
        </div>
      </nav>
    </footer>
  );
};
