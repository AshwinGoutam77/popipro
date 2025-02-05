"use client";
import ShareContact from "@components/Modals/Share-contact";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import LockedSection from "./LockedSection";

const AboutMe = ({ card, Titles, profile }) => {
  const [isLocked, setIsLocked] = useState(Titles?.card_description?.is_locked !== 0);

  const [charLimit, setCharLimit] = useState(480);
  const [Readmore, setReadmore] = useState(false);

  useEffect(() => {
    const updateCharLimit = () => {
      setCharLimit(window.innerWidth <= 460 ? 180 : 370); 
    };

    updateCharLimit();
    window.addEventListener("resize", updateCharLimit); 

    return () => window.removeEventListener("resize", updateCharLimit); 
  }, []);

  const handleReadMore = () => {
    setReadmore((prev) => !prev);
  };

  return (
    <>
      {card?.card_description !== null &&
        Titles?.card_description?.is_active !== 0 &&
        (isLocked ? (
          <LockedSection name="card_description" Title={Titles.card_description?.visible_name} profile={profile} setIsLocked={setIsLocked} />) :
          Titles?.card_description?.source !== 0 &&
          card?.card_description !== null &&
          Titles?.card_description?.is_active !== 0 && (
            <div className="box-content boxxx" id="card_description">
              {/* <!-- About --> */}
              {Titles?.card_description?.is_active &&
                card?.card_description !== null ? (
                <div className="pb-0 pb-sm-2">
                  <div className="flex-header">
                    <h2 className="title title--h1 first-title title__separate">
                      {Titles.card_description?.visible_name
                        ? Titles.card_description?.visible_name
                        : "About Yourself"}
                    </h2>
                  </div>
                  <div
                    id="p_wrap mb-0"
                    className={Readmore ? "card-p" : "card-description"}
                    dangerouslySetInnerHTML={{
                      __html: card?.card_description,
                    }}
                  ></div>
                  {card?.card_description?.length > charLimit || card?.card_description == null ? (
                    <p className="read-more text-align-end" onClick={handleReadMore}>
                      {Readmore ? (
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 mt-2" />
                      ) : (
                        <FontAwesomeIcon icon={faArrowRight} className="mr-2 mt-2" />
                      )}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              {/* <ShareContact/> */}
            </div>
          ))}
    </>
  );
};

export default AboutMe;
