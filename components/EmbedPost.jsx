"use client";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function EmbedPost({
  card,
  Card_photos,
  Titles,
  PlanData,
  PaginationData,
  card_url,
}) {
  const [Page, setPage] = useState(2);
  const [Card_videos, setCard_videos] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setCard_videos(card?.card_videos);
  }, []);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_videos&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setCard_videos((prevData) => [
        ...prevData,
        ...data?.data?.next_page_data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  return Card_videos?.length !== 0 &&
    Titles?.card_videos?.source !== 0 &&
    Titles?.card_videos?.is_active !== 0 &&
    PlanData?.is_expired == false ? (
    <div className="mt-3 box-content boxxx">
      {Titles && Titles?.card_videos?.is_active ? (
        <>
          <div>
            <div className="">
              <h3 className="title title--h1 first-title title__separate">
                Post from social media
              </h3>
            </div>

            {/* <!-- Videos-slider --> */}
            <div className="flex-edit-class" style={{ gap: "10px" }}>
              <div className="swiper-slide review-items mt-3 col-sm-12 col-md-6 col-lg-6">
                <div className="w-100">
                  <iframe
                    width="320"
                    height="460"
                    src="https://www.instagram.com/reel/CyZ3hLxBC6A/embed"
                    frameborder="0"
                    style={{
                      height: "610px",
                      border: "1px solid var(--color)",
                    }}
                  ></iframe>
                </div>
              </div>
              <div className="swiper-slide review-items mt-3 col-sm-12 col-md-6 col-lg-6">
                <div className="w-100">
                  <iframe
                    width="320"
                    height="630"
                    src="https://www.instagram.com/p/B2q3jYKAymx/embed"
                    frameborder="0"
                    style={{
                      height: "610px",
                      border: "1px solid var(--color)",
                    }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}
