"use client";
import React, { Suspense, useEffect, useState } from "react";
import "../../styles/about.css";
import "../../styles/edit.css";
import Main from "./Main";
import { useAuthContext } from "@context/AuthContext";

const ProfilePage = ({ params }) => {
  const { fetchData, data, ErrorData } = useAuthContext();
  const referer = null;
  const { profile } = params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchData(profile);
      setLoading(false);
    };
    load();
  }, [profile]);

  // Build JSON-LD only when data is loaded
  const jsonLd =
    data?.data?.card &&
    `{
      "@context": "https://schema.org",
      "@type": "${data?.data?.card?.card_name === "Popipro" ? "Person" : "Organization"}",
      "name": "${data?.data?.card?.first_name}",
      "image": ["https://admin.popipro.com/${data?.data?.card?.profile_picture?.path}"],
      "description": "${(data?.data?.card?.card_description || "").replace(/(<([^>]+)>)/gi, "")}"
    }`;

  // Show full-screen loader only once, before anything renders
  if (loading) {
    return (
      <div
        className="d-flex align-items-center justify-content-center text-center"
        style={{ height: "100vh" }}
      >
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <script async src="//www.instagram.com/embed.js" strategy="worker" />
      <script
        type="text/javascript"
        src="https://platform.linkedin.com/badges/js/profile.js"
        async
        defer
        strategy="worker"
      />

      {ErrorData?.status === false ? (
        <div
          className="d-flex align-items-center justify-content-center text-center flex-column"
          style={{ height: "100vh", padding: "0px 60px", fontSize: "18px" }}
        >
          <img
            src="../../static/img/nodata-img.svg"
            alt="error"
            width={300}
          />
          <h6 className="mt-4 color-black">{ErrorData?.message}</h6>
        </div>
      ) : (
        <Suspense fallback={<div />}>
          <Main
            profile={profile}
            data={data}
            id={data?.data?.card?.id}
            referer={referer}
            fetchData={fetchData}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProfilePage;
