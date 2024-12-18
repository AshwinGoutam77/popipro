"use client";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import LockedSection from "./LockedSection";

const Services = ({ Titles, card, subscription, profile }) => {
  return (
    <>
      {Titles?.card_services.source !== 0 &&
        card?.card_services?.length !== 0 &&
        Titles?.card_services.is_active !== 0 && Titles?.card_services?.is_locked !== 0 &&
        <LockedSection name="card_services" Title={Titles?.card_services.visible_name}
          profile={profile} />
      }
      {Titles?.card_services.source !== 0 &&
        card?.card_services?.length !== 0 &&
        Titles?.card_services.is_active !== 0 &&
        Titles?.card_services?.in_subscription && Titles?.card_services?.is_locked == 0 ? (
        <div className="box-content boxxx" id="card_services">
          {Titles &&
            Titles?.card_services.is_active &&
            card?.card_services?.length !== 0 ? (
            <div className="mt-0">
              <h2 className="title title--h1 first-title title__separate">
                {Titles &&
                  Titles?.card_services.visible_name === "card_services"
                  ? "Card Services"
                  : Titles?.card_services.visible_name}
              </h2>
              <div className="row">
                {/* <!-- Case Item --> */}
                <SwiperComponent
                  breakpoints={{
                    1110: {
                      slidesPerView:
                        card?.card_services?.length == 1 ? "1" : "2",
                    },
                    768: {
                      slidesPerView: 1,
                    },
                  }}
                  spaceBetween={20}
                  className="mySwiper w-100 pb-0 cursor-pointer services-swiper-slider"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {card?.card_services.map((item, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="case-item pt-3">
                          <div className="w-100">
                            {item?.image?.path ? (
                              <picture>
                                <source
                                  type="image/png"
                                  srcSet={
                                    process.env.NEXT_PUBLIC_MODE ==
                                      "development"
                                      ? "https://dev.popipro.com/" +
                                      item?.image?.path
                                      : "https://admin.popipro.com/" +
                                      item?.image?.path
                                  }
                                />
                                <img
                                  className="case-item__icon"
                                  src={
                                    process.env.NEXT_PUBLIC_MODE ==
                                      "development"
                                      ? "https://dev.popipro.com/" +
                                      item?.image?.path
                                      : "https://admin.popipro.com/" +
                                      item?.image?.path
                                  }
                                  alt="photos"
                                  width={0}
                                  height={0}
                                />
                              </picture>
                            ) : (
                              <picture>
                                <source
                                  type="image/png"
                                  srcSet="../static/img/picture-1.jpg"
                                />
                                <img
                                  className="case-item__icon"
                                  src="../static/img/picture-1.jpg"
                                  alt="photos"
                                />
                              </picture>
                            )}
                            <h3 className="title title--h4 mt-2 m-0">
                              {item.name}
                            </h3>
                            <div
                              id="p_wrap"
                              className="review-item__caption text-left mt-2"
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </SwiperComponent>
              </div>
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

export default Services;
