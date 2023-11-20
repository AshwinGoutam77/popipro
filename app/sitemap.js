export default async function sitemap() {
  let data = await fetch(`https://admin.popipro.com/api/published-url`);
  let urls = await data.json();
  let profiles = urls && urls.data && urls?.data?.map((data,i) => {
    return {
      key: i,
      url: `https://app.popipro.com/${data.url}`
    };
  });

  return [...profiles];
}
