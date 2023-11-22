import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Realestate() {
  return (
    <div className="box-content boxxx mb-3 mt-0" id="card_realstate">
      <div className="pb-0 pb-sm-2">
        <div className="flex-header">
          <h2 className="title title--h1 first-title title__separate">
            Real Estate
          </h2>
        </div>
        <div className="row realestaterow">
          <div className="col-lg-4 col-sm-12">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Townhouses_in_Victoria_Australia.jpg/800px-Townhouses_in_Victoria_Australia.jpg"
              alt="realestate_image"
              className="realEstateImage w-100"
            />
          </div>
          <div className="col-lg-8 col-sm-12">
            <div className="d-flex align-items-center justify-content-between verify-div-sm">
              <div className="d-flex align-items-center">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123110412icons8-verified-48.png"
                  alt="verify_png"
                  width={15}
                />
                <span
                  className="pl-1"
                  style={{
                    fontSize: "12px",
                    color: "green",
                    paddingTop: "2px",
                  }}
                >
                  Verified
                </span>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className=""
                  style={{ color: "#c7c700", fontSize: "13px" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    paddingTop: "3px",
                  }}
                  className="pl-1"
                >
                  4.5 Rating
                </span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="mb-0 color-black">Emerald Oasis Mansion</h6>
              <p className="color-black">
                2ne Themridge Cr. Syracuse Connecticut 35524
              </p>
            </div>
            <div className="d-flex flex-wrap mt-2" style={{ gap: "10px" }}>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123112440icons8-bedroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">4 Bedroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113010icons8-bathroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">3 Bathroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-garage-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">1 Garage</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-sofa-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">Semi-Furnished</p>
              </div>
            </div>
            <div className="mt-3 d-flex flex-wrap align-items-center justify-content-between" style={{gap:'10px'}}>
              <p className="font-weight-bold color-black">$2000/ per month</p>
              <div>
                <button className="real-map-btn">Open Map</button>
                <button className="real-tour-btn">Visit Tour</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row realestaterow mt-2">
          <div className="col-lg-4 col-sm-12">
            <img
              src="https://prafullgupta.com/connectwork/assets/chat/groups/221123114455images(2).jpg"
              alt="realestate_image"
              className="realEstateImage w-100"
            />
          </div>
          <div className="col-lg-8 col-sm-12">
            <div className="d-flex align-items-center justify-content-between verify-div-sm">
              <div className="d-flex align-items-center">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123110412icons8-verified-48.png"
                  alt="verify_png"
                  width={15}
                />
                <span
                  className="pl-1"
                  style={{
                    fontSize: "12px",
                    color: "green",
                    paddingTop: "2px",
                  }}
                >
                  Verified
                </span>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon
                  icon={faStar}
                  className=""
                  style={{ color: "#c7c700", fontSize: "13px" }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    paddingTop: "3px",
                  }}
                  className="pl-1"
                >
                  4.5 Rating
                </span>
              </div>
            </div>
            <div className="mt-2">
              <h6 className="mb-0 color-black">Paradise Cove Mansion</h6>
              <p className="color-black">
                2ne Themridge Cr. Syracuse Connecticut 35524
              </p>
            </div>
            <div className="d-flex flex-wrap mt-2" style={{ gap: "10px" }}>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123112440icons8-bedroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">4 Bedroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113010icons8-bathroom-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">3 Bathroom</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-garage-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">1 Garage</p>
              </div>
              <div className="d-flex align-items-baseline">
                <img
                  src="https://prafullgupta.com/connectwork/assets/chat/groups/221123113243icons8-sofa-100.png"
                  alt="image"
                  width={15}
                  height={15}
                />
                <p className="pl-2 color-black">Semi-Furnished</p>
              </div>
            </div>
            <div className="mt-3 d-flex flex-wrap align-items-center justify-content-between" style={{gap:'10px'}}>
              <p className="font-weight-bold color-black">$6000/ per month</p>
              <div>
                <button className="real-map-btn">Open Map</button>
                <button className="real-tour-btn">Visit Tour</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
