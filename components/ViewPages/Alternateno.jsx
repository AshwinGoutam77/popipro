"use client";
import { faChevronRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import localforage from "localforage";
import React from "react";

export default function Alternateno({ Titles, Data, PlanData, AlterNumber }) {
  const HitClick = async (type, social, id) => {
    let payload = {
      card: Data?.id,
      type: social ? social : "card",
      device_id: navigator.userAgent,
      object_base: id ? id : Data?.id,
      hit_type: type,
      fb_token: await localforage.getItem("fcm_token"),
    };
    const response = await Api(HitClickApi, payload);
    if (response.data.status) {
    }
  };


  return (
    Titles?.card_alternate_phone?.source !== 0 &&
    Data?.card_alternate_phone?.length !== 0 &&
    Titles?.card_alternate_phone?.is_active !== 0 &&
    Titles?.card_alternate_phone?.in_subscription && (
      <div className="box-content boxxx" id="about_us">
        <div className="flex-header">
          <h2 className="title title--h1 first-title title__separate">
            {Titles?.card_alternate_phone?.visible_name}
          </h2>
        </div>
        {Data?.card_alternate_phone?.map((item, index) => {
          return (
            <div className="alternate-number-div" key={index}>
              <a
                href={`tel: ${item.country_code
                  ? item.country_code + "-"
                  : item.country_code
                  } ${item?.number} ${item?.extension ? "- " + item?.extension : ""
                  }`}
                onClick={() => HitClick("direct", "alternate_phone", item.id)}
              >
                <div
                  className="d-flex align-items-center justify-content-between mt-1 mb-1"
                  key={index}
                >
                  <div className="d-flex align-items-center flex-wrap">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="pe-auto Iconcolor-black fs-15"
                    />
                    <p className="ml-2 font-weight-bold color-black">
                      {item.title} :
                    </p>
                    {item.country_code == null ? (
                      <p className="ml-1 color-black">
                        {item?.country_code}
                        {item?.country_code ? "-" : ""}
                        {item?.number}
                        {item?.extension ? "-" : ""}
                        {item?.extension}
                      </p>
                    ) : (
                      <p className="ml-1 color-black">
                        {item?.country_code}
                        {item?.country_code ? "-" : ""}
                        {item?.number}
                        {item?.extension ? "-" : ""}
                        {item?.extension}
                      </p>
                    )}
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="pe-auto mr-2 fs-15 VarColor"
                  />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    )
  );
}
