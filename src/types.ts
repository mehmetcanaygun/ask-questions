import { Timestamp } from "firebase/firestore";

export type Comment = {
  id: string;
  userId: string;
  displayName: string;
  content: string;
  createdAt: Timestamp;
  likes: string[];
  dislikes: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Question = {
  id: string;
  user: User;
  createdAt: Timestamp;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
  dislikes: string[];
  comments: Comment[];
};

export type UpdateQuestionData = {
  title?: string;
  content?: string;
  comments?: Comment[];
  likes?: string[];
  dislikes?: string[];
};

export type QuestionFormData = {
  title: string;
  content: string;
  tags: string[];
};
