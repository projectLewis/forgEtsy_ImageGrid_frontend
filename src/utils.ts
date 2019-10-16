export const backupImage = (e: any, altSrc?: string) => {
  e.target.onerror = null;
  if (altSrc) {
    e.target.src = altSrc;
  } else {
    e.target.src =
      "https://forgetsygrid.s3.us-east-2.amazonaws.com/brokenImage.png";
  }
};
