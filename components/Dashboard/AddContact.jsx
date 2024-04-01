"use client";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faClose,
  faContactBook,
  faCross,
} from "@fortawesome/free-solid-svg-icons";

export default function AddContact() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div className="save-contact-drawer text-center">
      <FontAwesomeIcon
        icon={faClose}
        className="close-svg"
        onClick={toggleDrawer("bottom", false)}
      />

      <h5 className="color-black">How to create new contact</h5>
      <img src="https://prafullgupta.com/connectwork/assets/chat/groups/0104240454234c81acc0-daee-4cb5-b1f7-63f168223ce2.png" />
      <button className="contact-btn w-auto mt-4">
        <FontAwesomeIcon icon={faContactBook} className="mr-2" /> Save to
        contacts
      </button>
      <p>
        Receive card via email{" "}
        <FontAwesomeIcon icon={faArrowRight} className="mt-3 ml-1" />
      </p>
    </div>
  );

  return (
    <>
      <button
        onClick={toggleDrawer("bottom", true)}
        className="contact-btn w-100 mobile-contact-btn"
      >
        Add Contact
      </button>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state["bottom"]}
        onClose={toggleDrawer("bottom", false)}
        onOpen={toggleDrawer("bottom", true)}
      >
        {list("bottom")}
      </SwipeableDrawer>
    </>
  );
}
