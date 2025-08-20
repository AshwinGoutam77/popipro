'use client';
import Api from '@services/Api';
import { GeneralSetting } from '@services/Routes';
import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
import { showToast } from './Toast';

export default function SelfBranding({ MainData, handleClose, active }) {
    const [UploadLogo, setUploadLogo] = useState("");
    const [BannerImage, setBannerImage] = useState("");
    const [CoverLabel, setCoverLabel] = useState("")
    const [CardCover, setCardCover] = useState(null)

    const handleSave = async () => {
        try {
            const payload = {
                banner: BannerImage,
                logo: UploadLogo,
                cover_label: CoverLabel,
                card_cover: CardCover
            };

            const res = await Api(GeneralSetting, payload);

            if (res?.data?.status) {
                handleClose();
                showToast(res.data.message, "success");
            } else {
                showToast(res?.data.message, "error");
            }
        } catch (error) {
            console.log(error);
            showToast(error.res?.data.message || "An error occurred", "error");
        }
    };

    useEffect(() => {
        setCardCover(MainData?.card?.card_cover)
        setCoverLabel(MainData?.card?.cover_label)
    }, [])
    return (
        <Modal size="md" show={active} onHide={() => handleClose("")} centered>
            <Modal.Header>
                <Modal.Title>
                    <h5
                        className="title title--h1 first-title title__separate mb-0"
                        id="BlogModalTitle"
                    >
                        Self Branding
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
                <ul className='p-0 m-0'>
                    <>
                        <label>Select profile image </label>
                        <li className="border-bottom pb-4 mt-2 list-style-none d-flex flex-wrap row-gap-4 justify-content-start gap-4">
                            {[
                                { id: "label", label: "Label", name: "cardCover", img: "../../static/img/self-branding-img-1.png" },
                                { id: "banner", label: "Banner", name: "cardCover", img: "../../static/img/self-branding-img-2.png" },
                                { id: "logo", label: "Logo", name: "cardCover", img: "../../static/img/self-branding-img-3.png" },
                                { id: "banner-logo", label: "Banner + Logo", name: "cardCover", img: "../../static/img/self-branding-img-4.png" },
                                { id: "banner-label", label: "Banner + Label", name: "cardCover", img: "../../static/img/self-branding-img-5.png" },
                            ].map(({ id, name, label, img }) => (
                                <div key={id} className="d-flex flex-column align-items-center">
                                    <label htmlFor={id} className="cursor-pointer text-center">
                                        <img
                                            src={img}
                                            alt={label}
                                            width="130"
                                            height="130"
                                            className={`mb-2 border ${CardCover === id ? "border-primary" : ""}`}
                                            style={{ borderRadius: "16px" }}
                                        />
                                        <br />
                                        {label}
                                    </label>
                                    <input
                                        type="radio"
                                        id={id}
                                        name={name}
                                        value={id}
                                        checked={CardCover === id}
                                        onChange={(e) => setCardCover(e.target.value)}
                                        className="d-none"
                                    />
                                </div>
                            ))}
                        </li>



                        {(CardCover == "banner" || CardCover == "banner-logo" || CardCover == "banner-label") && <li className="mt-4 list-style-none mb-2">
                            <div>
                                <label className="mb-0 color-black">Upload banner Image</label>
                                <input
                                    type="file"
                                    className="form-control mt-2 w-100"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => setBannerImage(e.target.files[0])}
                                />
                                {MainData?.card.card_header?.banner?.path && <img src={`${MainData?.card.base_url}${MainData?.card.card_header?.banner?.path}`} alt="logo" width="200px" className="mt-3" />}
                            </div>
                        </li>}

                        {(CardCover == "logo" || CardCover == "banner-logo") && < li className="mt-4 list-style-none mb-2">
                            <div>
                                <label className="mb-0 color-black">Upload Logo</label>
                                <input
                                    type="file"
                                    className="form-control mt-2 w-100"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => setUploadLogo(e.target.files[0])}
                                />
                                {MainData?.card.card_header?.logo?.path && <img src={`${MainData?.card.base_url}${MainData?.card.card_header?.logo?.path}`} alt="logo" width="200px" className="mt-3" />}
                            </div>
                        </li>}

                        {(CardCover == "label" || CardCover == "banner-label") && <li className="mt-4 list-style-none mb-2">
                            <div>
                                <label className="mb-0 color-black">label</label>
                                <input
                                    type="text"
                                    placeholder="Enter label"
                                    className="form-control mt-2 w-100"
                                    value={CoverLabel}
                                    onChange={(e) => setCoverLabel(e.target.value)}
                                />
                            </div>
                        </li>}
                    </>
                </ul>
                <button
                    className="contact-btn w-auto bg-btn7 lnk wow fadeInUp mt-3"
                    style={{ padding: "7px 19px" }}
                    onClick={handleSave}
                >
                    Save
                </button>
                <button
                    className="delete-button w-auto bg-btn7 lnk wow fadeInUp mt-3 ml-2"
                    onClick={handleClose}
                >
                    Cancel
                </button>
            </Modal.Body>
        </Modal>
    )
}
