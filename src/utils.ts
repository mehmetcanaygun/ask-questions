import { Comment } from "./types";

export const shortenStr = (text: string, maxLength: number): string => {
  return text.length < maxLength ? text : `${text.substring(0, maxLength)}...`;
};

export const sortComments = (comments: Comment[]): Comment[] => {
  return [...comments].sort(
    (a, b) => b.createdAt.seconds - a.createdAt.seconds
  );
};
