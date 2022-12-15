import { Timestamp } from "firebase/firestore";

export type Comment = {
  userId: string;
  content: string;
  createdAt: Timestamp
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