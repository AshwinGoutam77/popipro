'use client'
import React, { useState } from "react";
import LockedSection from "./LockedSection";

const Resume = ({ Titles, subscription, card_experience, profile, card }) => {
  const [isLocked, setIsLocked] = useState(Titles?.card_experience?.is_locked !== 0);
  return (
    <>
      {Titles?.card_experience.source !== 0 &&
        card?.card_experience?.length !== 0 &&
        Titles?.card_experience.is_active !== 0 &&
        (isLocked ?
          (<LockedSection name="card_experience" Title={Titles.card_experience?.visible_name}
            profile={profile} setIsLocked={setIsLocked} />)
          : Titles &&
          Titles?.card_experience?.is_active &&
          Titles?.card_experience?.in_subscription && (
            card_experience?.length !== 0 &&
            Titles?.card_experience?.is_active !== 0 && (
              <div>
                <div className="box-content boxxx" id="card_experience">
                  <div className="pb-2">
                    <h3 className="title title--h1 first-title title__separate">
                      {Titles && Titles.card_experience.visible_name}
                    </h3>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="timeline">
                        {card_experience && card_experience.map((item, index) => {
                          return (
                            <article key={index} className="timeline__item mb-2">
                              <h5 className="title title--h5 timeline__title">
                                {item.designation}
                              </h5>
                              <div
                                className="review-item__caption text-left mb-0"
                                dangerouslySetInnerHTML={{
                                  __html: item.description,
                                }}
                              ></div>
                              <span className="timeline__period">{item.years}</span>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
    </>
  );
};

export default Resume;
