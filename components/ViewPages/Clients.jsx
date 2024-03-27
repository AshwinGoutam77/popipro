"use client";
import React from "react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Clients = ({ card, Titles, PlanData, ClientPhotos }) => {
  return (
    <>
      {Titles?.card_clients.source !== 0 &&
      card?.card_clients?.length !== 0 &&
      Titles?.card_clients.is_active !== 0 &&
      PlanData?.is_expired == false &&
      PlanData?.subscription?.plan_id !== 1 &&
      PlanData?.subscription !== null ? (
        <section className="box-content boxxx">
          {/* <!-- Clients --> */}
          {Titles &&
          Titles?.card_clients.is_active &&
          ClientPhotos?.length !== 0 ? (
            <div className="mt-0">
              <h2 className="title title--h1 title title--h1 first-title title__separate">
                {Titles && Titles?.card_clients.visible_name === "card_clients"
                  ? "Card Clients"
                  : Titles?.card_clients?.visible_name}
              </h2>

              <SwiperComponent
                slidesPerView={2}
                breakpoints={{
                  1110: {
                    slidesPerView: 3,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
                spaceBetween={20}
                className="mySwiper cursor-pointer"
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Navigation]}
              >
                {ClientPhotos.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="w-100" key={index}>
                        <picture>
                          <source
                            type="image/png"
                            srcSet={
                              process.env.NEXT_PUBLIC_MODE == "development"
                                ? "https://dev.popipro.com/" + item.path
                                : "https://admin.popipro.com/" + item.path
                            }
                          />
                          <img
                            className="slider-images w-100"
                            src={
                              process.env.NEXT_PUBLIC_MODE == "development"
                                ? "https://dev.popipro.com/" + item.path
                                : "https://admin.popipro.com/" + item.path
                            }
                            alt="Logo"
                            width={0}
                            height={0}
                          />
                        </picture>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
            </div>
          ) : (
            ""
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default Clients;
