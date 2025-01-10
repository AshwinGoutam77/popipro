'use client'
import React, { useState } from 'react'
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

export default function DetailModal({ show, setshow, Data, MainData, ContentId }) {
    return (
        <Modal
            show={show}
            onHide={() => setshow(false)}
            centered
            className="pl-0"
        >
            <Modal.Header>
                <Modal.Title>
                    <h5 className="title title--h1 first-title title__separate mb-1">
                        Real Estate
                    </h5>
                </Modal.Title>
                <button
                    type="button"
                    className="close"
                    onClick={() => setshow(false)}
                >
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close alert</span>
                </button>
            </Modal.Header>
            <Modal.Body style={{ padding: "20px" }}>
                {Data?.card_realestates &&
                    Data?.card_realestates?.map((items, index) => {
                        return items?.id === ContentId ? (
                            <div key={index}>
                                <SwiperComponent
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    style={{ cursor: "pointer" }}
                                    className="mySwiper"
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Autoplay, Pagination, Navigation]}
                                >
                                    {items?.youtube_link !== null ? (
                                        <SwiperSlide>
                                            <div className="swiper-slide review-items position-relative mb-2">
                                                <div className="vedio-height">
                                                    <div className="product-video-player-container">
                                                        <ReactPlayer
                                                            url={items?.youtube_link}
                                                            controls
                                                            width="560"
                                                            height="315"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ) : (
                                        ""
                                    )}
                                    <SwiperSlide>
                                        <div className="swiper-slide review-items position-relative">
                                            <img
                                                src={
                                                    items?.image?.path
                                                        ? Data?.base_url + items?.image?.path
                                                        : "../static/img/picture-1.jpg"
                                                }
                                                alt="realestate_image"
                                                className="realEstateImage w-100 object-fit-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                    {items?.gallery &&
                                        items?.gallery?.map((i, o) => {
                                            return (
                                                <SwiperSlide key={o}>
                                                    <div className="swiper-slide review-items position-relative">
                                                        <img
                                                            src={Data?.base_url + i?.path}
                                                            alt="realestate_image"
                                                            className="realEstateImage w-100 object-fit-cover"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })}
                                </SwiperComponent>

                                <div className="mt-2 color-black mb-3">
                                    <h5 className="mb-0 color-black cursor-pointer d-flex align-items-center justify-content-between">
                                        {items?.heading}
                                        <span className="real-estate-badge">
                                            {items?.property_type?.name}
                                        </span>
                                    </h5>

                                    <div
                                        className="d-flex flex-wrap mt-3 amenities-main-section w-100"
                                        style={{ gap: "10px", lineHeight: "0" }}
                                    >
                                        {items?.amenities &&
                                            items?.amenities?.map((amenities, key) => {
                                                return key < 4 ? (
                                                    <div
                                                        className="d-flex align-items-baseline amenities-div"
                                                        key={key}
                                                    >
                                                        <span
                                                            style={{ fontSize: "16px" }}
                                                            dangerouslySetInnerHTML={{
                                                                __html: amenities.icon,
                                                            }}
                                                        ></span>
                                                        <p className="pl-2 color-black">
                                                            {amenities?.pivot?.description}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    ""
                                                );
                                            })}
                                    </div>

                                    <div
                                        className="mt-3 mb-2 d-flex flex-wrap align-items-center justify-content-between"
                                        style={{ gap: "10px" }}
                                    >
                                        {items.is_label !== 0 ? (
                                            <span className="font-weight-bold VarColor real-estate-price">
                                                {items?.label}
                                            </span>
                                        ) : (
                                            <p className="font-weight-bold VarColor real-estate-price">
                                                {MainData?.company_setting?.currency?.currency}{" "}
                                                {items?.price}
                                            </p>
                                        )}
                                    </div>

                                    <a
                                        href={items?.google_address_link}
                                        target="_blank"
                                        className="color-black cursor-pointer mt-2 font-weight-bold"
                                    >
                                        {items?.street_address}, {items?.city}, {items?.state},{" "}
                                        {items?.country}, ({items?.zipcode})
                                    </a>

                                    <p className="mt-3 font-weight-bold">
                                        Total Build Up Area: {items?.area}
                                        {items?.internal_area &&
                                            ", Land Size: " + items?.internal_area}{" "}
                                        {items?.external_area &&
                                            ", Property Size: " + items?.external_area}
                                    </p>

                                    <p
                                        className="mt-3 content_description"
                                        dangerouslySetInnerHTML={{
                                            __html: items.description,
                                        }}
                                    ></p>

                                    {items?.amenities?.length > 3 && (
                                        <h6 className="color-black mt-3">Other Amenities:</h6>
                                    )}

                                    {items?.amenities?.length > 3 ? (
                                        <div
                                            className="d-flex flex-column amenities-main-section w-100"
                                            style={{ gap: "10px", lineHeight: "0" }}
                                        >
                                            {items?.amenities &&
                                                items?.amenities?.map((amenities, key) => {
                                                    return key > 3 ? (
                                                        <div
                                                            className="d-flex align-items-baseline amenities-div"
                                                            key={key}
                                                        >
                                                            <span
                                                                style={{ fontSize: "16px" }}
                                                                dangerouslySetInnerHTML={{
                                                                    __html: amenities.icon,
                                                                }}
                                                            ></span>
                                                            <p className="pl-2 color-black">
                                                                {amenities?.pivot?.description}
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    );
                                                })}
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    <div
                                        className="mt-4 w-100 real-estate-modal-buttons"
                                        style={{ gap: "5px" }}
                                    >
                                        <div
                                            className="d-flex flex-wrap align-items-center justify-content-center"
                                            style={{ gap: "10px" }}
                                        >
                                            {items?.google_address_link && (
                                                <a
                                                    href={
                                                        items?.google_address_link?.includes(
                                                            "https://"
                                                        ) ||
                                                            items?.google_address_link?.includes("http://")
                                                            ? "https://" + items?.google_address_link
                                                            : items?.google_address_link
                                                    }
                                                    target="_blank"
                                                    className="w-30px"
                                                >
                                                    <button className="contact-btn w-100 m-0">
                                                        <img
                                                            src="../static/img/location.svg"
                                                            alt="image"
                                                            width={14}
                                                            className="mr-1"
                                                        />
                                                        View Location
                                                    </button>
                                                </a>
                                            )}

                                            {Data?.whatsapp_number &&
                                                MainData?.company_setting
                                                    ?.show_realestate_wp_button !== 0 && (
                                                    <a
                                                        href={
                                                            "https://api.whatsapp.com/send?phone=" +
                                                            Data?.whatsapp_number +
                                                            "&" +
                                                            `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items?.name}?`
                                                        }
                                                        target="_blank"
                                                        className="w-30px"
                                                    >
                                                        <button className="contact-btn w-100 m-0">
                                                            <img
                                                                src="../static/img/whatsapp.svg"
                                                                alt="image"
                                                                width={14}
                                                                className="mr-1"
                                                            />
                                                            WhatsApp
                                                        </button>
                                                    </a>
                                                )}

                                            <button className="contact-btn w-30px m-0">
                                                <img
                                                    src="../static/img/phone.svg"
                                                    alt="image"
                                                    width={14}
                                                    className="mr-1"
                                                />
                                                Contact Agent
                                            </button>

                                            {MainData?.company_setting
                                                ?.show_realestate_enquiry_button !== 0 ? (
                                                <button className="contact-btn w-30px m-0">
                                                    <img
                                                        src="../static/img/mail.svg"
                                                        alt="image"
                                                        width={14}
                                                        className="mr-1"
                                                    />
                                                    Email
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            ""
                        );
                    })}
            </Modal.Body>
        </Modal>
    )
}