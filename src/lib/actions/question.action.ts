"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Tag from "@/database/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();
    // const { page, limit } = params;
    // const questions = await Question.find()
    //   .skip((page - 1) * limit)
    //   .limit(limit)
    //   .populate("author", "name")
    //   .populate("tags", "name");
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({ path: "author", model: User })
      .sort({ createdAt: -1 });
    return questions;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();
    const { title, content, tags, author, path } = params;
    // create new question
    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = []; //

    // create new tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } }, // regex to match case insensitive
        { $setOnInsert: { name: tag }, $push: { question: question._id } }, // if tag doesn't exist, create it
        { upsert: true, new: true } // return new document if upserted (created) means we can push question to it
      );
      tagDocuments.push(existingTag._id);
    }
    //
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }, //
    });

    revalidatePath(path);
    // create a interaction record for the user's ask_question action

    // increment author's reputation by +5 for creating a question
  } catch (error) {
    console.log(error);
    throw error;
  }
}
