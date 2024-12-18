"use client";
import { faArrowRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import React from "react";

const QuickLinks = ({ card, subscription, Titles, profile }) => {
  const HitClick = async (id) => {
    let payload = {
      card: card?.id,
      type: "custom_url",
      device_id: navigator.userAgent,
      object_base: id,
      hit_type: "direct",
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };
  return (
    <>
      {Titles?.card_custom_url?.source !== 0 &&
      card?.card_custom_url?.length !== 0 &&
      Titles?.card_custom_url?.is_active !== 0 &&
      Titles?.card_custom_url?.in_subscription ? (
        <div className="box-content boxxx" id="about_us">
          <div className="flex-header">
            <h2 className="title title--h1 first-title title__separate">
              {Titles?.card_custom_url?.visible_name}
            </h2>
          </div>
          <div>
            {card?.card_custom_url?.map((item, index) => {
              return (
                <div className="alternate-number-div" key={index}>
                  <a
                    href={
                      item &&
                      item.link &&
                      (item.link?.includes("http://") ||
                        item.link?.includes("https://"))
                        ? item.link
                        : "https://" + item.link
                    }
                    target="_blank"
                    onClick={() => HitClick(item.id)}
                  >
                    <div
                      className="d-flex align-items-center justify-content-between mt-1 mb-1"
                      key={index}
                    >
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon
                            icon={faLink}
                            className="pe-auto Iconcolor-black fs-15 margin-r-10"
                          />
                          <p className="color-black">
                            {item.title}{" "}
                            <span className="badge badge-pill badge-warning ml-2">
                              {item.tag}
                            </span>
                          </p>
                        </div>
                      </div>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="pe-auto mr-2 fs-15 VarColor"
                      />
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default QuickLinks;
