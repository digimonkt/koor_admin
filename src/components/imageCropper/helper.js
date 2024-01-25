export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  zoom = 1, // default zoom value is 1
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation,
  );

  // Adjust bounding box dimensions based on zoom
  const zoomedWidth = bBoxWidth * zoom;
  const zoomedHeight = bBoxHeight * zoom;

  // set canvas size to match the adjusted bounding box
  canvas.width = zoomedWidth;
  canvas.height = zoomedHeight;

  ctx.translate(zoomedWidth / 2, zoomedHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);

  // Adjust pixelCrop dimensions based on zoom
  const zoomedPixelCrop = {
    x: pixelCrop.x * zoom,
    y: pixelCrop.y * zoom,
    width: pixelCrop.width * zoom,
    height: pixelCrop.height * zoom,
  };

  const data = ctx.getImageData(
    zoomedPixelCrop.x,
    zoomedPixelCrop.y,
    zoomedPixelCrop.width,
    zoomedPixelCrop.height,
  );

  // set canvas size to match the adjusted pixelCrop dimensions
  canvas.width = zoomedPixelCrop.width;
  canvas.height = zoomedPixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
}
