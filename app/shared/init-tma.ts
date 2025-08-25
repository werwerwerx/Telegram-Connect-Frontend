import { restoreInitData, setDebug, miniApp, mountBackButton, init } from "@telegram-apps/sdk-react";
import { oklchStringToRgb } from "./utils/oklch-to-rgb";

export const initializeTMA = async () => {
  await init();
  mountBackButton.ifAvailable();
  restoreInitData();
  setDebug(true);

  if (miniApp.mountSync.isAvailable()) {
    if (!miniApp.isMounted()) {
      miniApp.mountSync();
    }

    const bgColor = document.documentElement.style.getPropertyValue('--background');
    const foregroundColor = document.documentElement.style.getPropertyValue('--foreground');
    const rgb = oklchStringToRgb(bgColor);
    const foregroundRgb = oklchStringToRgb(foregroundColor);
    if (rgb && foregroundRgb) {
      miniApp.setHeaderColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      miniApp.setBottomBarColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      miniApp.setHeaderColor(`rgb(${foregroundRgb.r}, ${foregroundRgb.g}, ${foregroundRgb.b})`);
    }
  }
}
