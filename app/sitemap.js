export default async function sitemap() {
  let data = await fetch(`https://admin.popipro.com/api/published-url`);
  let urls = await data.json();
  let profiles = urls?.data?.map((url) => {
    return {
      key: 1,
      url: "https://app.popipro.com/prafull-gupta"
    };
  });

  return [...profiles];
}
