export default async function sitemap() {
  let data = await fetch(`https://admin.popipro.com/api/published-url`);
  let urls = await data.json();
  let profiles = urls?.data?.map((url) => {
    console.log(url.url);
    return {
      key: url,
      url: "https://app.popipro.com/" + url.url,
      lastModified: url.date,
    };
  });

  return [...profiles];
}
