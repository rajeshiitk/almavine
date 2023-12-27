"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuestionSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

const type: any = "create";

interface props {
  mongoUserId: string;
}

const Question = ({ mongoUserId }: props) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Define your form.
  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof QuestionSchema>) {
    setIsSubmitting(true);
    console.log("submitting");
    try {
      // make a async call to the server --> create a question
      await createQuestion({
        title: values.title,
        content: values.explanation,
        tags: values.tags,
        author: JSON.parse(mongoUserId), // here we are parsing
        path: pathname,
      });
      // contain all form data
      // navigate to home page
      router.push("/");
    } catch (error) {
      console.log("failed to add question" + error);
    } finally {
      setIsSubmitting(false);
    }
    console.log(values);
  }

  function handleInputKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      console.log("Enter pressed");

      const tagInput = e.target as HTMLInputElement; // e.target is of type EventTarget, so we need to cast it to HTMLInputElement
      const tagValue = tagInput.value.trim();

      if (tagValue !== "") {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag must be less than 15 characters.",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        }
      } else {
        form.trigger();
      }
    }
  }

  function hadleTagRemove(tag: string, field: any) {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl className="mt-3">
                <Input
                  className="paragraph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Provide a to the point and crisp title that describes your issue
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Detail explanation of your Question
                <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3">
                <Editor
                  // apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  onInit={(evt, editor) => {
                    // @ts-ignore
                    editorRef.current = editor;
                  }}
                  onBlur={field.onBlur} // make sure to pass onBlur event to form onBlur means when the input is not focused
                  onEditorChange={(content, editor) => {
                    // Update the form state when the editor content changes
                    field.onChange(content);
                  }}
                  initialValue=""
                  init={{
                    height: 500,
                    menubar: false,
                    statusbar: false,
                    branding: false,
                    file_picker_types: "file image media",
                    plugins: [
                      "accordion",
                      "searchreplace",
                      "quickbars",
                      "fullscreen",
                      "emoticons",
                      // "visualblocks",
                      "preview",
                      "image",
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "print",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "paste",
                      "code",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | " +
                      "bold italic underline strikethrough backcolor forecolor  | " +
                      "codesample accordion |" +
                      "image preview emoticons fullscreen quickbars searchreplace | " +
                      "  alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:18px } ",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Provide a detailed explanation of your question
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags <span className="text-primary-500">*</span>{" "}
              </FormLabel>
              <FormControl className="mt-3">
                <>
                  <Input
                    className="paragraph-regular no-focus background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags..."
                    onKeyDown={(e) => handleInputKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 flex-wrap gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          key={tag}
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
                        >
                          {tag}
                          <Image
                            src="/assets/icons/close.svg"
                            alt="close icon"
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                            onClick={() => hadleTagRemove(tag, field)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add upto 5 tags to describe what your question is about
              </FormDescription>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="primary-gradient w-fit !text-light-900"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit" : "Post"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
