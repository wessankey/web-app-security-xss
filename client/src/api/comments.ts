import { Comment } from "../Comments";

export const getComments = async () => {
  const response = await fetch("http://localhost:3000/api/comments");
  return response.json();
};

export const addComment = async (comment: Comment): Promise<Comment> => {
  const response = await fetch("http://localhost:3000/api/comments", {
    method: "POST",
    body: JSON.stringify(comment),
  });

  return response.json();
};
