"use client";
import { useTheme } from "@/context/themeProvider";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();

  return (
    <Menubar className=" border-none  bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : mode === "dark" ? (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/system.svg"
              alt="moon"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem]  mt-3 min-w-[120px] rounded border bg-slate-50 py-2 dark:border-dark-400 dark:bg-dark-300 ">
          {themes.map((theme) => (
            <MenubarItem
              key={theme.value}
              className="flex items-center gap-2 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                setMode(theme.value);
                if (theme.value !== "system") {
                  localStorage.setItem("theme", theme.value);
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={theme.icon}
                alt={theme.value}
                width={20}
                height={20}
                className={`${mode === theme.value && "active-theme"}`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === theme.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {theme.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
