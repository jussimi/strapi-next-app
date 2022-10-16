// /** @type {import('next').NextConfig} */

const fs = require("fs");

const getConfig = async () => {
  const localesResponse = await fetch("http://localhost:1337/api/i18n/locales");
  const localesData = await localesResponse.json();
  const locales = localesData.map(({ code }) => code);

  const pagesResponse = await fetch(
    "http://localhost:1337/api/common-pages?locale=all"
  );
  const pagesData = await pagesResponse.json();
  const sitemap = {};
  for (const locale of locales) {
    sitemap[locale] = ["/"];
  }
  for (const { attributes } of pagesData.data) {
    sitemap[attributes.locale].push(attributes.url);
  }
  const paths = pagesData.data.map(({ attributes }) => ({
    locale: attributes.locale,
    url: attributes.url,
  }));

  fs.writeFileSync("sitemap.json", JSON.stringify(sitemap));

  const nextConfig = {
    i18n: {
      locales,
      defaultLocale: "fi",
    },
    reactStrictMode: true,
    swcMinify: true,
    // redirects: async () => {
    //   return [{ source: "/", destination: "/fi", permanent: true }];
    // },
  };
  return nextConfig;
};

module.exports = getConfig;
