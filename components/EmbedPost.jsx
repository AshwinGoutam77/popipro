"use client";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import InstagramProfileEmbed from "./InstagramProfileEmbed";
import FacebookPage from "./LinkedinProfile";
import FacebookPageWidget from "./LinkedinProfile";

export default function EmbedPost({ card, Titles, PlanData }) {
  const [Card_videos, setCard_videos] = useState("");

  useEffect(() => {
    setCard_videos(card?.card_videos);
  }, []);
  const instagramProfileUrl = "https://www.instagram.com/prafullgupta87/";
  const username = "prafullgupta87";
  return Card_videos?.length !== 0 &&
    Titles?.card_videos?.source !== 0 &&
    Titles?.card_videos?.is_active !== 0 &&
    PlanData?.is_expired == false ? (
    <>
      <div className="mt-3 box-content boxxx">
        {Titles && Titles?.card_videos?.is_active ? (
          <>
            <div>
              <div className="">
                <h3 className="title title--h1 first-title title__separate">
                  Post from social media
                </h3>
              </div>

              <div className="flex-edit-class" style={{ gap: "10px" }}>
                <InstagramProfileEmbed url={instagramProfileUrl} />
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  ) : (
    ""
  );
}
