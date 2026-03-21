import { Suspense } from "react";
import "./globals.css";

// redux
import { Providers } from "@/redux/provider";

// fonts
// import { Nunito, IBM_Plex_Sans_Arabic } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import Loading from "./loading";
import { UserProvider } from "@/context/UserContext";
import SubscribeAlert from "@/components/pages/subscribe";
import UpgradeAlert from "@/components/pages/upgrade";
// import ThemeProvider from "@/components/theme/theme-provider";

// const nunito = Nunito({
//   subsets: ["latin"],
//   variable: "--font-nunito",
// });
// const ibmPlex = IBM_Plex_Sans_Arabic({
//   weight: "500",
//   subsets: ["arabic"],
//   variable: "--font-ibm-plex",
// }); // use it when you want to change to arabic language

export const metadata = {
  title: "Child Records",
  description: "Child Records description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className="overflow-x-hidden max-w-full"
      suppressHydrationWarning={true}
    >
      <head>
      <meta name="google-site-verification" content="lOwzWFefOzez5j3RVwNvDNRN4KetsO_-qWH95VX7IIE" />
      </head>
      <body
        dir={"ltr"}
        className={`min-w-0 w-full max-w-[1800px] overflow-x-hidden bg-gradient`}
        // className={`${nunito.className} overflow-x-hidden bg-gradient max-w-[1800px]`}
        suppressHydrationWarning={true}
      >
        <Providers>
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
            {/* subscriptions alerts */}
            <SubscribeAlert />
            <UpgradeAlert />
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
