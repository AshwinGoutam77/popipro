export default async function sitemap() {
  let urls = await fetch(`https://admin.popipro.com/api/published-url`);
  console.warn(urls);
  /* let profiles = urls?.data?.map((url) => {
    return {
      key: url,
      url: "https://work.popipro.com/" + url,
      lastModified: new Date().toISOString(),
    };
  }); */

  return [
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
