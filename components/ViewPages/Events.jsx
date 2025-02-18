"use client";
import Api from "@services/Api";
import { LoadMoreApi } from "@services/Routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import LockedSection from "./LockedSection";

const Events = ({ Titles, card, PaginationData, card_url }) => {
  const [EventsData, setEventsData] = useState();
  const [LoadMoreData, setLoadMoreData] = useState("");
  const [isLocked, setIsLocked] = useState(Titles?.card_events?.is_locked !== 0);

  useEffect(() => {
    setEventsData(card?.card_events);
  }, []);

  const [Page, setPage] = useState(2);

  const LoadMoreFunction = async () => {
    const response = await Api(
      LoadMoreApi,
      {},
      "?card_url=" + card_url + "&type=card_events" + "&current_page=" + Page
    );
    if (response.data.status) {
      setLoadMoreData(response?.data?.data?.next_page_data?.next_page_url);
      setEventsData((prevData) => [
        ...prevData,
        ...response?.data?.data?.next_page_data?.data,
      ]);
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
      {
        Titles?.card_events?.is_active &&
          Titles?.card_events?.in_subscription ?
          (isLocked ? (
            <LockedSection name="card_events" Title={Titles.card_events?.visible_name}
              profile={card_url} setIsLocked={setIsLocked} />) :
            Titles?.card_events.source !== 0 &&
              card?.card_events?.length !== 0 &&
              Titles?.card_events.is_active !== 0 ? (
              <div className="box-content boxxx" id="card_events">
                <div className="mt-0">
                  <h2 className="title title--h1 first-title title__separate">
                    {Titles?.card_events?.visible_name}
                  </h2>
                  <div className="row events-section">
                    {EventsData && EventsData?.map((items, index) => {
                      return (
                        <div className="col-sm-6" key={index}>
                          <div className="events-tags-div">
                            <p>{items?.date}</p>
                          </div>
                          <img src={items?.banner?.path ? card?.base_url + items?.banner?.path : "../static/img/picture-1.jpg"} alt="banner" />
                          <div>
                            <h3 class="title title--h4 mt-2 m-0">{items?.name}</h3>
                            <span> {items?.event_time && items?.event_time + " |"} {items?.venue}</span>
                          </div>
                          <div>
                            <p>{items?.description}</p>
                            {items?.location && <Link href={items?.location} target="_blank">
                              <button className="contact-btn w-auto">Visit Event</button>
                            </Link>}
                          </div>
                        </div>
                      )
                    })}

                    {PaginationData?.total_card_events !== EventsData?.length ? (
                      <div className="mx-auto text-center mt-4">
                        <a
                          className="text-center cursor-pointer mx-auto"
                          style={{
                            textDecoration: "underline",
                            fontSize: "16px",
                            color: "var(--color)",
                          }}
                          onClick={LoadMoreFunction}
                        >
                          Load More
                        </a>
                      </div>
                    ) : (
                      ""
                    )}

                  </div>
                </div>
              </div>
            ) : (
              ""
            )) : ""}
    </>
  );
};

export default Events;
