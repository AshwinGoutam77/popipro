"use client";
import Api from "@services/Api";
import { CustomForm } from "@services/Routes";
import $ from "jquery"; //Load jquery
import React, { Component, createRef, useRef, useState } from "react"; //For react component

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
function Builder({ JsonData }) {
  let url;
  if (typeof window !== "undefined") {
    url = localStorage.getItem("url");
  }
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formFields = {};
    for (let [name, value] of formData.entries()) {
      if (!formFields[name]) {
        formFields[name] = [value];
      } else {
        formFields[name].push(value);
      }
    }
    // console.log("Form Fields:", formFields);

    const res = await Api(CustomForm, formFields, url);
    if (res.status) {
      document.getElementById("form-builder-popipro").reset();
    }
  };
  return (
    JsonData && (
      <>
        <form onSubmit={(e) => handleSubmitForm(e)} id="form-builder-popipro">
          <FormBuilder JsonData={JsonData} />
          <button type="submit" className="contact-btn w-auto">
            Submit Form
          </button>
        </form>
      </>
    )
  );
}

export default Builder;
