"use client";
import Link from "next/link";

const Events = ({ Titles, card }) => {
  return (
    <>
      {
        Titles?.card_events.source !== 0 &&
          card?.card_events?.length !== 0 &&
          Titles?.card_events.is_active !== 0 ? (
          <div className="box-content boxxx" id="card_events">
            <div className="mt-0">
              <h2 className="title title--h1 first-title title__separate">
                {Titles?.card_events?.visible_name}
              </h2>
              <div className="row events-section">
                {card && card?.card_events?.map((items, index) => {
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
