import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./theme";
import Avatar from "./avatar";
import MobileNav from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className=" flex-between background-light900_dark200 fixed z-50 flex w-full gap-5 px-6 py-2  dark:shadow-none sm:px-12">
      <Link href="/" className="flex">
        <Image src="/assets/logo.png" alt="logo" width={36} height={36} />
        <p className="h2-bold  font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          AlmaVine
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex">
        <Theme />
        {/* <ThemeToggle /> */}
        <Avatar />
        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
