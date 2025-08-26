import { useLaunchParams } from "@telegram-apps/sdk-react";
import { HomeIcon, Send, HandCoins, Users, User, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import i18n from "../i18n";
import { cn } from "../lib/utils";

const NavIcon = ({ iconName, className = "" }: { iconName: string; className?: string }) => {
  const iconMap = {
    users: Users,
    "message-circle": MessageCircle,
    user: User,
  };

  const IconComponent = iconMap[iconName as keyof typeof iconMap];

  if (!IconComponent) return null;

  return <IconComponent className={cn("w-[19px] h-[19px]", className)} strokeWidth={2.5} />;
};



const navLangResourceRu = {
  advertising: "Реклама",
  deals: "Сделки",
  profile: "Профиль",
}
const navLangResourceEn = {
  advertising: "Advertising",
  deals: "Deals",
  profile: "Profile",
}

i18n.loadNamespaces(["navigation"]);
i18n.addResourceBundle("ru", "navigation", navLangResourceRu);
i18n.addResourceBundle("en", "navigation", navLangResourceEn);


export const Navigation = () => {
  const { t, i18n } = useTranslation("navigation");
  const location = useLocation();

  const NavItems: {
    navTo: string,
    iconName: string,
    label: string,
    text: string,
  }[] = [{
    navTo: "/tma/advertising",
    iconName: "users",
    label: "advertising",
    text: t("advertising"),
  }, {
    navTo: "/tma/deals",
    iconName: "message-circle",
    label: "deals",
    text: t("deals"),
  }, {
    navTo: "/tma/profile",
    iconName: "user",
    label: "profile",
    text: t("profile"),
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-border shadow-lg py-2 px-[10%] flex justify-between items-center pb-5 min-w-screen">
      {NavItems.map((item) => (
        <Link key={item.navTo} to={item.navTo} className={cn("flex flex-col items-center justify-center gap-1 text-muted-foreground text-[12px] font-normal tracking-widest transition-colors duration-300", {
          "!text-primary": location.pathname === item.navTo,
        })}>
          {item.iconName === "user" ? (
            <UserAvatar />
          ) : (
            <NavIcon iconName={item.iconName} />
          )}
          <span className={cn("tracking-wider", {
            "text-primary": location.pathname === item.navTo,
          })}>{item.text}</span>
        </Link>
      ))}
    </div>
  );
};


const UserAvatar = () => {
  const data = useLaunchParams();
  return (
    <img src={data.tgWebAppData?.user?.photo_url} alt="user" className={cn("w-6 h-6 rounded-full border", {
      "border-primary": location.pathname === "/tma/profile",
    })} />
  );
}