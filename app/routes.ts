import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/entry.tsx"),
  
  layout("routes/web/_web.layout.tsx", [
    route("/web/home", "routes/web/web.home.tsx"),
  ]),
  
  route("/tma/entry", "routes/telegram/telegram.entry.tsx"),
  layout("routes/telegram/_telegram.tsx", [
    route("/tma/home", "routes/telegram/telegram.home.tsx"),
    route("/tma/channels", "routes/telegram/telegram.channels.tsx"),
    route("/tma/advertisers", "routes/telegram/telegram.advertisers.tsx"),
    route("/tma/deals", "routes/telegram/telegram.deals.tsx"),
    route("/tma/channels-list", "routes/telegram/telegram.channels-list.tsx"),
  ]),
] satisfies RouteConfig;