import * as z from "zod";

export const QuestionSchema = z.object({
  title: z.string().min(5).max(120),
  explanation: z.string().min(10).max(10000),
  tags: z.array(z.string().min(1).max(15)).min(1).max(5),
});
