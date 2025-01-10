"use client";
import {
    faAngleDoubleRight,
    faArrowRight,
    faCheckCircle,
    faCircleXmark,
    faEnvelope,
    faFloppyDisk,
    faInfo,
    faLocationDot,
    faPencil,
    faPhone,
    faPlus,
    faSpinner,
    faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import "../../../app/styles/graph.css";
import { toast } from "react-toastify";
import Api from "@services/Api";
import {
    CardData,
    DeleteAmenities,
    LoadMoreApi,
    ToogleRealEstateBtn,
    deleteFiles,
    deleteSection,
} from "@services/Routes";
import SimpleBackdrop from "@components/ViewPages/SimpleBackDrop";
import EditPlan from "../EditPlan";
import ProgressBar from "react-bootstrap/ProgressBar";
import LoadingText from "@components/ViewPages/LoadingText";
import EditDropdown from "../Dropdown";
import { showToast } from "@components/Dashboard/Toast";
import { handleActive } from "../EditFunctions";
import DetailModal from "./DetailModal";
import AddRealEstate from "./AddRealEstate";

export default function EditRealEstatee({
    MainData,
    APIDATA,
    Data,
    TitleData,
    PaginationData,
    card,
    setRealEstateData,
    RealEstateData,
    PlanData,
}) {
    const [show, setshow] = useState(false);
    const [ShowModal, setShowModal] = useState(false);
    const [PriceRadio, setPriceRadio] = useState(true);
    const [LabelRadio, setLabelRadio] = useState(false);
    const [GeneralSetting, setGeneralSetting] = useState(true);
    const [CatSetting, setCatSetting] = useState(false);
    const [LocationSetting, setLocationSetting] = useState(false);
    const [Image, setImage] = useState("");
    const [GalleryImages, setGalleryImages] = useState("");
    const [Price, setPrice] = useState("");
    const [PriceText, setPriceText] = useState("");
    const [Description, setDescription] = useState("");
    const [PropertyType, setPropertyType] = useState("");
    const [LookingTo, setLookingTo] = useState("");
    const [Title, setTitle] = useState("");
    const [Locality, setLocality] = useState("");
    const [BhkValue, setBhkValue] = useState("");
    const [BathroomValue, setBathroomValue] = useState("");
    const [BuiltUpArea, setBuiltUpArea] = useState("");
    const [FurnishType, setFurnishType] = useState("");
    const [GoogleMapLink, setGoogleMapLink] = useState("");
    const [ActiveSteps, setActiveSteps] = useState(false);
    const [ShowLoader, setShowLoader] = useState(false);
    const [ContentId, setContentId] = useState(null);
    const [tooltipIsOpen, setTooltipIsOpen] = useState(false);
    const [RealEstateTitle, setRealEstateTitle] = useState("");
    const [EditFields, setEditFields] = useState(false);
    const [Active, setActive] = useState("");
    const [EditRadioBtn, setEditRadioBtn] = useState("");
    const [Page, setPage] = useState(1);
    const [LoadMoreData, setLoadMoreData] = useState("");
    const [ModalHeading, setModalHeading] = useState("");
    const [YouTubeLink, setYouTubeLink] = useState("");
    const [Address, setAddress] = useState("");
    const [City, setCity] = useState("");
    const [Country, setCountry] = useState("");
    const [ZipCode, setZipCode] = useState("");
    const [State, setState] = useState("");
    const [Amenities, setAmenities] = useState(false);
    const [OtherAmenities, setOtherAmenities] = useState(false);
    const [InternalBuildUp, setInternalBuildUp] = useState("");
    const [ExternalBuildUp, setExternalBuildUp] = useState("");

    useEffect(() => {
        setRealEstateTitle(TitleData?.card_realestates?.visible_name);
        setRealEstateData(Data?.card_realestates);
    }, []);
    useEffect(() => {
        setActive(TitleData?.card_realestates?.is_active == "1" ? true : false);
    }, [TitleData]);

    const handleShowAddModal = () => {
        setShowModal(true)
    }

    const handleChnageTitle = async () => {
        if (RealEstateTitle == "") {
            showToast("Section title is required", "error")
            return;
        }
        setShowLoader(true);
        let titles = [
            {
                name: "card_realestates",
                visible_name: RealEstateTitle,
            },
        ];
        try {
            const response = await Api(CardData, { titles });
            setShowLoader(false);
            if (response.data.status) {
                APIDATA();
                showToast(response.data.message, 'success')
                setEditFields(false);
            }
        } catch (error) {
            if (error.request.status == "401") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
            setShowLoader(false);
            showToast(error.response.data.message, 'error')
        }
    };

    const handleShowDetailModal = (id) => {
        setContentId(id);
        setshow(true);
    };


    const renderRealEstateItems = () => {
        if (RealEstateData?.length === 0) {
            return <p>Real Estate are empty, to add click on the add icon.</p>;
        }

        return RealEstateData.map((item, index) => (
            <div key={index}>
                <div className="row realestaterow">
                    <div className="col-lg-4 col-sm-12 mb-2">
                        <div className="position-relative mb-2">
                            <img
                                src={
                                    item?.image?.path
                                        ? `${Data?.base_url}${item?.image?.path}`
                                        : "../static/img/picture-1.jpg"
                                }
                                alt="realestate_image"
                                className="realEstateImage w-100"
                            />
                        </div>
                        <div
                            className="mt-3 d-flex align-items-center justify-content-between cursor-pointer"
                            onClick={() => handleShowDetailModal(item?.id)}
                        >
                            <p>
                                {item?.gallery?.length ? (
                                    <span className="VarColor font-weight-bold text-decoration-underline">
                                        More Images
                                    </span>
                                ) : ""}
                            </p>
                            <p className="mobile-real-estate-price">
                                {item.is_label !== 0 ? (
                                    <span className="font-weight-bold VarColor">{item?.label}</span>
                                ) : (
                                    <span className="font-weight-bold VarColor">
                                        {MainData?.company_setting?.currency?.currency} {item?.price}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-8 col-sm-12">
                        <div className="mt-2 cursor-pointer">
                            <h6
                                className="mb-0 color-black cursor-pointer d-flex align-items-center justify-content-between real-estate-heading"
                                onClick={() => handleShowDetailModal(item?.id)}
                            >
                                {item?.heading}
                                <span className="real-estate-badge">{item?.property_type?.name}</span>
                            </h6>
                            <p
                                className="color-black cursor-pointer mt-2"
                                onClick={() => handleShowDetailModal(item?.id)}
                            >
                                {item?.street_address}, {item?.city}, {item?.state}, {item?.country}
                            </p>
                        </div>

                        <div
                            className="mt-2 d-flex flex-wrap align-items-center justify-content-between"
                            style={{ gap: "10px" }}
                        >
                            {item.is_label !== 0 ? (
                                <span className="font-weight-bold VarColor web-real-estate-price">
                                    {item?.label}
                                </span>
                            ) : (
                                <p className="font-weight-bold VarColor web-real-estate-price">
                                    {MainData?.company_setting?.currency?.currency} {item?.price}
                                </p>
                            )}
                        </div>

                        <div className="d-flex align-items-center flex-wrap mt-2 amenities-main-section">
                            {item?.amenities?.slice(0, 4).map((amenity, key) => (
                                <div
                                    className="d-flex align-items-baseline amenities-div"
                                    key={key}
                                >
                                    <span
                                        style={{ fontSize: "16px" }}
                                        dangerouslySetInnerHTML={{ __html: amenity.icon }}
                                    ></span>
                                    <p className="pl-2 color-black">{amenity?.pivot?.description}</p>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                            style={{ gap: "10px" }}
                        >
                            <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                                {Data?.whatsapp_number &&
                                    MainData?.company_setting?.show_realestate_wp_button !== 0 && (
                                        <a
                                            href={`https://api.whatsapp.com/send?phone=${Data?.whatsapp_number}&text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ....?`}
                                            target="_blank"
                                            className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                                        >
                                            <img
                                                src="../static/img/whatsapp.png"
                                                alt="whatsaap"
                                                className="Whatsaapsvg"
                                            />
                                        </a>
                                    )}
                                {MainData?.company_setting?.show_realestate_enquiry_button !== 0 && (
                                    <span
                                        data-toggle="modal"
                                        data-target="#ProductEnquireModal"
                                        className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faEnvelope} className="user-select-auto" />
                                    </span>
                                )}
                                {item?.google_address_link && (
                                    <a
                                        href={item?.google_address_link}
                                        target="_blank"
                                        className="whatsap-link-view d-flex align-items-center justify-content-center"
                                    >
                                        <FontAwesomeIcon icon={faLocationDot} className="user-select-auto" />
                                    </a>
                                )}
                            </div>
                            <FontAwesomeIcon
                                icon={faArrowRight}
                                className="user-select-auto mr-2 viewmore-btn-product cursor-pointer"
                                onClick={() => handleShowDetailModal(item?.id)}
                            />
                        </div>
                    </div>
                </div>

                {TitleData?.card_realestates?.source == "2" &&
                    TitleData?.card_realestates?.in_subscription && (
                        <div
                            className={
                                index + 1 === RealEstateData.length
                                    ? "d-flex align-items-center justify-content-start gap-2 mt-1 pb-4 mb-4"
                                    : "d-flex align-items-center justify-content-start gap-2 mt-1 pb-4 mb-4 real-estate-border"
                            }
                        >
                            <button
                                className="send-btnn m-0"
                                onClick={() => handleShowModal(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-button m-0"
                                onClick={() => handleDelete(item)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
            </div>
        ));
    };

    return (
        <>
            <DetailModal Data={Data} MainData={MainData} show={show} setshow={setshow} ContentId={ContentId} />
            <AddRealEstate ModalHeading={ModalHeading} ShowModal={ShowModal} />
            <div className="box-content boxxx" id="card_realestates">
                <div className="pb-0 pb-sm-2">
                    <div className="flex-header">
                        {EditFields ? (
                            <input
                                name="years"
                                rows="4"
                                cols="50"
                                className="title-section-input w-auto"
                                onChange={(e) => setRealEstateTitle(e.target.value)}
                                defaultValue={TitleData.card_realestates?.visible_name}
                                placeholder="Title"
                            />
                        ) : (
                            <h1 className="title title--h1 first-title title__separate">
                                {RealEstateTitle}
                            </h1>
                        )}
                        {TitleData?.card_realestates?.source == "2" &&
                            TitleData?.card_realestates?.in_subscription && (
                                <div className="web-edit-icons">
                                    <div className="d-flex align-items-center">
                                        <div className="wrapper">
                                            <div className="tooltip">
                                                Use this section as upload and show your property for the sell.
                                            </div>
                                            <img
                                                src="../static/img/info.svg"
                                                alt="info"
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
                                                    onClick={handleChnageTitle}
                                                />
                                            ) : (
                                                <FontAwesomeIcon
                                                    icon={faPencil}
                                                    className="ml-3 pe-auto Iconcolor-black"
                                                    onClick={() => setEditFields(true)}
                                                />
                                            )}
                                        </div>
                                        <button className="addmore" onClick={handleShowAddModal}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <label className="switch">
                                            <input
                                                data-status={TitleData.card_blogs?.is_active}
                                                data-active={Active}
                                                checked={Active}
                                                type="checkbox"
                                                onChange={() => handleActive({ section_name: "card_realestates", Visible_name: RealEstateTitle, Active, setActive })}
                                            />
                                            <span className="slider round"></span>
                                        </label>
                                    </div>
                                </div>
                            )}
                    </div>

                    {renderRealEstateItems()}

                    <div className="mt-4">
                        <h6 className="font-weight-bold">How you want to receive inquiry:</h6>
                        <div className="d-flex align-items-start">
                            <input
                                type="checkbox"
                                id="real-estate-whatsaap"
                                className="mt-1"
                                value={MainData?.company_setting?.show_realestate_wp_button !== 0}
                                onChange={() => handleRealEstateBtn("wp")}
                                checked={MainData?.company_setting?.show_realestate_wp_button !== 0}
                            />
                            <label
                                htmlFor="real-estate-whatsaap"
                                className="ml-2 Varcolor font-weight-bold"
                            >
                                Via WhatsApp only?
                            </label>
                        </div>
                        <div className="d-flex align-items-start">
                            <input
                                type="checkbox"
                                id="real-estate-enq"
                                className="mt-1"
                                value={MainData?.company_setting?.show_realestate_enquiry_button !== 0}
                                onChange={() => handleRealEstateBtn("enq")}
                                checked={MainData?.company_setting?.show_realestate_enquiry_button !== 0}
                            />
                            <label
                                htmlFor="real-estate-enq"
                                className="ml-2 Varcolor font-weight-bold mb-0"
                            >
                                Via enquiry form?
                            </label>
                        </div>
                    </div>

                    {PaginationData?.total_realestate === Data?.card_realestates?.length &&
                        LoadMoreData &&
                        Data?.card_realestates?.length !== 0 && (
                            <div className="mx-auto text-center pt-2">
                                <a
                                    className="text-center cursor-pointer mx-auto"
                                    style={{ textDecoration: "underline", fontSize: "16px", color: "var(--color)" }}
                                    onClick={incrementCount}
                                >
                                    Load More
                                </a>
                            </div>
                        )}
                </div>
            </div>
        </>
    )
}
