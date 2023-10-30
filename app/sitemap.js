export default function sitemap() {
  let urls = fetch(`https://jsonplaceholder.typicode.com/posts`);

  let profiles = urls.map((url, i) => {
    return {
      url: 'https://work.popipro.com/'+url.userId,
      lastModified: new Date().toISOString(),
    };
  });

  return [...profiles];
}
