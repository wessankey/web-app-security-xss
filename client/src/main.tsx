import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Dashboard } from "./Dashboard.tsx";
import { Login } from "./Login.tsx";
import "./index.css";
import { SidebarProvider } from "./components/ui/sidebar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/comments" element={<Dashboard />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
