import React, { Suspense } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import Main from "./Main";

export async function generateMetadata({ params, searchParams }) {
  const { profile } = params;
  const data = (await getProfileData(profile)) || {};

  let card = data?.data?.card || {};
  let title = card?.first_name
    ? card?.first_name + " - " + card?.card_profession
    : "Popipro";
  let description = card?.card_description;
  description = description?.replace(/<(.|\n)*?>/g, "").substring(0, 159);

  return {
    title,
    description,
    //robots: 'noindex',
    openGraph: {
      title,
      description,
      type: "website",
      images:
        data?.data?.card?.base_url + data?.data?.card?.profile_picture?.path,
    },
  };
}

const ProfilePage = async ({ params }) => {
  
  const resp = await fetch('/api/dummy');
  console.log(resp);
  
  const { profile } = params;
  const data = (await getProfileData(profile)) || {};
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
        <Main profile={profile} data={data} id={data?.data?.card?.id} />
      </Suspense>
    </>
  );
};

export default ProfilePage;

const getProfileData = async (profile) => {
  const response = await fetch(
    `https://admin.popipro.com/api/get-card-data/?card_url=${profile}`,
    { cache: "no-store" },
    { next: { revalidate: 0 } }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
  }
};
