import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { defaultLoader } from "~/shared/utils/loader";

export const loader = defaultLoader;

export function WebLayout() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Telegram Mini App - Web Version" />
        <meta name="theme-color" content="#000000" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
        <div className="min-h-screen">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
