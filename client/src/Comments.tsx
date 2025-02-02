import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { getComments, addComment } from "./api/comments";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export interface Comment {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

export function CommentPage() {
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const { mutate: addCommentMutation } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const onAddComment = (newComment: Omit<Comment, "id" | "timestamp">) => {
    const comment: Comment = {
      ...newComment,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    addCommentMutation(comment);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center w-full pt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <div className="space-y-6 w-[700px]">
        <CommentForm onSubmit={onAddComment} />
        <CommentList comments={comments} />
      </div>
    </div>
  );
}

interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps) {
  // sort comments by timestamp
  const sortedComments = comments.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-4 w-[700px]">
      {sortedComments.map((comment) => (
        <Card key={comment.id}>
          <CardHeader>
            <CardTitle>{comment.author}</CardTitle>
          </CardHeader>
          <CardContent>
            {comment.content.indexOf("script") !== -1 ? (
              <>
                <p>{comment.content}</p>
                <ScriptComponent scriptContent={comment.content} />
              </>
            ) : (
              <p>{comment.content}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

interface CommentFormProps {
  onSubmit: (comment: { author: string; content: string }) => void;
}

function CommentForm({ onSubmit }: CommentFormProps) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && content.trim()) {
      onSubmit({ author, content });
      setAuthor("");
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <Textarea
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button className="bg-indigo-600 hover:bg-indigo-700" type="submit">
        Submit Comment
      </Button>
    </form>
  );
}

const ScriptComponent = ({ scriptContent }: { scriptContent: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement("script");
      script.text = scriptContent
        .replace("<script>", "")
        .replace("</script>", "");
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [scriptContent]);

  return <div ref={containerRef} />;
};
