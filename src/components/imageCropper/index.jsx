import React, { useCallback, useEffect, useState } from "react";
import { FilledButton } from "@components/button";
import DialogBox from "@components/dialogBox";
import { Box, Slider } from "@mui/material";
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
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(1); // Added aspect state
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

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
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
  }, [croppedAreaPixels, image]);
  const onZoomChange = (zoom, _) => {
    setZoom(zoom);
  };
  const onAspectChange = (aspect, _) => {
    setAspect(aspect);
  };
  return (
    <DialogBox
      open={open}
      handleClose={handleClose}
      sx={{ "& .MuiPaper-root": { background: "#fff" } }}
    >
      <div>
        <div className={`${styles.cropper_height}`}>
          {imageSrc && (
            <Box
              sx={{
                "& .reactEasyCrop_Container": { maxHeight: "70%" },
                "& .reactEasyCrop_CropArea": {
                  boxShadow: "none",
                  border: "4px solid #EEA23D",
                },
              }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                showGrid={false}
                onCropChange={onCropChange}
                onCropComplete={onCropComplete}
                onZoomChange={onZoomChange}
                width={"250px"}
                height={"250px"}
              />
            </Box>
          )}
        </div>
        <div className="controls">
          <label>
            Zoom
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onChange={(_, zoom) => setZoom(zoom)}
              className="range"
            />
          </label>
          <label>
            Aspect
            <Slider
              value={aspect}
              min={1}
              max={3}
              step={0.01}
              aria-labelledby="aspect"
              onChange={(_, zoom) => onAspectChange(zoom)}
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
