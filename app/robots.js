import { MetadataRoute } from "next";

export default function robots({ urls }) {
  

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
        JSON.stringify(urls),
      ],
    },
  };
}
export async function getServerSideProps({ res }) {
  
  let urls = await fetch(`https://admin.popipro.com/api/published-url`);
  return {
    props: { urls },
  };
}