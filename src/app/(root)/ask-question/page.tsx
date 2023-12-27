import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";
// import { Editor } from "novel";

const Page = async () => {
  const { userId } = { userId: "authId1" };

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900"> Ask a Question</h1>
      <div className="mt-6">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
      {/* <Editor /> */}
    </div>
  );
};

export default Page;
