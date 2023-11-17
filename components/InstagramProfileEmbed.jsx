"use client";
// InstagramProfileEmbed.js
import React, { useEffect } from "react";

const InstagramProfileEmbed = ({ url }) => {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="13"
    >
      <a href={url}></a>
    </blockquote>
  );
};

export default InstagramProfileEmbed;
