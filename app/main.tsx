import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Link, RouterProvider } from "react-router";
import "./shared/i18n";
import App from "./root";
import Index from "./routes/telegram";
import Advertising from "./routes/telegram/advertising";
import Deals from "./routes/telegram/deals";
import Profile from "./routes/telegram/profile";
import { Presentation } from "./routes/telegram/presentation";
import { MascotDisplay } from "./shared/components/mascotDisplay";
import { MascotWidjet } from "./shared/components/mascotWidjet";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./shared/components/ui-kit/button";

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
        path: "/tma/advertising",
        element: <Advertising />,
      },
      {
        path: "/tma/deals",
        element: <Deals />, 
      },
      {
        path: "/tma/profile",
        element: <Profile />,
      }, {
        // todo add translation
        path: "*",
        element: <div className="w-screen h-screen flex items-center justify-center">
          <MascotWidjet mood="crying" title="404" subtitle="Page not found" />
          <Link to="/tma/profile">
            <Button>
              <ArrowLeftIcon />
              <span>Return to profile</span>
            </Button>
          </Link>
        </div>
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