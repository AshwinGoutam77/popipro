import React, { useEffect } from 'react';

const FacebookPageWidget = ({ username }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml: true,
          version: 'v13.0',
        });
      };
    }
  }, []);

  return (
    <div>
      <blockquote
        className="fb-xfbml-parse-ignore"
        cite={`https://www.facebook.com/${username}`}
      >
        <a href={`https://www.facebook.com/${username}`}>{username}</a>
      </blockquote>
    </div>
  );
};

export default FacebookPageWidget;