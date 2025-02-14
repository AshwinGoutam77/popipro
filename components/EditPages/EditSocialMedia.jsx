"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCircleCheck,
  faCircleInfo,
  faFloppyDisk,
  faInfo,
  faMinusCircle,
  faPenToSquare,
  faPencil,
  faPlus,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import Api from "@services/Api";
import {
  CardData,
  ToogleInstaFeed,
  deleteSection,
  socialMedia,
} from "@services/Routes";
import Modal from "react-bootstrap/Modal";
import EditDropdown from "./Dropdown";
import { showToast } from "@components/Dashboard/Toast";
import { handleActive } from "./EditFunctions";
import EditPlan from "./EditPlan";

function EditLinks({
  Data,
  APIDATA,
  TitleData,
  PlanData,
  CardLinks,
  MainData,
}) {
  const [AddLinks, setAddLinks] = useState("");
  const [Links, setLinks] = useState(false);
  const [LinkFeild, setLinkFeild] = useState([]);
  const [ShowLoader, setShowLoader] = useState("");
  const [EditFields, setEditFields] = useState(false);
  const [ModalId, setModalId] = useState("");
  const [SelectOption, setSelectOption] = useState("");
  const [SocialType, setSocialType] = useState("");
  const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [LinksTitle, setLinksTitle] = useState("");
  const handleClose = () => setShow(false);
  const handleEditClose = () => setShowEdit(false);
  const handleShow = () => setShow(true);
  const handleEditShow = () => setShowEdit(true);
  const [isLocked, setIsLocked] = useState(false);
  const [Active, setActive] = useState("");

  useEffect(() => {
    setActive(TitleData?.card_social_links?.is_active == "1" ? true : false);
  }, [TitleData]);

  useEffect(() => {
    setLinksTitle(TitleData?.card_social_links?.visible_name);
    setIsLocked(TitleData?.card_social_links?.is_locked == "1" ? true : false);
  }, []);

  useEffect(() => {
    handleEditLinks();
    let pu = [];
    CardLinks?.forEach((element) => {
      pu.push({
        type: element.parent.id,
        link: element.link,
        platform_name: element.parent.platform_name,
      });
    });
    setLinkFeild(pu);
  }, [CardLinks]);

  const RepeatData = CardLinks?.map((item) => {
    // console.log('item', item);
    return item?.parent?.id;
  });

  // console.log(RepeatData, AddLinks);

  const handleEditLinks = async () => {
    const response = await Api(socialMedia, {});
    if (response.status) {
      setAddLinks(response.data.data);
    }
  };

  const handleSaveLinkDetail = async (id) => {
    let links = [];
    let error = false;
    let mess = "";
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (
      SelectOption == "" ||
      SocialType == "" ||
      urlPattern.test(SocialType) == false
    ) {
      error = true;
      mess =
        SelectOption == ""
          ? "Please select an option"
          : "Please enter a valid URL";
    } else {
      id !== null
        ? (links = [
          {
            url: SocialType,
            type: SelectOption,
            saved_link: id,
          },
        ])
        : (links = [
          {
            url: SocialType,
            type: SelectOption,
          },
        ]);
    }
    if (error) {
      console.log('prere', mess);
      toast.error(mess, {
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

    try {
      const response = await Api(CardData, { links });
      if (response?.data?.status) {
        APIDATA();
        handleClose();
        handleEditClose();
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
    setSelectOption("");
    setSocialType("");
  };

  const handleCancle = () => {
    setLinks(true);
    if (Links) {
      setLinks(false);
    }
    var elem = document.getElementById("about");
    elem.scrollIntoView();
  };

  const handleDelteServices = async (id, type, DataId) => {
    let data = {
      type: type,
      base: id,
      id: DataId,
    };
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
        const response = await Api(deleteSection, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const handleCanclebtn = () => {
    handleEditClose();
    handleClose();
    setSocialType("");
    setSelectOption("");
  };
  const handleChnageTitle = async () => {
    if (LinksTitle == "") {
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
        name: "card_social_links",
        visible_name: LinksTitle,
      },
    ];
    try {
      const response = await Api(CardData, { titles });
      setShowLoader(false);
      if (response.data.status) {
        APIDATA();
        // setData(response.data.data);
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
  const handleSetId = (id, socail_id, type) => {
    handleEditShow();
    setModalId(id);
    setSelectOption(socail_id);
    setSocialType(type);
  };
  const handleToogleFeed = async () => {
    const res = await Api(ToogleInstaFeed, {});
    if (res.status) {
      APIDATA();
    }
  };

  const handleShowSection = async () => {
    const newValue = !isLocked;
    setIsLocked(newValue);
    let titles = [
      {
        name: "card_social_links",
        visible_name: TitleData?.card_social_links?.visible_name,
        is_locked: newValue ? 1 : 0,
      },
    ];
    const response = await Api(CardData, { titles });
    if (response?.data?.status) {
      showToast(response.data?.message, "success");
    }
  };

  return (
    <>
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      {/* <Share Data={Data} /> */}

      <Modal show={show} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Add {LinksTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={handleCanclebtn}>
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
              onChange={(e) => setSelectOption(e.target.value)}
            >
              <option value="">Select a Social Media*</option>
              {AddLinks &&
                AddLinks.filter(
                  (obj) => !RepeatData?.some((id) => id === String(obj.id))
                ).map((obj, i) => (
                  <option value={obj.id} key={i}>
                    {obj.platform_name}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-flex align-items-center mb-4">
            <input
              type="text"
              name="name"
              placeholder="Please Enter Your Complete URL*"
              className="px-2 form-control border border-#ccc border-0"
              style={{ height: "auto", border: "none" }}
              value={SocialType}
              onChange={(e) => setSocialType(e.target.value)}
            />
          </div>
          <div
            className="d-flex align-items-center mt-0"
            style={{ gap: "10px" }}
          >
            <button
              className="send-btnn"
              onClick={() => handleSaveLinkDetail()}
            >
              Save
            </button>
            <button className="delete-button m-0" onClick={handleCanclebtn}>
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Model */}
      <Modal show={showEdit} onHide={handleCanclebtn} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              class="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              Edit {LinksTitle}
            </h5>
          </Modal.Title>
          <button type="button" class="close" onClick={() => handleCanclebtn()}>
            <span aria-hidden="true">×</span>
            <span class="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body>
          {CardLinks?.map((item, index) => {
            return (
              <>
                {ModalId === item.id ? (
                  <div key={index}>
                    <div className="d-flex align-items-center mb-2 position-relative">
                      <select
                        id="select-list"
                        style={{
                          appearance: "auto",
                          height: "48px",
                        }}
                        className="form-control px-2 p-0 font-weight-bold mb-2"
                        name="type"
                        onChange={(e) => setSelectOption(e.target.value)}
                      >
                        <option value="">Select a Social Media</option>
                        {AddLinks &&
                          AddLinks.map((obj, i) => (
                            <option
                              value={obj.id}
                              key={i}
                              selected={
                                item.parent.platform_name === obj.platform_name
                              }
                              disabled
                            >
                              {obj.platform_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="d-flex align-items-center mb-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Please Enter Your Complete URL"
                        className="px-2 form-control border border-#ccc border-0"
                        style={{ height: "auto", border: "none" }}
                        value={SocialType}
                        // onChange={(evnt) => handleLinkChnage(i, evnt)}
                        onChange={(e) => setSocialType(e.target.value)}
                      />
                    </div>
                    <div
                      className="d-flex align-items-center mt-3"
                      style={{ gap: "10px" }}
                    >
                      <button
                        className="send-btnn"
                        onClick={() => handleSaveLinkDetail(item.id)}
                      >
                        Update
                      </button>
                      <button
                        className="delete-button m-0"
                        onClick={handleCanclebtn}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </Modal.Body>
      </Modal>



      {TitleData?.card_social_links?.source !== 0 ? (
        <div className="position-relative">
          {Data && (
            <EditPlan
              Data={Data}
              PlanData={PlanData}
              APIDATA={APIDATA}
              MainData={MainData}
              in_subscription={TitleData?.card_social_links?.in_subscription}
            />
          )}
          <div className="box-content boxxx" id="about">
            <>
              <div className="flex-header">
                <div className="d-flex align-items-baseline">
                  {EditFields ? (
                    <input
                      name="years"
                      rows="4"
                      cols="50"
                      className="title-section-input"
                      onChange={(e) => setLinksTitle(e.target.value)}
                      defaultValue={
                        TitleData &&
                          TitleData.card_social_links?.visible_name ==
                          "card_social_links"
                          ? "card_social_links"
                          : TitleData?.card_social_links?.visible_name
                      }
                      placeholder="Title"
                      maxLength="20"
                    ></input>
                  ) : (
                    <>
                      <h1 className="title title--h1 first-title title__separate">
                        {LinksTitle}
                      </h1>
                    </>
                  )}
                </div>

                {TitleData?.card_social_links.source == 2 && TitleData?.card_social_links?.in_subscription ? (
                  <>
                    <div className="web-edit-icons">
                      <div className="d-flex align-items-center">
                        <div class="wrapper">
                          <div class="tooltip">
                            Link Your Social Media Handles. Please Fill The
                            Complete URL of your Profile.
                          </div>
                          <img
                            src="../static/img/info.svg"
                            alt="image"
                            width={18}
                            className="mr-2 cursor-pointer"
                            onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
                          />
                        </div>

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

                        {TitleData?.card_social_links.source !== 1 && (
                          <button
                            className="addmore"
                            id="card_socialmedia"
                            onClick={() => handleShow()}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        )}

                        <div>
                          <label className="switch">
                            <input
                              data-status={
                                TitleData.card_alternate_phone?.is_active
                              }
                              data-active={Active}
                              checked={Active}
                              type="checkbox"
                              onChange={() =>
                                handleActive({
                                  section_name: "card_social_links",
                                  Visible_name: LinksTitle,
                                  Active,
                                  setActive,
                                })
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="mobile-edit-icons">
                      {EditFields ? (
                        <div>
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="ml-2 VarColor w-auto cursor-pointer CheckTitle"
                            onClick={() => handleChnageTitle()}
                          />
                        </div>
                      ) : (
                        <EditDropdown
                          TitleData={TitleData}
                          setEditFields={setEditFields}
                          AddTitle={
                            "Add " + TitleData?.card_social_links?.visible_name
                          }
                          handleShowAddModal={handleShow}
                          setTooltipIsOpen={setTooltipIsOpen}
                          message="Link Your Social Media Handles. Please Fill The Complete URL
                        of your Profile."
                          tooltipIsOpen={tooltipIsOpen}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>

              {Links ? (
                <div>
                  <>
                    {AddLinks &&
                      AddLinks?.map((item, index) => {
                        return (
                          <div
                            className="d-flex align-items-center socail-media-add-div"
                            key={index}
                          >
                            <div>
                              <img
                                src={
                                  "../public/static/img/" +
                                  item.platform_name.toLowerCase() +
                                  ".png"
                                }
                                alt={item.platform_name}
                                style={{
                                  width: "32px",
                                  borderRadius: "100%",
                                }}
                              />
                            </div>
                            <input
                              type="text"
                              name={`${item.platform_name.toLowerCase()}_url`}
                              className="border-none w-100"
                              placeholder={`Enter your ${item.platform_name.toLowerCase()} url`}
                            />
                          </div>
                        );
                      })}
                    <div
                      className="d-flex align-items-center mt-3"
                      style={{ gap: "10px" }}
                    >
                      <button
                        className="send-btnn"
                        onClick={handleSaveLinkDetail}
                      >
                        Save
                      </button>
                      <button
                        className="delete-button m-0"
                        onClick={handleCancle}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                </div>
              ) : (
                <div
                  className="d-flex flex-wrap align-items-center"
                  style={{ gap: "15px" }}
                >
                  {CardLinks?.length == 0 ? (
                    <p>
                      Social links are empty, to add links click on the plus icon
                    </p>
                  ) : (
                    <div
                      className="d-flex flex-wrap align-items-center w-100"
                      style={{ gap: "15px" }}
                    >
                      {CardLinks &&
                        CardLinks.map((item, i) => {
                          return (
                            <>
                              <div className="position-relative w-100" key={i}>
                                {TitleData.card_social_links?.source !== 1 ? (
                                  <FontAwesomeIcon
                                    data-toggle="modal"
                                    data-target="#SocialLinksModalEdit"
                                    icon={faPencil}
                                    className="pe-auto cursor-pointer"
                                    style={{
                                      fontSize: "15px",
                                      color: "var(--color)",
                                      position: "absolute",
                                      right: "0px",
                                      top: "16px",
                                      background: "white",
                                      width: "21px",
                                      paddingRight: "24px",
                                    }}
                                    onClick={() =>
                                      handleSetId(
                                        item.id,
                                        item.parent.id,
                                        item.link
                                      )
                                    }
                                  />
                                ) : (
                                  ""
                                )}
                                {TitleData.card_social_links?.source !== 1 ? (
                                  <FontAwesomeIcon
                                    icon={faXmarkCircle}
                                    className="user-select-auto position-absolute top-0 end-0 link-minus-icon"
                                    style={{
                                      right: "-7",
                                      cursor: "pointer",
                                      color: "var(--color)",
                                      fontSize: "20px",
                                    }}
                                    onClick={() =>
                                      handleDelteServices(item.id, 7, Data?.id)
                                    }
                                  />
                                ) : (
                                  ""
                                )}
                                <div className="d-flex align-items-center socail-media-add-div">
                                  <div>
                                    <img
                                      src={
                                        "../static/img/" +
                                        item.parent.platform_name.toLowerCase() +
                                        ".png"
                                      }
                                      alt={item.parent.platform_name}
                                      style={{
                                        width: "32px",
                                        borderRadius: "100%",
                                      }}
                                    />
                                  </div>
                                  <p className="ml-2 text-black font-weight-bold">
                                    {item.parent.platform_name}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {(MainData?.plan?.subscription !== null &&
                MainData?.plan?.subscription?.plan_id !== null) ||
                MainData?.plan?.subscription?.plan_id == 2 ? (
                <>
                  <div className="mt-3 d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="insta"
                      value={
                        MainData?.company_setting?.show_insta_feed !== 0
                          ? true
                          : false
                      }
                      checked={
                        MainData?.company_setting?.show_insta_feed !== 0
                          ? true
                          : false
                      }
                      onChange={() => handleToogleFeed()}
                    />
                    <label
                      className="VarColor font-weight-bold ml-2 cursor-pointer m-0"
                      htmlFor="insta"
                    >
                      Would you like to display the Instagram feeds as well?
                    </label>
                  </div>
                  <p className="VarColor font-weight-bold cursor-pointer m-0">
                    <span className="color-black">Note:</span> Only public profile
                    will be visible.
                  </p>
                </>
              ) : (
                ""
              )}
              <div className="mt-4">
                <label htmlFor="social-password">
                  <input
                    type="checkbox"
                    id="social-password"
                    checked={isLocked}
                    onChange={handleShowSection}
                  />{" "}
                  Private the section
                </label>
              </div>
            </>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EditLinks;
