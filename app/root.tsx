import {
  isRouteErrorResponse,
  Outlet,
} from "react-router";

import "./app.css";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground w-screen dark font-sans">
      <Outlet />
    </div>
  );
}

