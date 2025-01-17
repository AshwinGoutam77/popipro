"use client";
import Api from "@services/Api";
import { CustomForm } from "@services/Routes";
import $ from "jquery"; //Load jquery
import React, { Component, createRef, useRef, useState } from "react"; //For react component
import { toast } from "react-toastify";
import SimpleBackdrop from "./SimpleBackDrop";
import localforage from "localforage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import LoadingText from "./LoadingText";

if (typeof window !== "undefined") {
  window.jQuery = $; //JQuery alias
  window.$ = $; //JQuery alias
}
if (typeof window !== "undefined") {
  require("jquery-ui-sortable"); //For FormBuilder Element Drag and Drop
  require("formBuilder"); // For FormBuilder
  require("formBuilder/dist/form-render.min.js");
}

//Initialize formBuilder
class FormBuilder extends Component {
  fb = createRef();
  componentDidMount() {
    $(this.fb.current).formRender({ formData: this.props.JsonData });
  }

  render() {
    return <div id="fb-editor" ref={this.fb} />;
  }
}

//Return Initialized formBuilder set it to HTML
function Builder({ JsonData, card_url }) {
  const [ShowLoader, setShowLoader] = useState("");
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    try {
      const formData = new FormData(e.target);
      const formFields = {};
      for (let [name, value] of formData.entries()) {
        if (!formFields[name]) {
          formFields[name] = [value];
        } else {
          formFields[name].push(value);
        }
      }
      let payload = {
        formFields: formFields,
        latitude: localStorage.getItem("latitude"),
        longitude: localStorage.getItem("longitude"),
        fb_token: await localforage.getItem("fcm_token"),
      };
      const res = await Api(CustomForm, payload, card_url);
      if (res.status) {
        setShowLoader(false);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        document.getElementById("form-builder-popipro").reset();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    JsonData && (
      <>
        {/* <SimpleBackdrop visible={ShowLoader} /> */}
        <form onSubmit={(e) => handleSubmitForm(e)} id="form-builder-popipro">
          <FormBuilder JsonData={JsonData} card_url={card_url} />
          {!ShowLoader ? (
            <button type="submit" className="contact-btn w-auto">
              Submit Form
            </button>
          ) : (
            <button class="contact-btn w-auto" disabled>
              <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
              <LoadingText />
            </button>
          )}
        </form>
      </>
    )
  );
}

export default Builder;
