import DashboardPlan from '@components/Dashboard/DashboardPlan'
import { faAddressBook, faAddressCard, faAward, faTasks } from '@node_modules/@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@node_modules/@fortawesome/react-fontawesome'
import Link from '@node_modules/next/link'
import React from 'react'

export default function AdvanceFeatureData({ setModalShow, TitleData, Data, PlanData, MainData, handleFreeTrail, in_Plan, APIDATA }) {
    return (
        <>
            {/* Digital Cards */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.address_book?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        } else if (MainData?.non_section_feature?.address_book?.in_subscription) {
                            e.preventDefault();
                            setModalShow("digitalCard")
                        }
                    }}
                >
                    {Data && (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
                            in_subscription={MainData?.non_section_feature?.address_book?.in_subscription}
                            can_start_trial={MainData?.non_section_feature?.address_book?.can_start_trial}
                            handleFreeTrail={handleFreeTrail}
                        />
                    )}
                    <FontAwesomeIcon
                        icon={faAddressCard}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                        Download Digital Card
                    </h6>
                </div>
            </div>

            {/* Signature */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.email_signature?.in_subscription
                            ? "/email-signature"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.email_signature?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.email_signature?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.email_signature?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <img
                            src="../static/img/email-signature.svg"
                            alt="image"
                            width={20}
                        />
                        <h6 className="text-white text-center mb-0">
                            Email Signature
                        </h6>
                    </div>
                </Link>
            </div>

            {/* Background */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.virtual_background?.in_subscription
                            ? "/virtual-background"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.virtual_background?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.virtual_background?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.virtual_background?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <img
                            src="../static/img/virtual-bg.svg"
                            alt="image"
                            width={20}
                        />
                        <h6 className="text-white text-center mb-0">
                            Virtual Background
                        </h6>
                    </div>
                </Link>
            </div>

            {/* Address Book */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.address_book?.in_subscription
                            ? "/contacts"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.address_book?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.address_book?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.address_book?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <FontAwesomeIcon
                            icon={faAddressBook}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Address Book
                        </h6>
                    </div>
                </Link>
            </div>

            {/* Self branding */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <div
                    className="dashboard-boxes d-flex justify-content-center align-items-center flex-column"
                    // onClick={() => MainData?.non_section_feature?.self_branding?.in_subscription == true && setModalShow("selfBranding")}
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.self_branding?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        } else if (MainData?.non_section_feature?.self_branding?.in_subscription) {
                            e.preventDefault();
                            setModalShow("selfBranding")
                        }
                    }}
                >
                    {Data && (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
                            in_subscription={MainData?.non_section_feature?.self_branding?.in_subscription}
                            can_start_trial={MainData?.non_section_feature?.self_branding?.can_start_trial}
                            handleFreeTrail={handleFreeTrail}
                        />
                    )}
                    <FontAwesomeIcon
                        icon={faAward}
                        className="text-white mb-2"
                        style={{ fontSize: "20px" }}
                    />
                    <h6 className="text-white text-center mb-0">
                        Self Branding
                    </h6>
                </div>
            </div>

            {/* Todo */}
            <div className="col-6 col-lg-3 col-md-3 mt-0 d-flex justify-content-center">
                <Link
                    href={
                        MainData?.non_section_feature?.address_book?.in_subscription
                            ? "/to-do"
                            : "https://www.popipro.com/order"
                    }
                    onClick={(e) => {
                        if (MainData?.non_section_feature?.address_book?.can_start_trial) {
                            e.preventDefault();
                            handleFreeTrail();
                        }
                    }}
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
                                in_subscription={MainData?.non_section_feature?.address_book?.in_subscription}
                                can_start_trial={MainData?.non_section_feature?.address_book?.can_start_trial}
                                handleFreeTrail={handleFreeTrail}
                            />
                        ) : (
                            ""
                        )}
                        <FontAwesomeIcon
                            icon={faTasks}
                            className="text-white mb-2"
                            style={{ fontSize: "20px" }}
                        />
                        <h6 className="text-white text-center mb-0">
                            Todo
                        </h6>
                    </div>
                </Link>
            </div>
        </>
    )
}
