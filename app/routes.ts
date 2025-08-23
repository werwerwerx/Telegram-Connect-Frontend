import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  layout("routes/web/_web.layout.tsx", [
    route("/web/home", "routes/web/web.home.tsx"),
  ]),
  ...prefix("tma", [
    layout("routes/telegram/_telegram.tsx", [
      route("/", "routes/telegram/entry.tsx"),
      route("/home", "routes/telegram/telegram.home.tsx"),
      route("/channels", "routes/telegram/telegram.channels.tsx"),
      route("/advertisers", "routes/telegram/telegram.advertisers.tsx"),
      route("/deals", "routes/telegram/telegram.deals.tsx"),
    ]),

  ]),
] satisfies RouteConfig;