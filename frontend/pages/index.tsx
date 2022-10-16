import JSONFetch from "helpers/JSONFetch";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "styles/Home.module.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Page: NextPage<{ data: any; urls: any[] }> = ({ data }) => {
  const router = useRouter();
  const { pageUrl } = router.query;
  const { BaseContent } = data.attributes;
  return (
    <div className={styles.container}>
      {pageUrl}
      {JSON.stringify(BaseContent)}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {BaseContent.content}
      </ReactMarkdown>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
//   const paths = locales.map((locale) => ({
//     params: { locale },
//   }));
//   return {
//     paths,
//     fallback: false, // can also be true or 'blocking'
//   };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as any;
  const data: { data: any; meta: any } = await JSONFetch(
    `http://localhost:1337/api/homepage?locale=${locale}&populate[0]=BaseContent`
  );

  return {
    props: {
      data: data.data,
      meta: { title: data.data.attributes.BaseContent.title },
    },
  };
};

export default Page;
