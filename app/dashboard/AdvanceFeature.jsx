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
                    onClick={() => !in_Plan && setModalShow("digitalCard")}
                >
                    {Data && (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
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
                        in_Plan
                            ? "https://www.popipro.com/order"
                            : "/email-signature"
                    }
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
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
                        in_Plan
                            ? "https://www.popipro.com/order"
                            : "/virtual-background"
                    }
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
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
                        in_Plan
                            ? "https://www.popipro.com/order"
                            : "/contacts"
                    }
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
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
                    onClick={() => !in_Plan && setModalShow("selfBranding")}
                >
                    {Data && (
                        <DashboardPlan
                            Data={Data}
                            PlanData={PlanData}
                            APIDATA={APIDATA}
                            MainData={MainData}
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
                        in_Plan
                            ? "https://www.popipro.com/order"
                            : "/to-do"
                    }
                    className="w-100  text-decoration-none"
                >
                    <div className="dashboard-boxes d-flex justify-content-center align-items-center flex-column">
                        {Data ? (
                            <DashboardPlan
                                Data={Data}
                                PlanData={PlanData}
                                APIDATA={APIDATA}
                                MainData={MainData}
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
