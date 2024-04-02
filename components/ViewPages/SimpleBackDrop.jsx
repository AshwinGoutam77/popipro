import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import "../../styles/backdrop.css";

export default function SimpleBackdrop({ visible }) {
  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={visible}
      >
        <h5>Loading...</h5>
        {/* <video
          src="https://prafullgupta.com/connectwork/assets/chat/chats/010424024305loadingvedio.mp4"
          loop
          muted
          autoplay
        ></video> */}
      </Backdrop>
    </div>
  );
}
