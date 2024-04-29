"use client";
import { Swiper as SwiperComponent } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";

const Events = ({ Titles, card, subscription }) => {
  return (
    <>
      {Titles?.card_services.source !== 0 &&
      card?.card_services?.length !== 0 &&
      Titles?.card_services.is_active !== 0 &&
      subscription?.is_expired == false &&
      subscription?.subscription?.plan_id !== 1 &&
      subscription?.subscription !== null ? (
        <div className="box-content boxxx" id="card_services">
          {/* <!-- What --> */}
          {Titles &&
          Titles?.card_services.is_active &&
          card?.card_services?.length !== 0 ? (
            <div className="mt-0">
              <h2 className="title title--h1 first-title title__separate">
                Upcoming Events
              </h2>
              <div className="row events-section">
                {/* <!-- Case Item --> */}
                <SwiperComponent
                  breakpoints={{
                    1110: {
                      slidesPerView:
                        card?.card_services?.length == 1 ? "1" : "1",
                    },
                    768: {
                      slidesPerView: 1,
                    },
                  }}
                  spaceBetween={20}
                  className="mySwiper w-100 pb-4 cursor-pointer services-swiper-slider"
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination, Navigation]}
                >
                  <SwiperSlide>
                    {" "}
                    <div className="case-item p-0 border-0">
                      <div className="w-100">
                        <img
                          src="https://prafullgupta.com/connectwork/assets/chat/groups/2024-04/270424033410AIM-Vienna-Event-Banner-1024x576.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="">
                    {" "}
                    <div className="case-item p-0 border-0">
                      <div className="w-100">
                        <img
                          src="https://prafullgupta.com/connectwork/assets/chat/groups/2024-04/270424033844artificial-intelligence-and-metaverse-background-banner-showing-ai-technology-generative-ai-photo.jpg"
                          alt=""
                        />{" "}
                      </div>
                    </div>
                  </SwiperSlide>
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

export default Events;
