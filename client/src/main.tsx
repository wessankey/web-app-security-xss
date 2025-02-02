import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { App } from "./App.tsx";
import { CommentPage } from "./Comments.tsx";
import { LoginPage } from "./LoginPage.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/comments" element={<CommentPage />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
