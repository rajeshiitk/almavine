"use client";

import { sidebarLinks } from "@/constants/constants";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px] ">
      <div className="flex flex-1 flex-col ">
        {sidebarLinks.map((Item) => {
          const isActive =
            (pathname.includes(Item.route) && Item.route.length > 1) ||
            pathname === Item.route; // here includes is used to check if the route is a subroute of the current route means if the current route is /profile and the Item.route is /profile/1 then it will return true
          return (
            <Link
              key={Item.route}
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
              <p
                className={`${
                  isActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {Item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col gap-3">
        <Link href="/sign-in">
          <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/account.svg"
              alt="login"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className="primary-text-gradient max-lg:hidden">Log In</span>
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button className="small-medium light-border-2 btn-tertiary   text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
            <Image
              src="/assets/icons/sign-up.svg"
              alt="sign up"
              width={20}
              height={20}
              className="invert-colors lg:hidden"
            />
            <span className=" max-lg:hidden">Sign Up</span>
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LeftSidebar;
