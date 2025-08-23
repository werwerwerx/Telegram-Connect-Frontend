import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { TelegramShadcnThemeAdapt } from "~/shared/components/telegram-shadcn-theme-adapt";
import { Navigation } from "~/shared/components/navigation";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export function shouldRevalidate() {
  return false; 
}


export default function TelegramLayout() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <Meta />
        <Links />
      </head>
      <body className="bg-background text-foreground">
          <div className="min-h-screen pb-16">
            <Outlet />
          </div>
          <Navigation />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}