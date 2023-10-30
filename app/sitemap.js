export default function sitemap() {
  let urls = fetch(`https://admin.popipro.com/api/published-url`);

  let profiles = urls.data.map((url) => {
    return {
      key: url,
      url: "https://work.popipro.com/" + url,
      lastModified: new Date().toISOString(),
    };
  });

  return [...profiles];
}
