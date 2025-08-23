import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/entry.tsx"),
  
  layout("routes/web/layout.tsx", [
    route("/web/home", "routes/web/home.tsx"),
  ]),
  
  route("/tma/entry", "routes/telegram/entry.tsx"),
  layout("routes/telegram/layout.tsx", [
    route("/tma/home", "routes/telegram/home.tsx"),
    route("/tma/channels", "routes/telegram/channels.tsx"),
    route("/tma/advertisers", "routes/telegram/advertisers.tsx"),
    route("/tma/deals", "routes/telegram/deals.tsx"),
    route("/tma/channels-list", "routes/telegram/channels-list.tsx"),
  ]),
] satisfies RouteConfig;