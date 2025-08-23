import { useLaunchParams } from "@telegram-apps/sdk-react";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { isDev } from "~/shared/utils/isDev";

export const TelegramUserContext = createContext<TelegramUser | null>(null);

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const lp = useLaunchParams();
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (lp.tgWebAppData?.user) {
      setUser({
        id: lp.tgWebAppData.user.id,
        first_name: lp.tgWebAppData.user.first_name || "",
        last_name: lp.tgWebAppData.user.last_name || "",
        username: lp.tgWebAppData.user.username || "",
      });
    } else if (isDev()) {
      console.log("launch parans is not properly set, maybe its opened in dev, using mock user")
      setUser({
        id: 1,
        first_name: "Вася",
        last_name: "Пупкин",
        username: "vasyapupkin",
      });
    }else{
      throw new Error("launch parans is not properly set")
    }
  }, [lp]);

  return <TelegramUserContext.Provider value={user}>{children}</TelegramUserContext.Provider>;
};