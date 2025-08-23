import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./root";
import Index from "./routes/telegram";
import Home from "./routes/telegram/home";
import Advertisers from "./routes/telegram/advertisers";
import Deals from "./routes/telegram/deals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "advertisers",
        element: <Advertisers />, 
      },
      {
        path: "deals",
        element: <Deals />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);