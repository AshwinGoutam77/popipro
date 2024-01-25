import EmbedPost from "@components/ViewPages/EmbedPost";
import {
  faFloppyDisk,
  faInfo,
  faPencil,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Api from "@services/Api";
import {
  CardData,
  DeleteSocailVisit,
  GetSocailVisits,
  SocailVisitsApi,
  socialMedia,
} from "@services/Routes";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function SocailVisits({
  TitleData,
  APIDATA,
  MainData,
  profile,
  card,
}) {
  const [EditFields, setEditFields] = useState(false);
  const [LinksTitle, setLinksTitle] = useState("");
  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [ShowLoader, setShowLoader] = useState("");
  const [AddLinks, setAddLinks] = useState("");
  const [SocailId, setSocailId] = useState("");
  const [SocailUrl, setSocailUrl] = useState("");
  const [Active, setActive] = useState("");
  const [VisitName, setVisitName] = useState("");
  const [EditId, setEditId] = useState("");

  useEffect(() => {
    setVisitName(TitleData?.card_social_visits?.visible_name);
  }, []);
  useEffect(() => {
    setActive(TitleData?.card_social_visits?.is_active == "1" ? true : false);
  }, [TitleData]);

  const handleChnageTitle = async () => {
    if (VisitName == "") {
      toast.error("Section title is required", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setShowLoader(true);
    let titles = [
      {
        name: "card_social_visits",
        visible_name: VisitName,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditFields(false);
      }
    } catch (error) {
      if (error.request.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      setShowLoader(false);
      toast(error.response.data.message, {
        position: "bottom-right",
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
  const handleShowEdit = (id, link, option) => {
    console.log(option);
    setEditId(id);
    setSocailId(option);
    setSocailUrl(link);
    setShow(true);
  };
  const handleCanclebtn = () => {
    setShow(false);
    setSocailId("");
    setSocailUrl("");
  };

  const handleEditLinks = async () => {
    const response = await Api(GetSocailVisits, {});
    if (response.status) {
      setAddLinks(response.data.data);
    }
  };
  useEffect(() => {
    handleEditLinks();
  }, [Show]);

  const handleSaveDetails = async (id) => {
    if (SocailId === "" || SocailUrl === "") {
      toast.error(
        SocailId === ""
          ? "Please select an option"
          : "Social media url is required",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    let payload = {
      social_visit_id: SocailId,
      link: SocailUrl,
    };
    try {
      const response = await Api(SocailVisitsApi, payload);
      if (response?.data?.status) {
        APIDATA();
        handleClose();
        toast.success(response.data.message, {
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
    } catch (error) {
      if (error?.request?.status == "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      toast(error?.response?.data?.message, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    handleCanclebtn();
    setSocailId("");
    setSocailUrl("");
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_social_visits",
        visible_name: VisitName,
        is_featured: Active ? "0" : "1",
        is_active: Active ? "0" : "1",
      },
    ];
    Swal.fire({
      title: "Are you sure?",
      text:
        Active == 1
          ? "You want to hide this section from your profile?"
          : "You want to show this section on your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(24 123 249)",
      cancelButtonColor: "#d33",
      confirmButtonText: Active == 1 ? "Yes hide it!" : "Yes show it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setShowLoader(true);
          const response = await Api(CardData, { titles });
          if (response.status) {
            setActive((prev) => !prev);
            setShowLoader(false);
            // APIDATA();
          }
        } catch (error) {
          if (error.request.status == "401") {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
          toast(error.response.data.message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    });
  };
  const handleDelteSocailVisit = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(DeleteSocailVisit, {});
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  return (
    <>
      <Modal show={Show} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {VisitName}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleClose}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-2 position-relative">
            <select
              id="select-list"
              style={{
                appearance: "auto",
                height: "48px",
              }}
              className="form-control px-2 p-0 font-weight-bold mb-2"
              name="type"
              onChange={(e) => setSocailId(e.target.value)}
            >
              <option value="">Select a Social Media*</option>
              {AddLinks &&
                AddLinks.map((obj, i) => (
                  <option value={obj.id} key={i} selected={SocailId === obj.id}>
                    {obj.social_visit_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-flex align-items-center mb-1">
            <input
              type="text"
              name="name"
              placeholder="Please Enter Your Complete Url*"
              className="px-2 form-control border border-#ccc border-0"
              style={{ height: "auto", border: "none" }}
              value={SocailUrl}
              onChange={(e) => setSocailUrl(e.target.value)}
            />
          </div>
          <div
            className="d-flex align-items-center mt-0"
            style={{ gap: "10px" }}
          >
            <button className="send-btnn" onClick={() => handleSaveDetails()}>
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>
      <div className="mb-3 box-content boxxx" id="socail_visits">
        <div className="flex-header">
          <div className="d-flex align-items-baseline">
            {EditFields ? (
              <input
                name="years"
                rows="4"
                cols="50"
                className="title-section-input"
                onChange={(e) => setVisitName(e.target.value)}
                defaultValue={
                  TitleData &&
                  TitleData.card_social_visits?.visible_name ==
                    "card_social_visits"
                    ? "card_social_visits"
                    : TitleData?.card_social_visits?.visible_name
                }
                placeholder="Title"
              ></input>
            ) : (
              <>
                <h1 className="title title--h1 first-title title__separate">
                  {VisitName}
                </h1>
              </>
            )}
          </div>
          <div className="d-flex align-items-center">
            <div class="wrapper">
              <div class="tooltip">
                Add your social Widgets here, please add the full url to your
                social media pages.
              </div>
              <FontAwesomeIcon
                icon={faInfo}
                className="mr-2 pe-auto Iconcolor-black cursor-pointer"
                onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
              />
            </div>
            {TitleData?.card_social_links.source !== 1 ? (
              <div className="edit-pencile-div">
                {EditFields ? (
                  <FontAwesomeIcon
                    icon={faFloppyDisk}
                    className="ml-3 pe-auto floopySave-icon"
                    onClick={() => handleChnageTitle()}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="ml-3 pe-auto Iconcolor-black"
                    onClick={() => setEditFields(true)}
                  />
                )}
              </div>
            ) : (
              ""
            )}
            {TitleData?.card_social_links.source !== 1 ? (
              <>
                <button className="addmore mr-3" onClick={() => handleShow()}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <label className="switch">
                  <input
                    data-status={TitleData.card_social_visits?.is_active}
                    data-active={Active}
                    checked={Active}
                    type="checkbox"
                    onChange={() => handleActive()}
                  />
                  <span className="slider round"></span>
                </label>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          {card?.card_social_visits?.length !== 0 ? (
            card?.card_social_visits?.map((item, index) => {
              return (
                <>
                  {item?.social_visit?.social_visit_name == "Instagram" ? (
                    <iframe
                      src={item?.link + "/embed/"}
                      width="500"
                      height="600"
                      frameborder="0"
                      scrolling="no"
                      allowtransparency="true"
                      key={index}
                    ></iframe>
                  ) : (
                    ""
                  )}
                  {item?.social_visit?.social_visit_name == "Twitter" ? (
                    <blockquote class="twitter-tweet">
                      <p lang="en" dir="ltr">
                        <a href={item?.link}></a>
                      </p>
                      {/* &mdash; Twitter (@Twitter) */}
                    </blockquote>
                  ) : (
                    ""
                  )}

                  <div
                    className="d-flex align-items-initial mt-3"
                    style={{ gap: "10px" }}
                  >
                    <button
                      className="send-btnn m-0"
                      data-toggle="modal"
                      data-target="#EditTestiModal"
                      onClick={() =>
                        handleShowEdit("id", item?.link, item?.social_visit?.id)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button m-0"
                      onClick={() => handleDelteSocailVisit()}
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
            })
          ) : (
            <p>
              Social Widgets are empty, to add Widgets click on the plus icon
            </p>
          )}
        </div>
      </div>
    </>
  );
}
