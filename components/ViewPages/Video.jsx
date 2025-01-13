"use client";
import SimpleBackdrop from "./SimpleBackDrop";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { HitClickApi } from "@services/Routes";
import Api from "@services/Api";
import LockedSection from "./LockedSection";

const Video = ({
  card,
  Card_photos,
  Titles,
  PlanData,
  PaginationData,
  card_url,
}) => {
  const [Page, setPage] = useState(2);
  const [Card_videos, setCard_videos] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isLocked, setIsLocked] = useState(Titles?.card_videos?.is_locked !== 0);

  useEffect(() => {
    setCard_videos(card?.card_videos);
  }, []);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MODE == "development"
        ? `https://dev.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_videos&current_page=${Page} `
        : `https://admin.popipro.com/api/get-more-items/?card_url=${card_url}&type=card_videos&current_page=${Page} `,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setCard_videos((prevData) => [
        ...prevData,
        ...data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const HitClick = async (id, type) => {
    let payload = {
      card: card?.id,
      type: "card",
      device_id: navigator.userAgent,
      object_base: card?.id,
      hit_type: type,
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  return (
    <>
      <SimpleBackdrop visible={false} />

      {Card_videos?.length !== 0 &&
        Titles?.card_videos?.source !== 0 &&
        Titles?.card_videos?.is_active !== 0 &&
        Titles?.card_videos?.in_subscription &&
        (isLocked ? (
          <LockedSection name="card_videos" Title={Titles.card_videos?.visible_name}
            profile={card_url} setIsLocked={setIsLocked} />)
          : Card_videos?.length !== 0 &&
          Titles?.card_videos?.source !== 0 &&
          Titles?.card_videos?.is_active !== 0 &&
          Titles?.card_videos?.in_subscription && (
            <div className="box-content boxxx">
              {Titles && Titles?.card_videos?.is_active ? (
                <>
                  <div>
                    <div className="">
                      <h3 className="title title--h1 first-title title__separate">
                        {Titles?.card_videos?.visible_name}
                      </h3>
                    </div>

                    {/* <!-- Videos-slider --> */}
                    {card.id === "S7ZG" ? (
                      <div className="swiper-slide review-items mt-3">
                        <div className="w-100">
                          <div className="w-100 vedio-flex gap-8">
                            <picture>
                              <source
                                type="image/png"
                                srcSet="https://toolapi.devwings.com/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM1.jpeg"
                              />
                              <img
                                src="https://toolapi.devwings.com/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM1.jpeg"
                                alt="photos"
                                className="video-width h-100 w-100 vedio-height br-10"
                              />
                            </picture>
                            <picture>
                              <source
                                type="image/png"
                                srcSet="https://toolapi.devwings.com/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM.jpeg"
                              />
                              <img
                                src="https://toolapi.devwings.com/assets/chat/groups/210823111005WhatsAppImage2023-08-19at4.38.05PM.jpeg"
                                alt="photos"
                                className="video-width h-100 w-100 vedio-height br-10"
                              />
                            </picture>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-edit-class" style={{ gap: "12px" }}>
                        {Card_videos &&
                          Card_videos.map((video, i) => {
                            function getId(url) {
                              const regExp =
                                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                              const match = String(url).match(regExp);

                              return match && match[2]?.length === 11
                                ? match[2]
                                : null;
                            }
                            const videoId = getId(video);
                            return (
                              <div
                                className="swiper-slide review-items col-sm-12 col-md-6 col-lg-6"
                                key={i}
                              >
                                <div className="w-100">
                                  <div className="w-100 vedio-height mb-2">
                                    <div
                                      className="video-player-container"
                                      onClick={() => HitClick("i", "video")}
                                    >
                                      <ReactPlayer
                                        url={video?.path ? card?.base_url + video?.path : video}
                                        controls
                                        width="560"
                                        height="315"
                                        onClick={() => HitClick("i", "video")}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                  {PaginationData.total_card_videos !== Card_videos?.length && (
                    card.id !== "S7ZG" && (
                      <div className="mx-auto text-center mt-3">
                        <a
                          className="text-center cursor-pointer mx-auto video-load-more fs-16"
                          onClick={LoadMoreFunction}
                        >
                          Load More
                        </a>
                      </div>
                    ))}
                </>
              ) : (
                ""
              )}
            </div>
          )
        )}
    </>
  );
};

export default Video;
