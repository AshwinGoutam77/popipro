import React, { Suspense } from "react";
import { headers } from "next/headers";
import "../../styles/about.css";
import "../../styles/edit.css";
import Main from "./Main";

export async function generateMetadata({ params, searchParams }) {
  const { profile } = params;
  const data = (await getProfileData(profile)) || {};
  let regex = /(<([^>]+)>)/gi;
  let card = data?.data?.card || {};
  let title = card?.meta_title
    ? card?.meta_title
    : card.first_name
    ? card?.first_name + " - " + card?.card_profession
    : "Popipro";
  let description = card?.meta_description
    ? card?.meta_description?.replace(regex, "")
    : card?.card_description?.replace(regex, "");
  description = description?.replace(/<(.|\n)*?>/g, "").substring(0, 159);

  return {
    title,
    description,
    robots: "noindex",
    openGraph: {
      title,
      description,
      type: "website",
      images:
        data?.data?.card?.base_url + data?.data?.card?.profile_picture?.path,
    },
  };
}

const ProfilePage = async ({ params}) => {
  const headersList = headers();
  const referer = headersList.get("referer");
  const { profile } = params;
  const data = (await getProfileData(profile)) || {};

  let DataDecription = data?.data?.card?.card_description?.substring(0, 160);
  const jsonLd = `{
    "@context": "https://schema.org",
    "@type":
      data?.data?.card?.card_name == "Popipro" ? "Person" : "Organization",
    name: data?.data?.card?.first_name,
    image: [
      "https://admin.popipro.com/" + data?.data?.card?.profile_picture?.path,
    ],
    description: ${data?.data?.card?.card_description}.replace(/(<([^>]+)>)/gi, ""),
  }`;
  return (
    <>
      <script
        async
        src="//www.instagram.com/embed.js"
        strategy="worker"
      ></script>
      <script
        type="text/javascript"
        src="https://platform.linkedin.com/badges/js/profile.js"
        async
        defer
        strategy="worker"
      ></script>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Suspense
        fallback={
          <h5
            className="d-flex align-items-center justify-content-center text-center"
            style={{ height: "100vh" }}
          >
            Loading...
          </h5>
        }
      >
        <Main
          profile={profile}
          data={data}
          id={data?.data?.card?.id}
          referer={referer}
        />
      </Suspense>
    </>
  );
};

export default ProfilePage;

const getProfileData = async (profile) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_MODE == "development"
      ? `https://dev.popipro.com/api/get-card-data/?card_url=${profile}`
      : `https://admin.popipro.com/api/get-card-data/?card_url=${profile}`,
    { cache: "no-store" },
    { next: { revalidate: 0 } }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
  }
};
