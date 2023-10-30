import { MetadataRoute } from "next";

export default async function robots() {
  
  let urls = await fetch(`https://admin.popipro.com/api/published-url`);
  console.warn(urls);
  
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/login/",
        "/dashboard/",
        "/insights/",
        "/leads/",
        "/plan/",
        "/products/",
        "/product-enquiry/",
        "/testimonialsLeads/",
        "/blog/",
        "/appointment-lead/",
        JSON.stringify(urls)
      ],
    },
  };
}
