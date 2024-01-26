import Link from "next/link";
import Image from "next/image";
import { Niconne } from "next/font/google";
const inter = Niconne({
  weight: "400",
  subsets: ["latin"],
});
export function Navbar() {
  return (
    <nav className="w-full my-12 mx-auto container flex flex-row space-x-8 lg:justify-center justify-start items-center ">
      <Link
        className=" hidden md:flex hover:text-blue-600"
        href="/home"
        legacyBehavior
      >
        <p>Home</p>
      </Link>
      <Link className="hidden md:flex hover:text-blue-600" href="/">
        Technologies
      </Link>
      <Link className="hidden md:flex hover:text-blue-600" href="/">
        News
      </Link>
      {/* <Image src="/logo.svg" height={80} width={120} alt="logo" /> */}
      <Link
        className="text-6xl font-extrabold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"
        href="/"
      >
        <p className={inter.className}>finalanswer</p>
      </Link>

      <Link className="hidden md:flex hover:text-blue-600" href="/home">
        Home
      </Link>
      <Link className="hidden md:flex hover:text-blue-600" href="/">
        Technologies
      </Link>
      <Link className="hidden md:flex hover:text-blue-600" href="/">
        News
      </Link>
    </nav>
  );
}
