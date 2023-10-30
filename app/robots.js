export default function robots() {
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
      ],
    },
    sitemap: "https://front.popipro.com/sitemap.xml",
  };
}