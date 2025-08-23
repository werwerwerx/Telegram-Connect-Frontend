import { isTMA } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Entry() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTMA = async () => {
      try {
        const isTelegram = await isTMA();
        if (isTelegram) {
          navigate("/tma/home", { replace: true });
        } else {
          navigate("/web/home", { replace: true });
        }
      } catch (error) {
        console.error("Error checking TMA:", error);
        navigate("/web/home", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkTMA();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Определяем среду...</p>
        </div>
      </div>
    );
  }

  return null;
}