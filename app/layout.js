import "./styles/bootstrap.min.css";
import "./styles/globals.css";
import "./styles/style.css";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Poppins } from "next/font/google";
import AuthContextProvider from "@context/AuthContextProvider";
import Head from "next/head";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins",
});

export const metadata = {
  title: "Popipro",
  description: "Popipro",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_MODE !== "development" && (
          <meta
            name="google-site-verification"
            content="0WVIx5gDG1k-9nYt0gHCFJPjrlYeRIjIr2asTHblQcQ"
          />
        )}
      </head>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-JGP54SPWQQ" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){
              dataLayer.push(arguments);
            }
            gtag('js', new Date()); gtag('config', 'G-JGP54SPWQQ');
          `}
      </Script>
      <Script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0"
        nonce="your_nonce"
      ></Script>

      <body className={poppins.className + " p-0"}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
