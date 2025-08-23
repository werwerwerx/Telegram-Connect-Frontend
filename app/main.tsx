import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./root";
import Index from "./routes/telegram";
import Home from "./routes/telegram/home";
import Channels from "./routes/telegram/channels";
import Advertisers from "./routes/telegram/advertisers";
import Deals from "./routes/telegram/deals";
import { Presentation } from "./routes/telegram/presentation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/tma",
        element: <Index />,
      },
      {
        path: "/tma/presentation",
        element: <Presentation />,
      },
      {
        path: "/tma/home",
        element: <Home />,
      },
      {
        path: "/tma/channels",
        element: <Channels />,
      },
      {
        path: "/tma/advertisers",
        element: <Advertisers />, 
      },
      {
        path: "/tma/deals",
        element: <Deals />,
      }
    ],
  },
], {
  basename: import.meta.env.BASE_URL || '/'
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);