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
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";
import "../../app/styles/graph.css";
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
import EditPlan from "./EditPlan";
import ReactPlayer from "react-player";
import ProgressBar from "react-bootstrap/ProgressBar";
import LoadingText from "@components/ViewPages/LoadingText";
import EditDropdown from "./Dropdown";

export default function EditRealEstate({
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

  const [inputList, setInputList] = useState([
    { amenities_id: "", description: "" },
  ]);

  const [inputList2, setInputList2] = useState([
    { amenities_id: "", description: "" },
  ]);

  const handleCanclebtn = () => {
    setshow(false);
    setShowModal(false);
  };

  const handleRadioBTN = (e) => {
    setEditRadioBtn(0);
    setLabelRadio(false);
    if (PriceRadio == false) {
      setPriceRadio(true);
    }
  };

  const handleLabelRadio = () => {
    setEditRadioBtn(1);
    setPriceRadio(false);
    if (LabelRadio == false) {
      setLabelRadio(true);
    }
  };

  const handleShowDetailModal = (id) => {
    setContentId(id);
    setshow(true);
  };

  const handleShowModal = (items) => {
    setModalHeading("Edit " + TitleData?.card_realestates?.visible_name);
    setContentId(items?.id ? items?.id : null);
    setShowModal(true);
    setTitle(items?.heading);
    setDescription(items?.description);
    setPropertyType(items?.property_type?.id);
    setLocality(items?.street_address);
    setBhkValue(items?.bhk);
    setBathroomValue(items?.bathroom);
    setFurnishType(items?.furnish_type);
    setPrice(items?.price);
    setBuiltUpArea(items?.area);
    setGoogleMapLink(items?.google_address_link);
    setLookingTo(items?.looking_for?.id);
    setPriceText(items?.label);
    setEditRadioBtn(items?.is_label);
    setPriceRadio(items?.is_label == 0 ? true : false);
    setYouTubeLink(items?.youtube_link);
    setCity(items?.city);
    setCountry(items?.country);
    setZipCode(items?.zipcode);
    setAddress(items?.street_address);
    setState(items?.state);
    setInputList(
      items?.amenities.map((item) => ({
        amenities_id: item?.pivot?.amenities_id,
        description: item?.pivot?.description,
      }))
    );
    setInternalBuildUp(items?.internal_area);
    setExternalBuildUp(items?.external_area);
  };

  const handleSettings1 = () => {
    setGeneralSetting(true);
    setCatSetting(false);
    setLocationSetting(false);
    setAmenities(false);
    setOtherAmenities(false);
  };

  const handleSettings2 = () => {
    let error = false;
    let mess = "";
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (
      Title == "" ||
      PropertyType == "" ||
      Description == "" ||
      GalleryImages?.length > 3 ||
      (YouTubeLink && urlPattern.test(YouTubeLink) == false)
    ) {
      error = true;
      mess =
        Title === ""
          ? "Title field is required"
          : PropertyType === ""
          ? "Property type is requried"
          : Description === ""
          ? "Description is requried"
          : GalleryImages?.length > 3
          ? "Gallery images can't be more than 3"
          : urlPattern.test(YouTubeLink) == false
          ? "Enter a valid youtube url"
          : "";
    }
    if (error) {
      console.log(mess);
      setShowLoader(false);
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
    } else {
      setGeneralSetting(false);
      setCatSetting(true);
      setActiveSteps(true);
      setLocationSetting(false);
      setAmenities(false);
      setOtherAmenities(false);
    }
  };

  const handleSettings3 = () => {
    let error = false;
    let mess = "";
    if (
      Address == "" ||
      City == "" ||
      State == "" ||
      Country == "" ||
      ZipCode == "" ||
      BuiltUpArea == ""
    ) {
      error = true;
      mess =
        Address === ""
          ? "Address field is required"
          : City === ""
          ? "City field is requried"
          : Country === ""
          ? "Country field is requried"
          : State === ""
          ? "State field is requried"
          : ZipCode === ""
          ? "Zip code is requried"
          : BuiltUpArea === ""
          ? "Build up area is requried"
          : "";
    }
    if (error) {
      setShowLoader(false);
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
    } else {
      setLocationSetting(true);
      setGeneralSetting(false);
      setCatSetting(false);
      setAmenities(false);
      setOtherAmenities(false);
    }
  };

  const handleSettings4 = () => {
    setGeneralSetting(false);
    setCatSetting(false);
    setLocationSetting(false);
    setAmenities(true);
    setOtherAmenities(false);
  };

  const handleSettings5 = () => {
    setGeneralSetting(false);
    setCatSetting(false);
    setLocationSetting(false);
    setAmenities(false);
    setOtherAmenities(true);
  };

  const HandleEmptyFeilds = () => {
    setImage("");
    setGalleryImages("");
    setGeneralSetting(true);
    setCatSetting(false);
    setLocationSetting(false);
    setActiveSteps(false);
    setAmenities(false);
    setOtherAmenities(false);
    setShowModal(false);
    setPropertyType("");
    setTitle("");
    setDescription("");
    setPrice("");
    setLocality("");
    setGoogleMapLink("");
    setBhkValue("");
    setBathroomValue("");
    setLookingTo("");
    setFurnishType("");
    setBuiltUpArea("");
    setGalleryImages("");
    setPriceText("");
    setPriceRadio(true);
    setEditRadioBtn(false);
    setContentId(null);
    setYouTubeLink("");
    setCity("");
    setCountry("");
    setZipCode("");
    setCity("");
    setAddress("");
    setState("");
  };

  const handleShowAddModal = (id) => {
    setModalHeading("Add " + TitleData?.card_realestates?.visible_name);
    setContentId(id?.id ? id?.id : null);
    setShowModal(true);
  };

  const handleSaveDetails = async () => {
    setShowLoader(true);
    let data = [];
    ContentId !== null
      ? (data = [
          {
            image: Image,
            heading: Title,
            description: Description,
            is_label: PriceRadio ? 0 : 1,
            price: Price,
            label: PriceText,
            currency: MainData?.company_setting?.currency?.id,
            property_type: PropertyType,
            google_address_link: GoogleMapLink,
            bhk: BhkValue,
            bathroom: BathroomValue,
            type: PropertyType,
            looking_for: 1,
            furnish_type: FurnishType,
            area: BuiltUpArea,
            gallery: GalleryImages ? [...GalleryImages] : "",
            youtube_link: YouTubeLink,
            city: City,
            street_address: Address,
            zipcode: ZipCode,
            state: State,
            country: Country,
            amenities: inputList,
            external_area: ExternalBuildUp,
            internal_area: InternalBuildUp,
            saved_realestates: ContentId,
          },
        ])
      : (data = [
          {
            image: Image,
            heading: Title,
            description: Description,
            is_label: PriceRadio ? 0 : 1,
            price: Price,
            label: PriceText,
            currency: MainData?.company_setting?.currency?.id,
            property_type: PropertyType,
            google_address_link: GoogleMapLink,
            bhk: BhkValue,
            bathroom: BathroomValue,
            type: PropertyType,
            looking_for: 1,
            furnish_type: FurnishType,
            area: BuiltUpArea,
            gallery: GalleryImages ? [...GalleryImages] : "",
            youtube_link: YouTubeLink,
            city: City,
            street_address: Address,
            zipcode: ZipCode,
            country: Country,
            state: State,
            amenities: inputList,
            external_area: ExternalBuildUp,
            internal_area: InternalBuildUp,
          },
        ]);
    try {
      // console.log(".....", data);
      // setShowLoader(false);
      // return;
      const response = await Api(CardData, { realestates: data });
      if (response.data.status) {
        setShowLoader(false);
        APIDATA();
        HandleEmptyFeilds();
        handleCanclebtn();
        setPriceRadio(true);
        setGeneralSetting(true);
        setCatSetting(false);
        setLocationSetting(false);
        setContentId(null);
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
      setShowLoader(false);
      if (error?.request?.status === "401") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
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
    setShowLoader(false);
  };

  const handleDelete = ({ id }) => {
    let data = {
      type: 10,
      base: id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteSection, data);
        if (response.data.status) {
          setRealEstateData(Data?.card_realestates);
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const handleDeleteGalleryImages = async (path, type, DataId) => {
    let data = {
      type: type,
      file_url: path,
      obj_base: DataId,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(99 171 187)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await Api(deleteFiles, data);
        if (response.data.status) {
          Swal.fire("Deleted!", "", "success");
          APIDATA();
        }
      }
    });
  };

  const handleActive = async () => {
    let titles = [
      {
        name: "card_realestates",
        visible_name: TitleData?.card_realestates?.visible_name,
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
            autoClose: 3000,
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

  const handleChnageTitle = async () => {
    if (RealEstateTitle == "") {
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
        name: "card_realestates",
        visible_name: RealEstateTitle,
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
      toast.error(error.response.data.message, {
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

  const incrementCount = () => {
    setPage((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    LoadMoreFunction();
  }, [Page]);

  const LoadMoreFunction = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_MODE == "development"
        ? `https://dev.popipro.com/api/get-more-items/?card_url=${card}&type=card_realestates&current_page=${
            Page && Page
          }`
        : `https://admin.popipro.com/api/get-more-items/?card_url=${card}&type=card_realestates&current_page=${
            Page && Page
          }`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    const data = await response.json();
    if (response.ok) {
      setLoadMoreData(data?.data?.next_page_data?.next_page_url);
      data?.data?.categories?.map((item) => {
        setActiveFilter(item?.name);
      });
      Page > 1
        ? setRealEstateData((prevData) => [
            ...prevData,
            ...data?.data?.next_page_data?.data,
          ])
        : setRealEstateData(() => data?.data?.next_page_data?.data);
    }
  };

  const AmenitiesOption = [];
  Data?.amenities &&
    Data?.amenities.map((item) => {
      AmenitiesOption.push({
        amenities_id: item.id,
        value: item.id,
        label: item.name,
      });
    });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const OtherAmenitiesOption = [];
  Data?.secondary_amenities &&
    Data?.secondary_amenities.map((item) => {
      OtherAmenitiesOption.push({
        amenities_id: item.id,
        value: item.id,
        label: item.name,
      });
    });

  const handleInputChange2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList2];
    list[index][name] = value;
    setInputList2(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { amenities_id: "", description: "" }]);
  };

  const handleAddClick2 = () => {
    setInputList2([...inputList2, { amenities_id: "", description: "" }]);
  };

  const handleDeleteAmeities = async (realestate_id, amenitiesId, index) => {
    if (amenitiesId) {
      const res = await Api(
        DeleteAmenities,
        {},
        "?realestate_id=" + realestate_id + "&amenity_id=" + amenitiesId
      );
      if (res.data.status) {
        const list = [...inputList];
        const remove = list.filter(
          (_, indexFilter) => !(indexFilter === index)
        );
        setInputList(remove);
        APIDATA();
        setRealEstateData(Data?.card_realestates);
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
      } else {
        const list = [...inputList];
        const remove = list.filter(
          (_, indexFilter) => !(indexFilter === index)
        );
        setInputList(remove);
      }
    } else {
      const list = [...inputList];
      const remove = list.filter((_, indexFilter) => !(indexFilter === index));
      setInputList(remove);
    }
  };

  const handleRealEstateBtn = async (type) => {
    try {
      const response = await Api(ToogleRealEstateBtn, {}, "?type=" + type);
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
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
    <>
      {/* <SimpleBackdrop visible={ShowLoader} /> */}
      <Modal show={show} onHide={() => setshow(false)} centered>
        <Modal.Header>
          <Modal.Title>
            <h5 className="title title--h1 first-title title__separate mb-1">
              Real Estate
            </h5>
          </Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setshow(false)}
          >
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body style={{ padding: "20px" }}>
          {Data?.card_realestates &&
            Data?.card_realestates?.map((items, index) => {
              return items?.id === ContentId ? (
                <div key={index}>
                  <SwiperComponent
                    slidesPerView={1}
                    spaceBetween={10}
                    style={{ cursor: "pointer" }}
                    className="mySwiper"
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                  >
                    {items?.youtube_link !== null ? (
                      <SwiperSlide>
                        <div className="swiper-slide review-items position-relative mb-2">
                          <div className="vedio-height">
                            <div className="product-video-player-container">
                              <ReactPlayer
                                url={items?.youtube_link}
                                controls
                                width="560"
                                height="315"
                              />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ) : (
                      ""
                    )}
                    <SwiperSlide>
                      <div className="swiper-slide review-items position-relative">
                        <img
                          src={
                            items?.image?.path
                              ? Data?.base_url + items?.image?.path
                              : "../static/img/picture-1.jpg"
                          }
                          alt="realestate_image"
                          className="realEstateImage w-100 object-fit-cover"
                        />
                      </div>
                    </SwiperSlide>
                    {items?.gallery &&
                      items?.gallery?.map((i, o) => {
                        return (
                          <SwiperSlide key={o}>
                            <div className="swiper-slide review-items position-relative">
                              <img
                                src={Data?.base_url + i?.path}
                                alt="realestate_image"
                                className="realEstateImage w-100 object-fit-cover"
                              />
                            </div>
                          </SwiperSlide>
                        );
                      })}
                  </SwiperComponent>

                  <div className="mt-2 color-black mb-3">
                    <h5 className="mb-0 color-black cursor-pointer d-flex align-items-center justify-content-between">
                      {items?.heading}
                      <span className="real-estate-badge">
                        {items?.property_type?.name}
                      </span>
                    </h5>

                    <div
                      className="d-flex flex-wrap mt-3 amenities-main-section w-100"
                      style={{ gap: "10px", lineHeight: "0" }}
                    >
                      {items?.amenities &&
                        items?.amenities?.map((amenities, key) => {
                          return key < 4 ? (
                            <div
                              className="d-flex align-items-baseline amenities-div"
                              key={key}
                            >
                              <span
                                style={{ fontSize: "16px" }}
                                dangerouslySetInnerHTML={{
                                  __html: amenities.icon,
                                }}
                              ></span>
                              <p className="pl-2 color-black">
                                {amenities?.pivot?.description}
                              </p>
                            </div>
                          ) : (
                            ""
                          );
                        })}
                    </div>

                    <div
                      className="mt-3 mb-2 d-flex flex-wrap align-items-center justify-content-between"
                      style={{ gap: "10px" }}
                    >
                      {items.is_label !== 0 ? (
                        <span className="font-weight-bold VarColor real-estate-price">
                          {items?.label}
                        </span>
                      ) : (
                        <p className="font-weight-bold VarColor real-estate-price">
                          {MainData?.company_setting?.currency?.currency}{" "}
                          {items?.price}
                        </p>
                      )}
                    </div>

                    <a
                      href={items?.google_address_link}
                      target="_blank"
                      className="color-black cursor-pointer mt-2 font-weight-bold"
                    >
                      {items?.street_address}, {items?.city}, {items?.state},{" "}
                      {items?.country}, ({items?.zipcode})
                    </a>

                    <p className="mt-3 font-weight-bold">
                      Total Build Up Area: {items?.area} SQM{" "}
                      {items?.internal_area &&
                        ", Land Size: " + items?.internal_area + "SQM"}{" "}
                      {items?.external_area &&
                        ", Property Size: " + items?.external_area + "SQM"}
                    </p>

                    <p
                      className="mt-3 content_description"
                      dangerouslySetInnerHTML={{
                        __html: items.description,
                      }}
                    ></p>

                    {items?.amenities?.length > 3 ? (
                      <div
                        className="d-flex flex-column mt-3 amenities-main-section w-100"
                        style={{ gap: "10px", lineHeight: "0" }}
                      >
                        {items?.amenities &&
                          items?.amenities?.map((amenities, key) => {
                            return key > 3 ? (
                              <div
                                className="d-flex align-items-baseline amenities-div"
                                key={key}
                              >
                                <span
                                  style={{ fontSize: "16px" }}
                                  dangerouslySetInnerHTML={{
                                    __html: amenities.icon,
                                  }}
                                ></span>
                                <p className="pl-2 color-black">
                                  {amenities?.pivot?.description}
                                </p>
                              </div>
                            ) : (
                              ""
                            );
                          })}
                      </div>
                    ) : (
                      ""
                    )}

                    <div
                      className="mt-4 w-100 real-estate-modal-buttons"
                      style={{ gap: "5px" }}
                    >
                      <div
                        className="d-flex flex-wrap align-items-center justify-content-center"
                        style={{ gap: "10px" }}
                      >
                        {items?.google_address_link && (
                          <a
                            href={
                              items?.google_address_link?.includes(
                                "https://"
                              ) ||
                              items?.google_address_link?.includes("http://")
                                ? "https://" + items?.google_address_link
                                : items?.google_address_link
                            }
                            target="_blank"
                            className="w-30px"
                          >
                            <button className="contact-btn w-100 m-0">
                              <img
                                src="../static/img/location.svg"
                                alt="image"
                                width={14}
                                className="mr-1"
                              />
                              View Location
                            </button>
                          </a>
                        )}

                        {Data?.whatsapp_number &&
                          MainData?.company_setting
                            ?.show_realestate_wp_button !== 0 && (
                            <a
                              href={
                                "https://api.whatsapp.com/send?phone=" +
                                Data?.whatsapp_number +
                                "&" +
                                `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ${items?.name}?`
                              }
                              target="_blank"
                              className="w-30px"
                            >
                              <button className="contact-btn w-100 m-0">
                                <img
                                  src="../static/img/whatsapp.svg"
                                  alt="image"
                                  width={14}
                                  className="mr-1"
                                />
                                WhatsApp
                              </button>
                            </a>
                          )}

                        <button className="contact-btn w-30px m-0">
                          <img
                            src="../static/img/phone.svg"
                            alt="image"
                            width={14}
                            className="mr-1"
                          />
                          Contact Agent
                        </button>

                        {MainData?.company_setting
                          ?.show_realestate_enquiry_button !== 0 ? (
                          <button className="contact-btn w-30px m-0">
                            <img
                              src="../static/img/mail.svg"
                              alt="image"
                              width={14}
                              className="mr-1"
                            />
                            Email
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
        </Modal.Body>
      </Modal>

      <Modal size="md" show={ShowModal} onHide={HandleEmptyFeilds} centered>
        <Modal.Header>
          <Modal.Title>
            <h5
              className="title title--h1 first-title title__separate mb-1 mb-0"
              id="BlogModalTitle"
            >
              {ModalHeading}
            </h5>
          </Modal.Title>
          <button type="button" className="close" onClick={HandleEmptyFeilds}>
            <span aria-hidden="true">×</span>
            <span className="sr-only">Close alert</span>
          </button>
        </Modal.Header>
        <Modal.Body className="position-relative">
          {/* General div */}
          {GeneralSetting ? (
            <>
              <div>
                <div className="tab-progress-bar">
                  <ProgressBar now={25} />
                </div>

                <h6 className="mb-2 color-black pl-2">Basic Details</h6>

                <label className="modalFormLable mt-2">
                  Featured Image* (*Recommended Size 347x160)
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control mb-4 p-1"
                  accept="image/png, image/jpeg"
                  style={{ border: "1px solid #ccc" }}
                  // ref={aRef}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label className="modalFormLable">
                  Upload Upto 3 Images (*Recommended Size 347x160)
                </label>
                <input
                  type="file"
                  name="image"
                  className="form-control mb-4 p-1"
                  accept="image/png, image/jpeg"
                  style={{ border: "1px solid #ccc" }}
                  multiple
                  onChange={(e) => setGalleryImages(e.target.files)}
                  disabled={GalleryImages?.length === 3 ? true : false}
                />
                {Data?.card_realestates &&
                  Data?.card_realestates?.map((items, index) => {
                    return items?.id === ContentId ? (
                      <div className="d-flex flex-wrap gap-2 px-2" key={index}>
                        {items?.gallery &&
                          items?.gallery?.map((i, o) => {
                            return (
                              <div
                                className="real-estate-edit-modal position-relative mb-4"
                                key={o}
                              >
                                <FontAwesomeIcon
                                  icon={faCircleXmark}
                                  onClick={() =>
                                    handleDeleteGalleryImages(
                                      i?.path,
                                      12,
                                      items?.id
                                    )
                                  }
                                  style={{
                                    color: "rgb(213, 51, 51)",
                                    fontSize: "20px",
                                  }}
                                  className="delete-icon3"
                                />
                                <img
                                  src={Data?.base_url + i?.path}
                                  alt="realestate_image"
                                  className="edit-real-estate-images object-fit-cover"
                                />
                              </div>
                            );
                          })}
                      </div>
                    ) : (
                      ""
                    );
                  })}
                <label className="modalFormLable">Title*</label>
                <input
                  className="form-control mb-4 mt-1"
                  defaultValue={Title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value.trim())}
                  maxLength="200"
                ></input>
                <div className="d-flex align-items-baseline gap-2 mb-4">
                  <div className="w-100">
                    <label className="modalFormLable">Property Type*</label>
                    <select
                      style={{
                        height: "45px",
                        padding: "6px 18px",
                        background: "#f7f9fa",
                        appearance: "auto",
                      }}
                      onChange={(e) => setPropertyType(e.target.value)}
                      defaultValue={PropertyType || ""}
                      className="mt-1"
                    >
                      <option value="">Select property type</option>
                      {Data?.property_type &&
                        Data?.property_type?.map((item, index) => {
                          return (
                            <option value={item?.id} key={index}>
                              {item?.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className="w-100">
                    <label className="modalFormLable">
                      Upload Youtube Video URL
                    </label>
                    <input
                      type="url"
                      name="name"
                      rows="4"
                      cols="50"
                      className="form-control mt-1"
                      value={YouTubeLink}
                      placeholder="Video Url"
                      onChange={(e) => setYouTubeLink(e.target.value)}
                    ></input>
                  </div>
                </div>

                <label className="modalFormLable">Description*</label>
                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    removePlugins: [
                      "EasyImage",
                      "ImageUpload",
                      "MediaEmbed",
                      "Table",
                      "TableToolbar",
                      "Indent",
                      "BlockQuote",
                      "Emoji",
                    ],
                    placeholder:
                      "Insert a text and take advantage of AI to enrich the content you've written.",
                    link: {
                      decorators: {
                        addTargetToExternalLinks: {
                          mode: "automatic",
                          callback: (url) => /^(https?:)?\/\//.test(url),
                          attributes: {
                            target: "_blank",
                            rel: "noopener noreferrer",
                          },
                        },
                      },
                    },
                  }}
                  data={Description || ""}
                  onReady={(editor) => {}}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onBlur={(event, editor) => {}}
                  onFocus={(event, editor) => {}}
                />
              </div>
              <div
                className="d-flex align-items-center mt-3 justify-content-end"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings2()}>
                  Next
                </button>
              </div>
            </>
          ) : (
            ""
          )}

          {/* property details */}
          {CatSetting ? (
            <div className="w-100">
              <div className="tab-progress-bar">
                <ProgressBar now={50} />;
              </div>

              <h6 className="mb-2 color-black pl-2">Property Details</h6>

              <label className="modalFormLable mt-2">Address*</label>
              <input
                type="text"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                defaultValue={Address}
                placeholder="Locality/Address"
                onChange={(e) => setAddress(e.target.value.trim())}
              ></input>
              <div className="row">
                <div className="col-6">
                  <label className="modalFormLable mt-2">City*</label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-100"
                    defaultValue={City}
                    placeholder="Locality/Address"
                    onChange={(e) => setCity(e.target.value.trim())}
                  ></input>
                </div>
                <div className="col-6">
                  <label className="modalFormLable mt-2">State*</label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-100"
                    defaultValue={State}
                    placeholder="Locality/Address"
                    onChange={(e) => setState(e.target.value.trim())}
                  ></input>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label className="modalFormLable mt-2">Country*</label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-100"
                    defaultValue={Country}
                    placeholder="Locality/Address"
                    onChange={(e) => setCountry(e.target.value)}
                  ></input>
                </div>
                <div className="col-6">
                  <label className="modalFormLable mt-2">Zip Code*</label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1 w-100"
                    defaultValue={ZipCode}
                    placeholder="Locality/Address"
                    onChange={(e) => setZipCode(e.target.value)}
                  ></input>
                </div>
              </div>

              <div className="d-flex align-items-baseline gap-2 mt-2 mb-4">
                <div className="w-100">
                  <label className="modalFormLable">
                    Built Up Area* (SQM/ Yard/ Feet)
                  </label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mt-1 w-100"
                    value={BuiltUpArea}
                    placeholder="Area"
                    onChange={(e) => setBuiltUpArea(e.target.value.trim())}
                  ></input>
                </div>
                <div className="w-100">
                  <label className="modalFormLable">
                    Land Size (SQM/ Yard/ Feet)
                  </label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mt-1 w-100"
                    value={InternalBuildUp}
                    placeholder="Area"
                    onChange={(e) => setInternalBuildUp(e.target.value.trim())}
                  ></input>
                </div>
              </div>

              <div className="d-flex align-items-baseline gap-2 mt-2 mb-4">
                <div className="w-100">
                  <label className="modalFormLable">
                    Property Size (SQM/ Yard/ Feet)
                  </label>
                  <input
                    type="text"
                    name="name"
                    rows="4"
                    cols="50"
                    className="form-control mt-1 w-100"
                    value={ExternalBuildUp}
                    placeholder="Area"
                    onChange={(e) => setExternalBuildUp(e.target.value.trim())}
                  ></input>
                </div>
                <div className="w-100">
                  <label className="modalFormLable">Furnish Type</label>
                  <select
                    style={{
                      height: "49px",
                      padding: "6px 18px",
                      background: "#f7f9fa",
                      appearance: "auto",
                    }}
                    onChange={(e) => setFurnishType(e.target.value)}
                    defaultValue={FurnishType || ""}
                    className="mt-1"
                  >
                    <option value="">Select furnish type</option>
                    {Data?.furnish_type &&
                      Data?.furnish_type?.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <label className="modalFormLable">Google Map Address</label>
              <input
                type="text"
                name="name"
                rows="4"
                cols="50"
                className="form-control mb-4 mt-1 w-100"
                value={GoogleMapLink}
                placeholder="Google map link"
                onChange={(e) => setGoogleMapLink(e.target.value.trim())}
              ></input>
              <div
                className="d-flex align-items-center mt-3 justify-content-between"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings1()}>
                  Back
                </button>
                <button className="send-btnn" onClick={() => handleSettings3()}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* price div */}
          {LocationSetting ? (
            <div className="mt-0">
              <div className="tab-progress-bar">
                <ProgressBar now={75} />;
              </div>
              <h6 className="mb-3 color-black pl-1">Price Details</h6>
              <div className="d-flex align-items-center mb-3 mt-1 ml-2">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    id="price"
                    name="product"
                    value={0}
                    checked={PriceRadio}
                    onChange={(e) => handleRadioBTN(e.target.value)}
                  />{" "}
                  <label htmlFor="price" className="ml-2 mb-0">
                    Show Price
                  </label>
                </div>
                <div className="d-flex align-items-center ml-3">
                  <input
                    type="radio"
                    id="css"
                    name="product"
                    value={1}
                    onChange={(e) => handleLabelRadio(e.target.value)}
                    checked={EditRadioBtn == 1 ? true : false}
                  />{" "}
                  <label htmlFor="css" className="ml-2 mb-0">
                    Show Text
                  </label>
                </div>
              </div>
              {PriceRadio ? (
                <div className="mt-2">
                  <label className="modalFormLable">Price</label>
                  <div className="d-flex" style={{ gap: "10px" }}>
                    <input
                      type="text"
                      name="price"
                      rows="4"
                      cols="50"
                      className="form-control mb-4 mt-1"
                      value={MainData?.company_setting?.currency?.currency}
                      placeholder="Price"
                      readOnly
                      maxLength="10"
                    ></input>
                    <input
                      type="number"
                      name="price"
                      rows="4"
                      cols="50"
                      className="form-control mb-4 mt-1"
                      value={Price}
                      placeholder="Price"
                      onChange={(e) => setPrice(e.target.value)}
                      maxLength="10"
                    ></input>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="modalFormLable">Text</label>
                  <input
                    type="text"
                    name="price"
                    rows="4"
                    cols="50"
                    className="form-control mb-4 mt-1"
                    value={PriceText}
                    placeholder="Text"
                    onChange={(e) => setPriceText(e.target.value)}
                    maxLength="12"
                  ></input>
                </div>
              )}
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings2()}>
                  Back
                </button>
                <button className="send-btnn" onClick={() => handleSettings4()}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* amenities */}
          {Amenities ? (
            <div>
              <div className="tab-progress-bar">
                <ProgressBar now={80} />;
              </div>
              <h6 className="mb-2 color-black pl-1">Main Amenities</h6>
              {inputList?.map((x, i) => {
                return (
                  <div
                    className="d-flex align-items-center row position-realtive"
                    key={i}
                  >
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="amenities-delete-icon"
                      onClick={() =>
                        handleDeleteAmeities(ContentId, x.amenities_id, i)
                      }
                    />
                    <div className="col-6">
                      <label className="modalFormLab  le mt-2">
                        Select Amenities*
                      </label>
                      <select
                        onChange={(e) => handleInputChange(e, i)}
                        name="amenities_id"
                        style={{
                          appearance: "auto",
                        }}
                        defaultValue={x.amenities_id}
                      >
                        <option value="">Select Amenities</option>
                        {AmenitiesOption?.map((item, o) => {
                          return (
                            <option value={item?.value} key={o}>
                              {item?.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="modalFormLable mt-2">Quantity</label>
                      <input
                        type="number"
                        name="description"
                        rows="4"
                        cols="50"
                        className="form-control mt-1"
                        defaultValue={x.description}
                        onChange={(e) => handleInputChange(e, i)}
                        placeholder="Enter number of amenities"
                        maxLength={40}
                      ></input>
                    </div>
                  </div>
                );
              })}
              <div className="text-right">
                <button onClick={handleAddClick} className="send-btnn mb-0">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add More
                  Amenities
                </button>
              </div>

              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings3()}>
                  Back
                </button>
                <button className="send-btnn" onClick={() => handleSettings5()}>
                  Next
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          {OtherAmenities ? (
            <div>
              <div className="tab-progress-bar">
                <ProgressBar now={100} />;
              </div>
              <h6 className="mb-2 color-black pl-1">Other Amenities</h6>
              {inputList2?.map((x, i) => {
                return (
                  <div
                    className="d-flex align-items-center row position-realtive"
                    key={i}
                  >
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="amenities-delete-icon"
                      onClick={() =>
                        handleDeleteAmeities(ContentId, x.amenities_id, i)
                      }
                    />
                    <div className="col-6">
                      <label className="modalFormLab  le mt-2">
                        Select Amenities*
                      </label>
                      <select
                        onChange={(e) => handleInputChange2(e, i)}
                        name="amenities_id"
                        style={{
                          appearance: "auto",
                        }}
                        defaultValue={x.amenities_id}
                      >
                        <option value="">Select Amenities</option>
                        {OtherAmenitiesOption?.map((item, o) => {
                          return (
                            <option value={item?.value} key={o}>
                              {item?.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <div className="col-6">
                      <label className="modalFormLable mt-2">Quantity</label>
                      <input
                        type="number"
                        name="description"
                        rows="4"
                        cols="50"
                        className="form-control mt-1"
                        defaultValue={x.description}
                        onChange={(e) => handleInputChange2(e, i)}
                        placeholder="Enter number of amenities"
                        maxLength={40}
                      ></input>
                    </div>
                  </div>
                );
              })}
              <div className="text-right">
                <button onClick={handleAddClick2} className="send-btnn mb-0">
                  <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add More
                  Amenities
                </button>
              </div>

              <div
                className="d-flex align-items-center justify-content-between"
                style={{ gap: "10px" }}
              >
                <button className="send-btnn" onClick={() => handleSettings4()}>
                  Back
                </button>
                {!ShowLoader ? (
                  <button
                    className="send-btnn"
                    onClick={() => handleSaveDetails()}
                  >
                    Save and close
                  </button>
                ) : (
                  <button class="send-btnn" disabled>
                    <FontAwesomeIcon icon={faSpinner} className="spinner-fa" />
                    <LoadingText />
                  </button>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal.Body>
      </Modal>

      <div className="position-relative">
        {Data ? (
          <EditPlan
            Data={Data}
            PlanData={PlanData}
            APIDATA={APIDATA}
            MainData={MainData}
          />
        ) : (
          ""
        )}
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
                ></input>
              ) : (
                <>
                  <h1 className="title title--h1 first-title title__separate">
                    {RealEstateTitle}
                  </h1>
                </>
              )}
              {TitleData?.card_realestates?.source == "2" &&
              PlanData?.is_expired == false &&
              PlanData?.subscription?.plan_id !== 1 ? (
                <>
                  <div className="web-edit-icons">
                    <div className="d-flex align-items-center">
                      <div className="wrapper">
                        <div className="tooltip">
                          Use this section as upload and show your property for
                          the sell.
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

                      <button
                        className="addmore"
                        onClick={() => handleShowAddModal()}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>

                      <label className="switch">
                        <input
                          data-status={TitleData.card_blogs?.is_active}
                          data-active={Active}
                          checked={Active}
                          type="checkbox"
                          onChange={() => handleActive()}
                        />
                        <span className="slider round"></span>
                      </label>
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
                        Active={Active}
                        handleActive={handleActive}
                        setEditFields={setEditFields}
                        AddTitle={
                          "Add " + TitleData?.card_realestates?.visible_name
                        }
                        handleShowAddModal={handleShowAddModal}
                        setTooltipIsOpen={setTooltipIsOpen}
                        message="Use this section as upload and show your property for
                        the sell."
                        tooltipIsOpen={tooltipIsOpen}
                      />
                    )}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            {RealEstateData?.length === 0 ? (
              <p>Real Estate are empty, to add click on the add icon.</p>
            ) : (
              RealEstateData &&
              RealEstateData.map((items, index, { length }) => {
                return (
                  <div key={index}>
                    <div className="row realestaterow">
                      <div className="col-lg-4 col-sm-12 mb-2">
                        <div className="position-relative mb-2">
                          <img
                            src={
                              items?.image?.path
                                ? Data?.base_url + items?.image?.path
                                : "../static/img/picture-1.jpg"
                            }
                            alt="realestate_image"
                            className="realEstateImage w-100"
                          />
                        </div>
                        <div
                          className="mt-3 d-flex align-items-center justify-content-between cursor-pointer"
                          onClick={() => handleShowDetailModal(items?.id)}
                        >
                          <p>
                            {items?.gallery?.length ? (
                              <span class="VarColor font-weight-bold text-decoration-underline">
                                More Images
                              </span>
                            ) : (
                              ""
                            )}
                          </p>
                          <p className="mobile-real-estate-price">
                            {items.is_label !== 0 ? (
                              <span className="font-weight-bold VarColor">
                                {items?.label}
                              </span>
                            ) : (
                              <span className="font-weight-bold VarColor">
                                {MainData?.company_setting?.currency?.currency}{" "}
                                {items?.price}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-8 col-sm-12">
                        <div className="mt-2 cursor-pointer">
                          <h6
                            className="mb-0 color-black cursor-pointer d-flex align-items-center justify-content-between real-estate-heading"
                            onClick={() => handleShowDetailModal(items?.id)}
                          >
                            {items?.heading}
                            <span className="real-estate-badge">
                              {items?.property_type?.name}
                            </span>
                          </h6>
                          <p
                            className="color-black cursor-pointer mt-2"
                            onClick={() => handleShowDetailModal(items?.id)}
                          >
                            {items?.street_address}, {items?.city},{" "}
                            {items?.state}, {items?.country}
                          </p>
                        </div>
                        <div
                          className="mt-2 d-flex flex-wrap align-items-center justify-content-between"
                          style={{ gap: "10px" }}
                        >
                          {items.is_label !== 0 ? (
                            <span className="font-weight-bold VarColor web-real-estate-price">
                              {items?.label}
                            </span>
                          ) : (
                            <p className="font-weight-bold VarColor web-real-estate-price">
                              {MainData?.company_setting?.currency?.currency}{" "}
                              {items?.price}
                            </p>
                          )}
                        </div>
                        <div className="d-flex align-items-center flex-wrap mt-2 amenities-main-section">
                          {items?.amenities &&
                            items?.amenities?.map((amenities, key) => {
                              return key < 4 ? (
                                <div
                                  className="d-flex align-items-baseline amenities-div"
                                  key={key}
                                >
                                  <span
                                    style={{ fontSize: "16px" }}
                                    dangerouslySetInnerHTML={{
                                      __html: amenities.icon,
                                    }}
                                  ></span>
                                  <p className="pl-2 color-black">
                                    {amenities?.pivot?.description}
                                  </p>
                                </div>
                              ) : (
                                ""
                              );
                            })}
                          {/* <div className="d-flex align-items-baseline amenities-div">
                            <span style={{ fontSize: "16px" }}>
                              <svg
                                id="a"
                                data-name="Layer 1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="8mm"
                                height="8.005mm"
                                viewBox="0 0 22.677 22.691"
                              >
                                <rect
                                  x="2.24"
                                  y="2.094"
                                  width="18.197"
                                  height="18.504"
                                  fill="none"
                                  stroke="#1f1d1e"
                                  stroke-miterlimit="10"
                                  stroke-width=".6"
                                ></rect>
                                <g>
                                  <line
                                    x1="5.59"
                                    y1="5.444"
                                    x2="17.151"
                                    y2="17.005"
                                    fill="none"
                                    stroke="#1f1d1e"
                                    stroke-miterlimit="10"
                                    stroke-width=".6"
                                  ></line>
                                  <polygon
                                    points="5.26 8.585 5.86 8.564 5.752 5.607 8.709 5.715 8.73 5.115 5.129 4.984 5.26 8.585"
                                    fill="#1f1d1e"
                                    stroke-width="0"
                                  ></polygon>
                                  <polygon
                                    points="14.01 17.335 14.031 16.734 16.987 16.843 16.879 13.886 17.48 13.865 17.61 17.466 14.01 17.335"
                                    fill="#1f1d1e"
                                    stroke-width="0"
                                  ></polygon>
                                </g>
                              </svg>
                            </span>
                            <p className="pl-2 color-black">
                              {items?.area}
                            </p>
                          </div> */}
                        </div>
                        <div
                          className="mt-3 d-flex flex-wrap align-items-center justify-content-between"
                          style={{ gap: "10px" }}
                        >
                          <div
                            className="d-flex flex-wrap"
                            style={{ gap: "10px" }}
                          >
                            {Data?.whatsapp_number &&
                            MainData?.company_setting
                              ?.show_realestate_wp_button !== 0 ? (
                              <a
                                href={
                                  "https://api.whatsapp.com/send?phone=" +
                                  Data?.whatsapp_number +
                                  "&" +
                                  `text=Hey there, I have recently visited your profile on popipro.com. Could you kindly provide additional information about ....?`
                                }
                                target="_blank"
                                className="whatsap-enquiry-view d-flex align-items-center justify-content-center"
                              >
                                <img
                                  src="../static/img/whatsapp.png"
                                  alt="whatsaap"
                                  className="Whatsaapsvg"
                                />
                              </a>
                            ) : (
                              ""
                            )}
                            {MainData?.company_setting
                              ?.show_realestate_enquiry_button !== 0 && (
                              <span
                                data-toggle="modal"
                                data-target="#ProductEnquireModal"
                                className="whatsap-enquiry-view d-flex align-items-center justify-content-center cursor-pointer"
                              >
                                <FontAwesomeIcon
                                  icon={faEnvelope}
                                  className="user-select-auto"
                                />
                              </span>
                            )}
                            {items?.google_address_link !== null ? (
                              <a
                                href={items?.google_address_link}
                                target="_blank"
                                className="whatsap-link-view d-flex align-items-center justify-content-center"
                              >
                                <FontAwesomeIcon
                                  icon={faLocationDot}
                                  className="user-select-auto"
                                />
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="user-select-auto mr-2 viewmore-btn-product cursor-pointer"
                            onClick={() => handleShowDetailModal(items?.id)}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        index + 1 === length
                          ? "d-flex align-items-center justify-content-start gap-2 mt-1 pb-4 mb-4"
                          : "d-flex align-items-center justify-content-start gap-2 mt-1 pb-4 mb-4 real-estate-border"
                      }
                    >
                      <button
                        className="send-btnn m-0"
                        onClick={() => handleShowModal(items)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button m-0"
                        onClick={() => handleDelete(items)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}

            <div className="mt-4">
              <h6 className="font-weight-bold">
                How you want to receive inquiry:
              </h6>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="real-estate-whatsaap"
                  className="mt-1"
                  value={
                    MainData?.company_setting?.show_realestate_wp_button !== 0
                      ? true
                      : false
                  }
                  onChange={() => handleRealEstateBtn("wp")}
                  checked={
                    MainData?.company_setting?.show_realestate_wp_button !== 0
                      ? true
                      : false
                  }
                />
                <label
                  for="real-estate-whatsaap"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via whatsaap only?
                </label>
              </div>
              <div className="d-flex align-items-start">
                <input
                  type="checkbox"
                  id="real-estate-enq"
                  className="mt-1"
                  value={
                    MainData?.company_setting
                      ?.show_realestate_enquiry_button !== 0
                      ? true
                      : false
                  }
                  onChange={() => handleRealEstateBtn("enq")}
                  checked={
                    MainData?.company_setting
                      ?.show_realestate_enquiry_button !== 0
                      ? true
                      : false
                  }
                />
                <label
                  for="real-estate-enq"
                  className="ml-2 Varcolor font-weight-bold"
                >
                  Via enquiry form?
                </label>
              </div>
            </div>

            {PaginationData?.total_realestate ==
              Data?.card_realestates?.length &&
            LoadMoreData !== null &&
            Data?.card_realestates?.length !== 0 ? (
              <div className="mx-auto text-center pt-2">
                <a
                  className="text-center cursor-pointer mx-auto"
                  style={{
                    textDecoration: "underline",
                    fontSize: "16px",
                    color: "var(--color)",
                  }}
                  onClick={() => incrementCount()}
                >
                  Load More
                </a>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
