import { restoreInitData, setDebug, miniApp, bindViewportCssVars, mountViewport, mountBackButton, init, bindThemeParamsCssVars } from "@telegram-apps/sdk-react";

export const initializeTMA = async () => {
  await init();
  mountBackButton.ifAvailable();
  restoreInitData();
  setDebug(true);

  if (miniApp.mountSync.isAvailable()) {
    miniApp.mountSync();
    bindThemeParamsCssVars();
  }

  if (mountViewport.isAvailable()) {
    await mountViewport();
    bindViewportCssVars();
  }

};
