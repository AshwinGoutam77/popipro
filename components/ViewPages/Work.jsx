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

const Work = ({
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
        ...data?.data?.next_page_data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openImagePopup = (index) => {
    setSelectedImageIndex(index);
    // (Card_photos[selectedImageIndex]);
  };

  const closeImagePopup = () => {
    setSelectedImageIndex(null);
  };

  const goToPreviousImage = (i) => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
    HitClick(i, "photo");
  };

  const goToNextImage = (i) => {
    if (selectedImageIndex < Card_photos.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
    HitClick(i, "photo");
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
      {Card_photos?.length !== 0 &&
      Titles?.card_photos?.is_active !== 0 &&
      Titles?.card_photos?.in_subscription ? (
        <div className="box-content boxxx" id="card_photos">
          {Titles && Titles?.card_photos?.is_active ? (
            <div>
              <div className="pb-2">
                <h3 className="title title--h1 first-title title__separate">
                  {Titles?.card_photos?.visible_name}
                </h3>
              </div>

              {/* <!-- Images-slider --> */}
              <SwiperComponent
                slidesPerView={2}
                spaceBetween={10}
                className="mySwiper cursor-pointer"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                modules={[Autoplay, Pagination, Navigation]}
              >
                {Card_photos &&
                  Card_photos.map((photo, i) => {
                    return (
                      <SwiperSlide key={i} onClick={() => HitClick(i, "photo")}>
                        <div className="swiper-slide review-items position-relative">
                          <div
                            className="position-absolute top-0 zoom-icon-images"
                            onClick={() => openImagePopup(i)}
                          >
                            <FontAwesomeIcon
                              icon={faMagnifyingGlass}
                              className="zIndex-1"
                            />
                          </div>
                          <picture>
                            <source
                              type="image/png"
                              srcSet={
                                process.env.NEXT_PUBLIC_MODE == "development"
                                  ? "https://dev.popipro.com/" + photo.path
                                  : "https://admin.popipro.com/" + photo.path
                              }
                            />
                            <img
                              className="gallery-grid__image cover lazyload"
                              src={
                                process.env.NEXT_PUBLIC_MODE == "development"
                                  ? "https://dev.popipro.com/" + photo.path
                                  : "https://admin.popipro.com/" + photo.path
                              }
                              data-zoom
                              alt="photos"
                              onClick={() => openImagePopup(i)}
                              width={0}
                              height={0}
                            />
                          </picture>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </SwiperComponent>
              {selectedImageIndex !== null && (
                <div className="image-popup">
                  <span className="close-button" onClick={closeImagePopup}>
                    &times;
                  </span>

                  <img
                    src={card?.base_url + Card_photos[selectedImageIndex].path}
                    alt="images"
                  />
                  {selectedImageIndex > 0 && (
                    <button
                      className="prev-button"
                      onClick={() => goToPreviousImage(i)}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} /> Previous
                    </button>
                  )}

                  {/* Right (Next) button */}
                  {selectedImageIndex < Card_photos.length - 1 && (
                    <button
                      className="next-button"
                      onClick={() => goToNextImage(i)}
                    >
                      Next <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Work;
