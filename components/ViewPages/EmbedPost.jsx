"use client";
import { useEffect, useState } from "react";
import InstagramProfileEmbed from "./InstagramProfileEmbed";

export default function EmbedPost({ card, Titles, PlanData, MainData }) {
  const [SocailLinks, setSocailLinks] = useState("");

  useEffect(() => {
    setSocailLinks(card?.card_social_links);
  }, []);
  const instagramProfileUrl = MainData?.company_setting?.insta_feed_url;
  return SocailLinks?.length !== 0 &&
    Titles?.card_social_links?.source !== 0 &&
    Titles?.card_social_links?.is_active !== 0 &&
    Titles?.card_social_links?.in_subscription && MainData?.company_setting?.insta_feed_url !== null ? (
    <>
      <div className="box-content boxxx">
        <div>
          <div className="">
            <h3 className="title title--h1 first-title title__separate">
              Instagram Feeds
            </h3>
          </div>

          <div className="flex-edit-class iframe-class" style={{ gap: "10px" }}>
            <InstagramProfileEmbed url={instagramProfileUrl} />
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
