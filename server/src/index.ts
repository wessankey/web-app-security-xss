import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { cors } from "hono/cors";

const initialComments = [
  {
    id: 1,
    author: "George Bluth",
    content: "There's always money in the banana stand.",
    timestamp: "2025-01-15T10:30:00Z",
  },
  {
    id: 2,
    author: "Buster Bluth",
    content: "We are just blowing through nap time.",
    timestamp: "2025-01-15T11:15:00Z",
  },
  {
    id: 3,
    author: "Lucille Bluth",
    content: "It's one banana, Michael, what could it cost, 10 dollars?",
    timestamp: "2025-01-15T14:45:00Z",
  },
];

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["POST"],
    credentials: true,
  })
);

app.post("/api/login", async (c) => {
  setCookie(c, "sessionId", "123", { httpOnly: true });
  return c.json({ message: "Login successful" }, 200);
});

app.get("/api/comments", async (c) => {
  return c.json(initialComments, 200);
});

app.post("/api/comments", async (c) => {
  const { author, content } = await c.req.json();
  const newComment = {
    id: Date.now(),
    author,
    content,
    timestamp: new Date().toISOString(),
  };

  initialComments.push(newComment);
  return c.json(newComment, 201);
});

const port = 3000;
console.log(`Server running at http://localhost:${port}`);
serve({ fetch: app.fetch, port });
