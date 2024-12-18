"use client";
import Api from "@services/Api";
import { HitClickApi } from "@services/Routes";
import Link from "next/link";
import React from "react";
import LockedSection from "./LockedSection";

const SocialMedia = ({ card, Titles, CardLinks, profile }) => {
  let links = [];
  const HitClick = async (type, social, id) => {
    try {
      let payload = {
        card: card?.id,
        type: social ? social : "card",
        device_id: navigator.userAgent,
        object_base: id ? id : card?.id,
        hit_type: type,
      };
      const response = await Api(HitClickApi, payload);
      if (response.data.status) {
      }
    } catch (error) {
      error;
    }
  };
  return (
    <>
      {Titles?.card_social_links?.source !== 0 &&
        card.card_social_links?.length !== 0 && Titles?.card_social_links?.is_locked !== 0 &&
        <LockedSection name="card_social_links" Title={Titles?.card_social_links.visible_name}
          profile={profile} />
      }
      {Titles?.card_social_links?.source !== 0 &&
        card.card_social_links?.length !== 0 && Titles?.card_social_links?.is_locked == 0 ? (
        <div className="box-content boxxx">
          <h2 className="title title--h1 first-title title__separate">
            {Titles?.card_social_links?.visible_name}
          </h2>
          <div className="d-flex flex-wrap align-items-center gap-15">
            <div className="d-flex flex-wrap align-items-center gap-15">
              {CardLinks &&
                CardLinks.map((item, i) => {
                  links[item?.parent?.platform_name] = item.link;
                  return item?.link !== null ? (
                    <div key={i}>
                      {!item.link?.includes("https://") ? (
                        <Link
                          href={item.parent.target_url + item.link}
                          target="_blank"
                          key={i}
                          onClick={() => HitClick("direct", "social", item.id)}
                        >
                          <div className="media-icon-div">
                            <span className="social-media-icons">
                              <picture>
                                <source
                                  type="image/png"
                                  srcSet={
                                    "./static/img/" +
                                    item.parent.platform_name.toLowerCase() +
                                    ".png"
                                  }
                                />
                                <img
                                  src={
                                    "./static/img/" +
                                    item.parent.platform_name.toLowerCase() +
                                    ".png"
                                  }
                                  alt={item.parent.platform_name}
                                  className="w-50px br-100"
                                />
                              </picture>
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <Link
                          href={item.link}
                          target="_blank"
                          key={i}
                          onClick={() => HitClick("direct", "social", item.id)}
                        >
                          <div className="media-icon-div">
                            <span className="social-media-icons">
                              <picture>
                                <source
                                  type="image/png"
                                  srcSet={
                                    "./static/img/" +
                                    item.parent.platform_name.toLowerCase() +
                                    ".png"
                                  }
                                />
                                <img
                                  src={
                                    "./static/img/" +
                                    item.parent.platform_name.toLowerCase() +
                                    ".png"
                                  }
                                  alt={item.parent.platform_name}
                                  className="w-50px br-100"
                                />
                              </picture>
                            </span>
                          </div>
                        </Link>
                      )}
                    </div>
                  ) : (
                    ""
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SocialMedia;
