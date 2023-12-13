"use client";
import { useEffect, useState } from "react";
import InstagramProfileEmbed from "./InstagramProfileEmbed";

export default function EmbedPost({ card, Titles, PlanData, MainData }) {
  const [Card_videos, setCard_videos] = useState("");

  useEffect(() => {
    setCard_videos(card?.card_videos);
  }, []);
  const instagramProfileUrl = MainData?.company_setting?.insta_feed_url;
  return Card_videos?.length !== 0 &&
    Titles?.card_videos?.source !== 0 &&
    Titles?.card_videos?.is_active !== 0 &&
    PlanData?.is_expired == false ? (
    <>
      <div className="mt-3 box-content boxxx">
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
