import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "./components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(() => navigate("/comments"));
  };

  return (
    <main className=" flex justify-center bg-gray-50 h-screen w-full">
      <Card className="w-[350px] h-[330px] mt-32">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 mt-6 w-full"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
