import React, { useEffect, useState } from "react";
import Api from "@services/Api";
import { UpgradeLandingMode } from "@services/Routes";
import { Modal } from "react-bootstrap";
import { showToast } from "./Toast";
import { FontAwesomeIcon } from "@node_modules/@fortawesome/react-fontawesome";
import { faPlus, faRightFromBracket } from "@node_modules/@fortawesome/free-solid-svg-icons";

export default function Multimodes({
  APIDATA,
  Data,
  active,
  handleClose,
}) {
  const [state, setState] = useState({
    ShowLoader: false,
    ActiveProfile: false,
    ActiveContact: false,
    ActiveGoogleReview: false,
    ActiveTrustPilot: false,
    ActiveForm: false,
    ActiveWhatsapp: false,
    ActiveShareContact: false,
    ShowAppointment: false,
    ActiveOther: false,
    Active: false,
  });

  const [ShowLinkField, setShowLinkField] = useState(false)
  const [Anonymous_link, setAnonymous_link] = useState(Data?.anonymous_landing_link)

  const getStateKey = (type) => {
    const mapping = {
      "profile-preview": "ActiveProfile",
      "save-contact": "ActiveContact",
      "custom-forms": "ActiveForm",
      "open-google-review": "ActiveGoogleReview",
      "open-trustpilot-review": "ActiveTrustPilot",
      "whatsapp": "ActiveWhatsapp",
      "share-contact": "ActiveShareContact",
      "appointment": "ShowAppointment",
      "other": "ActiveOther",
      "enquiry": "Active",
    };
    return mapping[type] || null;
  };

  useEffect(() => {
    if (Data?.landing_mode) {
      const key = getStateKey(Data.landing_mode);
      if (key) {
        setState((prevState) => ({
          ...prevState,
          [key]: true,
        }));
      }
    }
  }, [Data]);

  const handleLandingMode = async (type) => {
    const initialState = {
      ActiveProfile: false,
      ActiveContact: false,
      ActiveGoogleReview: false,
      ActiveTrustPilot: false,
      ActiveForm: false,
      ActiveWhatsapp: false,
      ActiveShareContact: false,
      ShowAppointment: false,
      ActiveOther: false,
      Active: false,
    };

    if (type === "other" && (!Anonymous_link || !/^https?:\/\/\S+$/.test(Anonymous_link))) {
      showToast("Please enter a valid link.", "error");
      return;
    }

    setState((prevState) => ({
      ...prevState,
      ...initialState,
      [getStateKey(type)]: true,
      ShowLoader: true,
    }));

    try {
      const payload = { landing_mode: type, anonymous_landing_link: Anonymous_link };
      const response = await Api(UpgradeLandingMode, payload);
      if (response.data.status) {
        showToast(response.data.message, "success");
        APIDATA();
      } else {
        showToast(response.data.message, "error");
      }
    } catch (error) {
      showToast(error.response?.data?.message || "An error occurred", "error");
    }
    setState((prevState) => ({ ...prevState, ShowLoader: false }));
  };


  const landingModes = [
    {
      label: "Open Profile",
      key: "ActiveProfile",
      mode: "profile-preview",
      condition: true,
    },
    {
      label: "Save Contact",
      key: "ActiveContact",
      mode: "save-contact",
      condition: true,
    },
    {
      label: "Open Google Review Page",
      key: "ActiveGoogleReview",
      mode: "open-google-review",
      condition: Data?.card_google_review !== null,
    },
    {
      label: "Open Whatsapp",
      key: "ActiveWhatsapp",
      mode: "whatsapp",
      condition: Data?.whatsapp_number !== null,
    },
    {
      label: "Open Trustpilot URL",
      key: "ActiveTrustPilot",
      mode: "open-trustpilot-review",
      condition: Data?.card_trustpilot !== null,
    },
    {
      label: "Open Share Contact Form",
      key: "ActiveShareContact",
      mode: "share-contact",
      condition: true,
    },
    {
      label: "Other",
      key: "ActiveOther",
      mode: "other",
      condition: true,
    },
  ];

  return (
    <Modal show={active} onHide={() => handleClose("")} centered>
      <Modal.Header>
        <Modal.Title>
          <h5
            className="title title--h1 first-title title__separate mb-0"
            id="MultimodesModal"
          >
            Card Mode Settings
          </h5>
        </Modal.Title>

        <button
          type="button"
          className="close"
          onClick={() => handleClose("")}
        >
          <span aria-hidden="true">×</span>
          <span className="sr-only">Close alert</span>
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h6 className="text-center mb-2 Varcolor font-weight-normal">
            Change your default card tap behaviour, <br />
            When user visits your profile.
          </h6>
          <ul className="m-0 p-0 multimodes-ul">
            {landingModes.map(
              ({ label, key, mode, condition }) =>
                condition && (
                  <>
                    <li
                      key={mode}
                      className="d-flex align-items-center justify-content-between mb-2"
                    >
                      <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => mode == 'other' && setShowLinkField(true)}>
                        <h6 className="mb-0 w-auto">{label}</h6>
                        {mode == 'other' && <FontAwesomeIcon icon={faPlus} />}
                      </div>
                      <label className="switch">
                        <input
                          data-status={state[key]}
                          data-active={state[key]}
                          checked={state[key]}
                          type="checkbox"
                          onChange={() => handleLandingMode(mode)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </li>
                    {mode === "other" && ShowLinkField && (
                      <li className="input-li">
                        <input
                          type="url"
                          placeholder="Enter link"
                          className="form-control"
                          value={Anonymous_link}
                          onChange={(e) => setAnonymous_link(e.target.value)}
                        />
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          onClick={() => {
                            handleLandingMode("other");
                            setShowLinkField(false);
                          }}
                        />
                      </li>
                    )}

                  </>
                )
            )}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}