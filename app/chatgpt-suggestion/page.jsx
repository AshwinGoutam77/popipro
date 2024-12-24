'use client';
import React, { useState } from 'react';
import './page.css';
import {
    faAngleLeft,
    faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function ChatGptSuggestion() {
    const [content, setContent] = useState("");
    const [subContent, setSubContent] = useState("");
    const [result, setResult] = useState("");

    const handleBadgeClick = (mainContent, subContentValue = "") => {
        setContent(mainContent);
        setSubContent(subContentValue);
        setResult(`${mainContent} ${subContentValue}`);
    };

    return (
        <>
            <div
                className="login-header p-3 text-center d-flex align-items-center justify-content-between"
                style={{ background: "black" }}
            >
                <h5 className="text-white m-0">
                    <FontAwesomeIcon
                        icon={faMessage}
                        className="text-white mr-2"
                        width="20"
                    />{" "}
                    Chat
                </h5>
                <Link href="/">
                    <h6 className="text-white m-0">
                        {" "}
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className="text-white mr-2"
                            width="10"
                        />
                        Back
                    </h6>
                </Link>
            </div>

            <section className="chat-section">
                <div className="container">
                    <div className="row row-gap-4">
                        <div className="col-12">
                            <h5>What type of content do you need?</h5>
                            <div className="badge-box">
                                <span
                                    className={`badge ${content === "services" && "active"}`}
                                    onClick={() => handleBadgeClick("services")}
                                >
                                    Services
                                </span>
                                <span
                                    className={`badge ${content === "blogs" && "active"}`}
                                    onClick={() => handleBadgeClick("blogs")}
                                >
                                    Blogs
                                </span>
                            </div>
                        </div>
                        <div className="col-12">
                            {content === "services" && (
                                <>
                                    <h5>What kind of services do you want?</h5>
                                    <div className="badge-box">
                                        <span
                                            className={`badge ${subContent === "it-services" && "active"}`}
                                            onClick={() => handleBadgeClick("services", "it-services")}
                                        >
                                            IT Services
                                        </span>
                                        <span
                                            className={`badge ${subContent === "social-media" && "active"}`}
                                            onClick={() => handleBadgeClick("services", "social-media")}
                                        >
                                            Social Media Services
                                        </span>
                                        <span
                                            className={`badge ${subContent === "other" && "active"}`}
                                            onClick={() => handleBadgeClick("services", "other")}
                                        >
                                            Other
                                        </span>
                                    </div>
                                </>
                            )}
                            {content === "blogs" && (
                                <>
                                    <h5>What kind of blogs do you want?</h5>
                                    <div className="badge-box">
                                        <span
                                            className={`badge ${subContent === "it-blogs" && "active"}`}
                                            onClick={() => handleBadgeClick("blogs", "it-blogs")}
                                        >
                                            IT Services
                                        </span>
                                        <span
                                            className={`badge ${subContent === "social-media-blogs" && "active"}`}
                                            onClick={() => handleBadgeClick("blogs", "social-media-blogs")}
                                        >
                                            Social Media Services
                                        </span>
                                        <span
                                            className={`badge ${subContent === "other-blogs" && "active"}`}
                                            onClick={() => handleBadgeClick("blogs", "other-blogs")}
                                        >
                                            Other
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="col-12 question">
                            {result && subContent === "it-services" && "active" && (
                                <div className="result-box">
                                    <div className='case-item'>
                                        <h3 className="title title--h4 mt-2 m-0">
                                            AI-Powered Customer Support Automation
                                        </h3>
                                        <div
                                            id="p_wrap"
                                            className="review-item__caption text-left mt-2"
                                        // dangerouslySetInnerHTML={{
                                        //     __html: item.description,
                                        // }}
                                        >
                                            <p>Develop and offer a customizable AI-driven chatbot and ticketing system for businesses.
                                                This service will help companies enhance customer support, reduce response times, and automate routine queries.</p>

                                            <b>Key Features:</b>

                                            <b>24/7 AI Chatbot Support:</b>

                                            <p> Pre-trained on industry-specific datasets to provide accurate answers.
                                                Capable of learning from customer interactions to improve over time.
                                            </p>

                                            <b>Seamless Integration:</b>

                                            <p>Compatible with popular CRMs like Salesforce, HubSpot, and Zendesk.
                                                Easy integration into websites, apps, and social media platforms.
                                                Multi-Language</p>

                                            <b> Support:</b>

                                            <p> AI models trained to handle multiple languages, ensuring global usability.
                                                Advanced Analytics </p>

                                            <b>Dashboard:</b>

                                            <p>Real-time metrics for customer satisfaction, response rates, and trending issues.
                                                Insights to help businesses optimize their support strategies.
                                                Human </p>

                                            <b>Escalation:</b>

                                            <p>Smooth transition from chatbot to human agents when required.
                                                Omni-Channel</p>
                                            <button className="contact-btn w-auto">Publish</button>
                                        </div>
                                    </div>
                                    <div className='case-item'>
                                        <h3 className="title title--h4 mt-2 m-0">
                                            AI-Powered Customer Support Automation
                                        </h3>
                                        <div
                                            id="p_wrap"
                                            className="review-item__caption text-left mt-2"
                                        // dangerouslySetInnerHTML={{
                                        //     __html: item.description,
                                        // }}
                                        >
                                            <p>Develop and offer a customizable AI-driven chatbot and ticketing system for businesses.
                                                This service will help companies enhance customer support, reduce response times, and automate routine queries.</p>

                                            <b>Key Features:</b>

                                            <b>24/7 AI Chatbot Support:</b>

                                            <p> Pre-trained on industry-specific datasets to provide accurate answers.
                                                Capable of learning from customer interactions to improve over time.
                                            </p>

                                            <b>Seamless Integration:</b>

                                            <p>Compatible with popular CRMs like Salesforce, HubSpot, and Zendesk.
                                                Easy integration into websites, apps, and social media platforms.
                                                Multi-Language</p>

                                            <b> Support:</b>

                                            <p> AI models trained to handle multiple languages, ensuring global usability.
                                                Advanced Analytics </p>

                                            <b>Dashboard:</b>

                                            <p>Real-time metrics for customer satisfaction, response rates, and trending issues.
                                                Insights to help businesses optimize their support strategies.
                                                Human </p>

                                            <b>Escalation:</b>

                                            <p>Smooth transition from chatbot to human agents when required.
                                                Omni-Channel</p></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
