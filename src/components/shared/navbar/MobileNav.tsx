"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-6">
      {sidebarLinks.map((Item) => {
        const isActive =
          (pathname.includes(Item.route) && Item.route.length > 1) ||
          pathname === Item.route; // here includes is used to check if the route is a subroute of the current route means if the current route is /profile and the Item.route is /profile/1 then it will return true
        return (
          <SheetClose asChild key={Item.route}>
            {" "}
            {/* asChild is used to pass the SheetClose component as a child to the SheetTrigger component */}
            <Link
              href={Item.route}
              className={`${
                isActive
                  ? "primary-gradient rounded-lg text-light-900 "
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={Item.imgURL}
                alt={Item.label}
                width={20}
                height={20}
                className={`${isActive ? "" : "invert-colors"}`}
              />
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {Item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="menu"
          width={20}
          height={20}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex">
          <Image src="/assets/logo.png" alt="logo" width={36} height={36} />
          <p className="h2-bold  text-dark100_light900">AlmaVine</p>
        </Link>
        <div>
          <SheetClose asChild>
            <NavContent />
          </SheetClose>
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <SheetClose asChild>
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span className="primary-text-gradient">Log In</span>
              </Button>
            </Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary   text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <span>Sign Up</span>
              </Button>
            </Link>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
