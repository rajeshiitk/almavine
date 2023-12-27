import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "./Tag";

const RightSidebar = () => {
  const trendingTopics = [
    {
      _id: "1",
      title:
        "Trending top 1 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: "2",
      title:
        "Trending top 2 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    { _id: "3", title: "Trending top 3 lorem ipsum dolor sit amet" },
    {
      _id: "4",
      title:
        "Trending  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      _id: "5",
      title:
        "Trending top 5 lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const popularTags = [
    {
      _id: "1",
      name: "vlsi",
      count: 5,
    },
    {
      _id: "2",
      name: "system Design",
      count: 3,
    },
    {
      _id: "3",
      name: "digital ic design",
      count: 7,
    },
    {
      _id: "4",
      name: "Microelectronics",
      count: 5,
    },
    {
      _id: "5",
      name: "digital signal processing",
      count: 5,
    },
    {
      _id: "6",
      name: "integrated circuits",
      count: 1,
    },
    {
      _id: "7",
      name: "computer networking",
      count: 5,
    },
    {
      _id: "8",
      name: "DSA",
      count: 5,
    },
    {
      _id: "9",
      name: "DBMS",
      count: 5,
    },
  ];

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px]  flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Trending Topics</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {trendingTopics.map((topic) => (
            <Link
              href={`
                    /topic/${topic._id}
                `}
              key={topic._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{topic.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <Tag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              count={tag.count}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
