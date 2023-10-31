import { useCallback, useState } from "react";
import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";

const EasyCrop = ({
  image,
  setCroppedImage,
  croppedImage,
  showCroppedImage,
  setRotation,
  setZoom,
  onCropComplete,
  setCrop,
  zoom,
  rotation,
  crop,
}) => {
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
      <button
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
          zIndex: "999999999999",
          position: "absolute",
          right: "32px",
          bottom: "95px",
        }}
        onClick={showCroppedImage}
        className="send-btnn"
      >
        Crop
      </button>
      <div
        className="container"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 4}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
        <div className="cropper-controls">
          <label>
            Rotate
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotate"
              onChange={(e, rotation) => setRotation(rotation)}
              className="range"
            />
          </label>
          <label>
            Zoom
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(e, zoom) => setZoom(zoom)}
              className="range"
            />
          </label>
        </div>
      </div>
      <div className="cropped-image-container d-none">
        {croppedImage && (
          <img className="cropped-image" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && <button onClick={onClose}>close</button>}
      </div>
    </div>
  );
};

export default EasyCrop;
