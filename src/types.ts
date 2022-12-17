import { Timestamp } from "firebase/firestore";

export type Comment = {
  id: string;
  userId: string;
  content: string;
  createdAt: Timestamp;
  likes: string[];
  dislikes: string[]
}

export type Question = {
  id: string;
  userId: string;
  createdAt: Timestamp;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
  dislikes: string[];
  comments: Comment[];
}