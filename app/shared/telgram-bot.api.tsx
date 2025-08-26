import React from "react";

import { treaty } from "@elysiajs/eden";
import type { App } from "../../../server/src/index";
import { createContext, useContext, useState } from "react";
import { useRawInitData } from "@telegram-apps/sdk-react";

type TelegramBotApiContextType = {
  api: ReturnType<typeof treaty<App>> | null;
  createApi: () => void;
};

export const TelegramBotApiContext =
  createContext<TelegramBotApiContextType | null>(null);

export const useTelegramBotApi = () => {
  const context = useContext(TelegramBotApiContext);
  if (!context) {
    throw new Error(
      "useTelegramBotApi must be used within TelegramBotApiContext.Provider"
    );
  }
  return context;
};

export const TelegramBotApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [api, setApi] = useState<ReturnType<typeof treaty<App>> | null>(null);
  const rawInitData = useRawInitData();
  const createApi = () => {
    if (api) return;
    const newApi = treaty<App>("http://localhost:3000", {
      headers: {
        Authorization: `tma ${rawInitData}`,
      },
    });
    setApi(newApi);
  };

  return (
    <TelegramBotApiContext.Provider value={{ api, createApi }}>
      {children}
    </TelegramBotApiContext.Provider>
  );
};
