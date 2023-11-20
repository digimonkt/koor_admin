import React, { useCallback, useEffect, useState } from "react";
import { FilledButton } from "@components/button";
import DialogBox from "@components/dialogBox";
import { Slider } from "@mui/material";
import Cropper from "react-easy-crop";
import getCroppedImg from "./helper";
import styles from "./styles.module.css";
const fileToDataUri = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
function ImageCropper({ open, handleClose, image, handleSave }) {
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const setImageOnMount = async (image) => {
    const blobImage = await fileToDataUri(image);
    // const dataURL =
    setImageSrc(blobImage);
  };
  useEffect(() => {
    if (image instanceof File) {
      setImageOnMount(image);
    }
  }, [image]);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      const blob = await (await fetch(croppedImage)).blob();
      blob.name = "image.jpeg";
      blob.latModified = new Date();
      const newFile = new File([blob], "image.jpeg", {
        type: blob.type,
      });
      handleSave(newFile);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onZoomChange = (zoom, e) => {
    setZoom(zoom);
  };
  return (
    <DialogBox open={open} handleClose={handleClose}>
      <div>
        <div className={`${styles.cropper_height}`}>
          {imageSrc && (
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              cropShape={"round"}
              aspect={1}
              showGrid={false}
              onCropChange={onCropChange}
              onCropComplete={onCropComplete}
              onZoomChange={onZoomChange}
              cropSize={{ width: 150, height: 150 }}
            />
          )}
        </div>
        <div className="controls">
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

          <FilledButton title="Done" onClick={showCroppedImage} />
        </div>
      </div>
    </DialogBox>
  );
}

export default ImageCropper;
