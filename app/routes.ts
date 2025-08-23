import { type RouteConfig, index, route, layout, prefix } from "@react-router/dev/routes";

export default [
  index("routes/entry.tsx"),

  layout("routes/web/_web.layout.tsx", [
    route("/web/home", "routes/web/web.home.tsx"),
  ]),
  ...prefix("tma", [
    route("/entry", "routes/telegram/telegram.entry.tsx"),
    layout("routes/telegram/_telegram.tsx", [
      route("/home", "routes/telegram/telegram.home.tsx"),
      route("/channels", "routes/telegram/telegram.channels.tsx"),
      route("/advertisers", "routes/telegram/telegram.advertisers.tsx"),
      route("/deals", "routes/telegram/telegram.deals.tsx"),
      route("/channels-list", "routes/telegram/telegram.channels-list.tsx"),
    ]),

  ]),
] satisfies RouteConfig;