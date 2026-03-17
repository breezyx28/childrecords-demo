import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./app/globals.css";
import { Providers } from "@/redux/provider";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "@/components/ui/sonner";
import SubscribeAlert from "@/components/pages/subscribe";
import UpgradeAlert from "@/components/pages/upgrade";
import Loading from "@/app/loading";
import { ModalScrollLock } from "@/components/ModalScrollLock";
import { Suspense } from "react";
import { AppRoutes } from "./routes";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ModalScrollLock />
      <UserProvider>
        <Suspense fallback={<Loading />}>{children}</Suspense>
        <Toaster
          richColors
          closeButton
          expand={false}
          theme={"light"}
          toastOptions={{
            closeButton: true,
            className: "min-h-[100px]",
          }}
          position="top-center"
        />
        <SubscribeAlert />
        <UpgradeAlert />
      </UserProvider>
    </Providers>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RootLayout>
        <AppRoutes />
      </RootLayout>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
