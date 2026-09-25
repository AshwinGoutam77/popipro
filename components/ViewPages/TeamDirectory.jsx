"use client";

import React, { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faMessage,
    faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import "./TeamDirectory.css";

const DIRECTORS = [
    {
        id: "eric",
        name: "Eric Alexander",
        title: "Director of Sales",
        territory: "Midsouth US",
        markets: "Asia",
        locations: "Louisiana, Mississippi, Alabama, Asia",
        image: "/static/img/eric-alexander.png",
    },
    {
        id: "george",
        name: "George Ansardi",
        title: "Director of Government Sales",
        territory: "Government Sales",
        markets: "Government",
        locations: "Government, Federal, GSA",
        image: "/static/img/george-ansardi.png",
    },
    {
        id: "nathan",
        name: "Nathan Campbell",
        title: "Director of Sales",
        territory: "Midwest US",
        markets: "Canada · Australia · New Zealand",
        locations:
            "Illinois, IL, Minnesota, Wisconsin, Iowa, Canada, Australia, New Zealand",
        image: "/static/img/nathan-campbell.png",
    },
    {
        id: "marc",
        name: "Marc De Leener",
        title: "Director of Sales",
        territory: "Europe",
        markets: "Middle East · Africa",
        locations:
            "Europe, Belgium, France, Germany, United Kingdom, Middle East, Africa",
        image: "/static/img/marc-de-leener.png",
    },
    {
        id: "aaron",
        name: "Aaron",
        title: "Director of Sales",
        territory: "Mideast US",
        markets: "",
        locations: "West Virginia, Virginia, Ohio, Kentucky",
        image: "/static/img/aaron.png",
    },
    {
        id: "rene",
        name: "Rene Ramos",
        title: "Director of Sales",
        territory: "Southeast US",
        markets: "Latin America",
        locations: "Florida, Georgia, South Carolina, Latin America",
        image: "/static/img/rene-ramos.png",
    },
    {
        id: "carlos",
        name: "Carlos Ruiz",
        title: "Director of Sales",
        territory: "Western US",
        markets: "",
        locations: "California, Arizona, Nevada, Oregon, Washington",
        image: "/static/img/carlos-ruiz.png",
    },
    {
        id: "bill",
        name: "Bill Wheatley",
        title: "Director of Sales",
        territory: "Northeast US",
        markets: "",
        locations: "New York, New Jersey, Massachusetts, Pennsylvania",
        image: "/static/img/bill-wheatley.png",
    },
];

const FILTERS = [
    "All",
    "Midsouth US",
    "Government Sales",
    "Midwest US",
    "Europe",
    "Mideast US",
    "Southeast US",
    "Western US",
    "Northeast US",
];

const TeamDirectory = () => {
    const [query, setQuery] = useState("");
const [filter, setFilter] = useState("All");
const [enquireDirector, setEnquireDirector] = useState(null);

    const directors = useMemo(() => {
        const value = query.trim().toLowerCase();

        return DIRECTORS.filter((director) => {
            const matchesFilter =
                filter === "All" || director.territory === filter;

            const searchable = [
                director.name,
                director.title,
                director.territory,
                director.markets,
                director.locations,
            ]
                .join(" ")
                .toLowerCase();

            return matchesFilter && (!value || searchable.includes(value));
        });
    }, [query, filter]);

   const handleEnquire = (director) => {
  setEnquireDirector(director);
};

    const handleShare = async (director) => {
        const url = `${window.location.origin}/director/${director.id}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${director.name} — ASP Sales`,
                    text: `Connect with ${director.name}, ${director.title}.`,
                    url,
                });
            } catch {
                // User cancelled the native share sheet.
            }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(url);
        }
    };

    return (
        <section className="team-directory box-content boxxx" id="team-directory">
            <div className="team-directory__container">
                <div className="team-directory__box box-content">

                    <div className="team-directory__section-header">
                        <div>
                            <h2 className="title title--h1 first-title title__separate">
                                Another territory? Meet our team.
                            </h2>
                        </div>
                    </div>

                    <div className="team-directory__search-row">
                        <div className="team-directory__search">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />

                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Try Illinois, Europe or Nathan…"
                                aria-label="Search ASP directors"
                            />
                        </div>
                    </div>

                    <div
                        className="team-directory__filters"
                        aria-label="Territory filters"
                    >
                        {FILTERS.map((item) => (
                            <button
                                key={item}
                                type="button"
                                className={`team-directory__chip ${filter === item ? "is-active" : ""
                                    }`}
                                onClick={() => setFilter(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {directors.length > 0 ? (
                        <div className="team-directory__grid">

                            {directors.map((director) => (
                                <article
                                    className="team-directory__card"
                                    key={director.id}
                                >

                                    <div className="team-directory__card-top">
                                        <img
                                            src={director.image}
                                            alt={director.name}
                                            className="team-directory__avatar"
                                        />

                                        <span className="team-directory__tag">
                                            ASP SALES
                                        </span>
                                    </div>

                                    <h3>{director.name}</h3>

                                    <p className="team-directory__role">
                                        {director.title}
                                    </p>

                                    <div className="team-directory__territory">
                                        <strong>{director.territory}</strong>

                                        {director.markets && (
                                            <span>{director.markets}</span>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="team-directory__profile-link"
                                        onClick={() =>
                                            console.log("View profile:", director)
                                        }
                                    >
                                        View profile <span>→</span>
                                    </button>

                                    <div className="team-directory__actions">

                                        <button
                                            type="button"
                                            className="team-directory__button team-directory__button--primary"
                                            onClick={() => handleEnquire(director)}
                                        >
                                            <FontAwesomeIcon icon={faMessage} />
                                            Enquire
                                        </button>

                                        <button
                                            type="button"
                                            className="team-directory__button"
                                            onClick={() => handleShare(director)}
                                        >
                                            <FontAwesomeIcon icon={faShareNodes} />
                                            Share
                                        </button>

                                    </div>
                                </article>
                            ))}

                        </div>
                    ) : (
                        <div className="team-directory__empty">
                            <h3>No directors match that search</h3>

                            <p>
                                Try another state, region or name.
                            </p>

                            <button
                                type="button"
                                className="team-directory__clear"
                                onClick={() => {
                                    setQuery("");
                                    setFilter("All");
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    <p className="team-directory__note">
                        Director names and regional labels follow ASP’s public team page.
                        Individual state assignments are illustrative and editable.
                    </p>
                    {enquireDirector && (
  <div
    className="team-directory__modal-backdrop"
    onMouseDown={(event) => {
      if (event.target === event.currentTarget) {
        setEnquireDirector(null);
      }
    }}
  >
    <div
      className="team-directory__modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquire-modal-title"
    >
      {/* Header */}
      <div className="team-directory__modal-header">
        <h2 id="enquire-modal-title">
          Get {enquireDirector.name.split(" ")[0]}’s details
        </h2>

        <button
          type="button"
          className="team-directory__modal-close"
          onClick={() => setEnquireDirector(null)}
          aria-label="Close"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="team-directory__modal-body">

        {/* Left side */}
        <div className="team-directory__modal-left">

          <div className="team-directory__director-info">
            <img
              src={enquireDirector.image}
              alt={enquireDirector.name}
              className="team-directory__modal-avatar"
            />

            <div>
              <h3>{enquireDirector.name}</h3>

              <p>
                {enquireDirector.territory}
              </p>
            </div>
          </div>

          <p className="team-directory__modal-description">
            Enter your mobile number and choose how you would like to
            receive this director’s profile and contact information.
          </p>

          {/* Connection */}
          <div className="team-directory__connection">

            <div className="team-directory__connection-title">
              THIS CONNECTION
            </div>

            <div className="team-directory__connection-row">
              <span>Assigned to</span>
              <strong>{enquireDirector.name}</strong>
            </div>

            <div className="team-directory__connection-row">
              <span>Introduced through</span>
              <strong>Aaron</strong>
            </div>

            <div className="team-directory__connection-row">
              <span>Source</span>
              <strong>Profile team section</strong>
            </div>

          </div>


        </div>

        {/* Right side */}
        <div className="team-directory__modal-right">

          <form
            onSubmit={(event) => {
              event.preventDefault();

              console.log(
                "Inquiry submitted for:",
                enquireDirector.name
              );

              setEnquireDirector(null);
            }}
          >

            {/* Mobile */}
            <div className="team-directory__field team-directory__field--full">
              <label>
                Mobile number, including country code *
              </label>

              <input
                type="tel"
                placeholder="+1 202 555 0188"
                required
              />
            </div>

            {/* Name + channel */}
            <div className="team-directory__form-grid">

              <div className="team-directory__field">
                <label>Name (optional)</label>

                <input
                  type="text"
                  placeholder="Jordan Taylor"
                />
              </div>

              <div className="team-directory__field">
                <label>Send details by *</label>

                <select defaultValue="WhatsApp">
                  <option value="WhatsApp">
                    WhatsApp
                  </option>

                  <option value="SMS">
                    SMS
                  </option>

                  <option value="Email">
                    Email
                  </option>
                </select>
              </div>

            </div>

            {/* Company + location */}
            <div className="team-directory__form-grid">

              <div className="team-directory__field">
                <label>Company (optional)</label>

                <input
                  type="text"
                  placeholder="Company / agency"
                />
              </div>

              <div className="team-directory__field">
                <label>Location (optional)</label>

                <input
                  type="text"
                  placeholder="Illinois"
                />
              </div>

            </div>

            {/* Extra */}
            <button
              type="button"
              className="team-directory__additional"
            >
              <span>▸</span>
              Add email, interest or a message
            </button>

            {/* Consent */}
            <label className="team-directory__consent">

              <input
                type="checkbox"
                required
              />

              <span>
                I agree to receive the requested director information
                by my selected channel and to share this inquiry with
                ASP, including the introducing and receiving directors.
              </span>

            </label>

            <p className="team-directory__no-promo">
              This request does not subscribe you to promotional messages.
            </p>

            {/* Actions */}
            <div className="team-directory__modal-actions">

              <button
                type="submit"
                className="team-directory__submit-button"
              >
                <FontAwesomeIcon icon={faMessage} />

                Preview send & save inquiry
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  </div>
)}
                </div>
            </div>
        </section>
    );
};

export default TeamDirectory;