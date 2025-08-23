import { useNavigate } from "react-router";
import {isTMA} from "@telegram-apps/sdk-react"
import { defaultLoader } from "~/shared/utils/loader";

export const loader = defaultLoader;

export const Entry = async () => {
  const navigate = useNavigate();
    if(await isTMA()) {
      navigate("/tma/home")
    }else{
      navigate("/web/home");
    }
  return null;
}