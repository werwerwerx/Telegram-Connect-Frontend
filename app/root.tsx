import { Outlet } from "react-router";
import { ErrorBoundary } from "react-error-boundary";

import "./app.css";
import { isDev } from "./shared/utils/isDev";
import { useTranslation } from "react-i18next";
import { MascotWidjet } from "./shared/components/mascotWidjet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
});
export default function App() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background text-foreground w-screen dark font-sans overflow-x-hidden">
      <ErrorBoundary fallbackRender={({error}) => <ErrorFallback error={error} t={t} />}>
        <QueryClientProvider client={queryClient}>
            <Outlet />
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

const ErrorFallback = ({ error, t }: { error: Error, t: (key: string) => string }) => {
  return (
    <div className="min-h-screen bg-background text-foreground w-screen dark font-sans flex flex-col items-center justify-center">
      <MascotWidjet
        mood="crying"
        title={t("common.clientUnknownError")}
        subtitle={isDev() ? error.message : t("common.clientUnknownErrorTryTo")}
      />
    </div>
  );
};
