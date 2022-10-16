import JSONFetch from "helpers/JSONFetch";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
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

export const getStaticPaths: GetStaticPaths = async () => {
  const pages: { data: { id: number; attributes: any }[] } = await JSONFetch(
    `http://localhost:1337/api/common-pages?locale=all`
  );
  const paths = pages.data.map(({ attributes }) => ({
    params: { pageUrl: attributes.url },
    locale: attributes.locale,
  }));
  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as any;
  const { pageUrl } = context.params as any;
  const page: { data: { id: number; attributes: any }[] } = await JSONFetch(
    `http://localhost:1337/api/common-pages?url=${pageUrl}&locale=${locale}&populate[0]=BaseContent`
  );

  const data = page.data[0];
  const meta = { title: data.attributes.BaseContent.title };

  return {
    props: { data, meta },
  };
};

export default Page;
