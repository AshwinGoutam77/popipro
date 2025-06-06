import React from "react";
import Head from "next/head";

const ProfileSEO = ({ card }) => {
    console.log(card,'00000');
    
    const stripHTML = (html) =>
        html?.replace(/&nbsp;/g, " ").replace(/(<([^>]+)>)/gi, "").trim();

    const title = card?.meta_title
        ? stripHTML(card.meta_title)
        : card?.first_name
            ? `${card.first_name} - ${card.card_profession}`
            : "Popipro";

    const description = card?.meta_description
        ? stripHTML(card.meta_description)
        : stripHTML(card?.card_description || "");

    const imageUrl =
        card?.base_url && card?.profile_picture?.path
            ? card.base_url + card.profile_picture.path
            : "";

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description?.substring(0, 159)} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />
            <meta property="og:type" content="website" />
            <meta name="robots" content="noindex" />
        </Head>
    );
};

export default ProfileSEO;
