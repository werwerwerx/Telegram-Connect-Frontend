import { useNavigate } from "react-router";
import {isTMA} from "@telegram-apps/sdk-react"
import { defaultLoader } from "~/shared/utils/loader";

export const loader = defaultLoader;

export const Entry = () => {
  const navigate = useNavigate();
    if(isTMA()) {
      navigate("/tma/home")
    }else{
      navigate("/web/home");
    }
  return null;
}