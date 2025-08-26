import { treaty } from "@elysiajs/eden";
import {retrieveRawInitData } from "@telegram-apps/sdk-react";
import type { App } from "server/index";


const createApiWithAuthorization = () => {
  const launchParams = retrieveRawInitData();
  if(!launchParams) {
    return null;
  }

  const api = treaty<App>("http://localhost:3001", {
    headers: {
      authorization: `tma ${launchParams}`,
    },
  });

  return {
    channels: {
      get: (params?: {
        query?: Record<string, unknown>;
        fetch?: RequestInit;
      }) =>
        api.channels.get({
          headers: { authorization: `tma ${launchParams}` },
          ...params,
        }),
    },
  };
};

export const api = createApiWithAuthorization();