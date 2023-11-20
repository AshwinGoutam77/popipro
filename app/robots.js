let MODE = process.env.NEXT_PUBLIC_MODE;
export default function robots() {
  let robots_obj;

  if(MODE !== 'production') {
    robots_obj = {
      rules: {
        disallow: '/',
      }
    };
  }else{
    robots_obj = {
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
          "/edit/",
        ],
      },
      sitemap: "https://app.popipro.com/sitemap.xml",
    };
  }


  return robots_obj;
}
