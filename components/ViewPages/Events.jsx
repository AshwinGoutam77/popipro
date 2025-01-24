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
        Titles?.card_services.is_active !== 0 ? (
        <div className="box-content boxxx" id="card_events">
          <div className="mt-0">
            <h2 className="title title--h1 first-title title__separate">
              Upcoming Events
            </h2>
            <div className="row events-section">
              <div className="col-sm-6">
                <div className="events-tags-div">
                  <p>23 Jan <span className="d-block">2025</span></p>
                </div>
                <img src="../static/img/picture-1.jpg" alt="banner" />
                <div>
                  <h3 class="title title--h4 mt-2 m-0">UpComing Event in Jaipur</h3>
                  <span>1:00 pm | Albert Hall, Jaipur</span>
                </div>
                <div>
                  <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</p>
                  <button className="contact-btn w-auto">Visit Event</button>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="events-tags-div">
                  <p>23 Jan <span className="d-block">2025</span></p>
                </div>
                <img src="../static/img/picture-1.jpg" alt="banner" />
                <div>
                  <h3 class="title title--h4 mt-2 m-0">UpComing Event in Jaipur</h3>
                  <span>1:00 pm | Albert Hall, Jaipur</span>
                </div>
                <div>
                  <p>Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting industry.</p>
                  <button className="contact-btn w-auto">Visit Event</button>
                </div>
              </div>
              {/* <SwiperComponent
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
                        src="../static/img/picture-1.jpg"
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
                        src="../static/img/picture-1.jpg"
                        alt=""
                      />{" "}
                    </div>
                  </div>
                </SwiperSlide>
              </SwiperComponent> */}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Events;
