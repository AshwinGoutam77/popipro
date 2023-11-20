export default async function sitemap() {
  let data = await fetch(`https://admin.popipro.com/api/published-url`);
  let urls = await data.json();
  let profiles = urls?.data?.map((url) => {
    return {
      key: url,
      url: "https://app.popipro.com/" + url,
      lastModified: new Date().toISOString(),
    };
  });

  return [
      {
        key: "brad-sacks-founder-optiweb-marketing",
        url: "https://app.popipro.com/brad-sacks-founder-optiweb-marketing",
        lastModified: "2023-11-19",
      },
      {
        key: "prafull-gupta",
        url: "https://app.popipro.com/prafull-gupta",
        lastModified: "2023-11-20",
      },
      {
        key: "len-cutter-co-owner-cutter-and-cutter-fine-art",
        url: "https://app.popipro.com/len-cutter-co-owner-cutter-and-cutter-fine-art",
        lastModified: "2023-11-18",
      },
      {
        key: "sonya-cutter-co-owner-cutter-and-cutter-fine-art",
        url: "https://app.popipro.com/sonya-cutter-co-owner-cutter-and-cutter-fine-art",
        lastModified: "2023-11-18",
      },
      {
        key: "dr-mohit-tambi-bds",
        url: "https://app.popipro.com/dr-mohit-tambi-bds",
        lastModified: "2023-11-16",
      },
      {
        key: "stephen-wall",
        url: "https://app.popipro.com/stephen-wall",
        lastModified: "2023-11-16",
      },
      {
        key: "cameron-watkin",
        url: "https://app.popipro.com/cameron-watkin",
        lastModified: "2023-11-18",
      },
      {
        key: "andrew-leeson",
        url: "https://app.popipro.com/andrew-leeson",
        lastModified: "2023-11-20",
      },
      {
        key: "jeff-gill",
        url: "https://app.popipro.com/jeff-gill",
        lastModified: "2023-11-18",
      },
      {
        key: "horatio-oshea",
        url: "https://app.popipro.com/horatio-oshea",
        lastModified: "2023-11-19",
      },
      {
        key: "dhamani-enterprises",
        url: "https://app.popipro.com/dhamani-enterprises",
        lastModified: "2023-11-18",
      },
      {
        key: "lota-ram",
        url: "https://app.popipro.com/lota-ram",
        lastModified: "2023-11-16",
      },
      {
        key: "chris-moorfoot",
        url: "https://app.popipro.com/chris-moorfoot",
        lastModified: "2023-11-18",
      },
      {
        key: "mark-lazarus",
        url: "https://app.popipro.com/mark-lazarus",
        lastModified: "2023-11-16",
      },
      {
        key: "hugo-ortega",
        url: "https://app.popipro.com/hugo-ortega",
        lastModified: "2023-11-18",
      },
      {
        key: "vishnu-rathi-mahesh-suppliers",
        url: "https://app.popipro.com/vishnu-rathi-mahesh-suppliers",
        lastModified: "2023-11-16",
      },
      {
        key: "kanwar-lal-sharma-advocate",
        url: "https://app.popipro.com/kanwar-lal-sharma-advocate",
        lastModified: "2023-11-16",
      },
      {
        key: "rakesh-shekhawat-software-developer",
        url: "https://app.popipro.com/rakesh-shekhawat-software-developer",
        lastModified: "2023-11-16",
      },
      {
        key: "raghav-rathi-mahesh-suppliers",
        url: "https://app.popipro.com/raghav-rathi-mahesh-suppliers",
        lastModified: "2023-11-16",
      },
      {
        key: "ayush-sharma-shree-event-planner",
        url: "https://app.popipro.com/ayush-sharma-shree-event-planner",
        lastModified: "2023-11-16",
      },
      {
        key: "dr-neetu-rawat-asst-professor-botany",
        url: "https://app.popipro.com/dr-neetu-rawat-asst-professor-botany",
        lastModified: "2023-11-18",
      },
      {
        key: "shweta-sharma-yoga-and-fitness-trainer",
        url: "https://app.popipro.com/shweta-sharma-yoga-and-fitness-trainer",
        lastModified: "2023-11-18",
      },
      {
        key: "avinash-agrawal-nic",
        url: "https://app.popipro.com/avinash-agrawal-nic",
        lastModified: "2023-11-16",
      },
      {
        key: "harsh-dusad-insurance-advisor",
        url: "https://app.popipro.com/harsh-dusad-insurance-advisor",
        lastModified: "2023-11-17",
      },
      {
        key: "manish-khatri-damn-perfect",
        url: "https://app.popipro.com/manish-khatri-damn-perfect",
        lastModified: "2023-11-16",
      },
      {
        key: "shradha-nand-sharma-hachetech",
        url: "https://app.popipro.com/shradha-nand-sharma-hachetech",
        lastModified: "2023-11-16",
      },
      {
        key: "mahesh-kumar-sharma-maharaj-hotels",
        url: "https://app.popipro.com/mahesh-kumar-sharma-maharaj-hotels",
        lastModified: "2023-11-16",
      },
      {
        key: "shivam-rawat-ca",
        url: "https://app.popipro.com/shivam-rawat-ca",
        lastModified: "2023-11-16",
      },
      {
        key: "shekhar-sharma-ss-tour-guide",
        url: "https://app.popipro.com/shekhar-sharma-ss-tour-guide",
        lastModified: "2023-11-01",
      },
      {
        key: "saryu-gupta-solution-architect",
        url: "https://app.popipro.com/saryu-gupta-solution-architect",
        lastModified: "2023-11-16",
      },
      {
        key: "sanjay-sharma-business-manager",
        url: "https://app.popipro.com/sanjay-sharma-business-manager",
        lastModified: "2023-11-16",
      },
      {
        key: "himanshu-gupta-ui-designer",
        url: "https://app.popipro.com/himanshu-gupta-ui-designer",
        lastModified: "2023-11-16",
      },
      {
        key: "raj-dance-choreographer",
        url: "https://app.popipro.com/raj-dance-choreographer",
        lastModified: "2023-11-16",
      },
      {
        key: "luljeta-ortega",
        url: "https://app.popipro.com/luljeta-ortega",
        lastModified: "2023-11-18",
      },
      {
        key: "shipra-khandelwal-boutique-cake",
        url: "https://app.popipro.com/shipra-khandelwal-boutique-cake",
        lastModified: "2023-11-18",
      },
      {
        key: "deepshikha-jain-travel-blogger",
        url: "https://app.popipro.com/deepshikha-jain-travel-blogger",
        lastModified: "2023-11-18",
      },
      {
        key: "roli-tripathi-pageants-indie-royal-founder",
        url: "https://app.popipro.com/roli-tripathi-pageants-indie-royal-founder",
        lastModified: "2023-11-18",
      },
      {
        key: "jason-williams-president-watec-cameras",
        url: "https://app.popipro.com/jason-williams-president-watec-cameras",
        lastModified: "2023-11-18",
      },
      {
        key: "ryan-berkofsky-digital-media-strategist-founder-entrepreneur",
        url: "https://app.popipro.com/ryan-berkofsky-digital-media-strategist-founder-entrepreneur",
        lastModified: "2023-11-18",
      },
      {
        key: "john-flagler-founder-moving-shadows",
        url: "https://app.popipro.com/john-flagler-founder-moving-shadows",
        lastModified: "2023-11-18",
      },
      {
        key: "shashi-gupta-senior-ios-developer",
        url: "https://app.popipro.com/shashi-gupta-senior-ios-developer",
        lastModified: "2023-11-18",
      },
      {
        key: "mark-cutter-co-owner-cutter-and-cutter-fine-art",
        url: "https://app.popipro.com/mark-cutter-co-owner-cutter-and-cutter-fine-art",
        lastModified: "2023-11-18",
      },
      {
        key: "ankit-singh-ceo-innoapps",
        url: "https://app.popipro.com/ankit-singh-ceo-innoapps",
        lastModified: "2023-11-16",
      },
      {
        key: "sachin-kumar-kamboj-cto-innoapps",
        url: "https://app.popipro.com/sachin-kumar-kamboj-cto-innoapps",
        lastModified: "2023-11-16",
      },
      {
        key: "happy-healthy-homes",
        url: "https://app.popipro.com/happy-healthy-homes",
        lastModified: "2023-11-17",
      },
      {
        key: "astha-katta-founder-shyle",
        url: "https://app.popipro.com/astha-katta-founder-shyle",
        lastModified: "2023-11-16",
      },
  ];
}
