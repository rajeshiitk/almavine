import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResultFound from "@/components/shared/NoResultFound";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getQuestions } from "@/lib/actions/question.action";
import { formatLargeNumber } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// const questions = [
//   {
//     _id: "1",
//     title: "Sample Question 1",
//     description: "This is a sample question description.",
//     tags: [
//       { _id: "tag1", name: "typescript" },
//       { _id: "tag2", name: "react" },
//     ],
//     author: {
//       _id: "author1",
//       name: "John Doe",
//       picture: "/assets/images/auth-light.png",
//     },
//     upvotes: 1000000001,
//     answers: [
//       { text: "Sample answer 1", author: "Jane Doe" },
//       { text: "Sample answer 2", author: "Bob Smith" },
//     ],
//     views: 5230,
//     createAt: new Date("2023-01-01T12:00:00Z"),
//   },
//   {
//     _id: "2",
//     title: "Another Sample Question",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     tags: [
//       { _id: "tag3", name: "javascript" },
//       { _id: "tag4", name: "nodejs" },
//     ],
//     author: {
//       _id: "author2",
//       name: "Alice Johnson",
//       picture: "/assets/images/auth-light.png",
//     },
//     upvotes: 8,
//     answers: [
//       { text: "Lorem ipsum answer", author: "Charlie Brown" },
//       { text: "Dolor sit amet answer", author: "Eve White" },
//     ],
//     views: 35,
//     createAt: new Date("2023-12-09T10:30:00Z"),
//   },
//   {
//     _id: "3",
//     title: "Sample Question 1",
//     description: "This is a sample question description.",
//     tags: [
//       { _id: "tag1", name: "typescript" },
//       { _id: "tag2", name: "react" },
//     ],
//     author: {
//       _id: "author1",
//       name: "John Doe",
//       picture: "/assets/images/auth-light.png",
//     },
//     upvotes: 1000000001,
//     answers: [
//       { text: "Sample answer 1", author: "Jane Doe" },
//       { text: "Sample answer 2", author: "Bob Smith" },
//     ],
//     views: 5230,
//     createAt: new Date("2023-01-01T12:00:00Z"),
//   },
//   {
//     _id: "4",
//     title: "Another Sample Question",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     tags: [
//       { _id: "tag3", name: "javascript" },
//       { _id: "tag4", name: "nodejs" },
//     ],
//     author: {
//       _id: "author2",
//       name: "Alice Johnson",
//       picture: "/assets/images/auth-light.png",
//     },
//     upvotes: 8,
//     answers: [
//       { text: "Lorem ipsum answer", author: "Charlie Brown" },
//       { text: "Dolor sit amet answer", author: "Eve White" },
//     ],
//     views: 35,
//     createAt: new Date("2023-12-09T10:30:00Z"),
//   },
//   // Add more dummy data as needed
// ];

const Home = async () => {
  const questions = await getQuestions({});
  // const questions = results.questions;
  // console.log(results);

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="ask-question" className="flex justify-end max-sm:w-full">
          <Button
            className="
          primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          >
            Ask a Question
          </Button>
        </Link>
      </div>

      <div
        className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center 
      "
      >
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {!!questions && questions.length > 0 ? (
          questions.map((item) => (
            <QuestionCard
              key={item._id}
              _id={item._id}
              title={item.title}
              description={item.description}
              tags={item.tags}
              upvotes={formatLargeNumber(item.upvotes)}
              answers={item.answers}
              views={formatLargeNumber(item.views)}
              author={item.author}
              createdAt={item.createAt}
            />
          ))
        ) : (
          <NoResultFound
            title="There is no question to show"
            description=" There is no question to show There is no question to show There is no question to show"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default Home;
