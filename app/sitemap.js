export default async function sitemap() {
  let data = await fetch(`https://admin.popipro.com/api/published-url`);
  let urls = await data.json();
  console.warn(urls);
  let profiles = urls?.data?.map((url) => {
    return {
      key: url,
      url: "https://app.popipro.com/" + url+ '/', 
      lastModified: new Date().toISOString(),
    };
  });

  return [...profiles];
}
