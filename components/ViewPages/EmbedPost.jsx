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

            {/* <iframe
              src="https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/popipro.global&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="100%"
              height="500"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameborder="0"
              allowTransparency="true"
              allow="encrypted-media"
            ></iframe> */}
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
