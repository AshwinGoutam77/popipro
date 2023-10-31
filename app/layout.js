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

      <body className={poppins.className + " p-0"}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
