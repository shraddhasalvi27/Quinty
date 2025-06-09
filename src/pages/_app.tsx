import { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import { ContextProvider } from "../contexts/ContextProvider";
import { AppBar } from "../components/AppBar";
import Footer from "../components/Footer";
import Notifications from "../components/Notification";
import Script from "next/script";

import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="bg-default-900">
      <Head>
        <title>Solana token creator</title>
      </Head>
      <ContextProvider>
        <Notifications />
        <AppBar />
        <Component {...pageProps} />
        <Footer />
      </ContextProvider>

      {/* Proper way to load external scripts in Next.js */}
      <Script src="/assets/libs/preline/preline.js" strategy="beforeInteractive" />
      <Script src="/assets/libs/swiper/swiper-bundle.min.js" strategy="beforeInteractive" />
      <Script src="/assets/libs/gumshoejs/gumshoe.polyfills.min.js" strategy="beforeInteractive" />
      <Script src="/assets/libs/lucide/lucide.min.js" strategy="beforeInteractive" />
      <Script src="/assets/libs/aos/aos.js" strategy="beforeInteractive" />
      <Script src="/assets/js/swiper.js" strategy="beforeInteractive" />
      <Script src="/assets/js/theme.js" strategy="beforeInteractive" />
    </div>
  );
};

export default App;
