import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "components/Layout";
import sitemap from "sitemap.json";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout meta={{ ...(pageProps as any).meta }} sitemap={sitemap}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
