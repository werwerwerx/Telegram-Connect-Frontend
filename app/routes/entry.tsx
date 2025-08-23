import { isTMA } from "@telegram-apps/sdk-react";
import { redirect } from "react-router";

export async function loader() {
  try {
    const isTelegram = await isTMA();
    if (isTelegram) {
      return redirect("/tma/home");
    } else {
      return redirect("/web/home");
    }
  } catch (error) {
    console.error("Error checking TMA:", error);
    return redirect("/web/home");
  }
}

export default function Entry() {
  return null;
}