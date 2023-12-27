import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  authId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];
  //   createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  authId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
  },
  bio: {
    type: String,
  },
  picture: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolioWebsite: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
  saved: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
});
const User = models.User || model<IUser>("User", UserSchema);

export default User;
