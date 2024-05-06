import { forwardRef, useState } from "react";
import images from "../../assets/images";
const Image = forwardRef(
  ({ src, alt, fallback: CustomFallBack = images.no_img, ...props }, ref) => {
    const [fallback, setFallBack] = useState("");
    const handleError = () => {
      setFallBack(CustomFallBack);
    };
    return (
      <img
        ref={ref}
        alt={alt}
        src={fallback || src}
        {...props}
        onError={handleError}
      />
    );
  }
);

export default Image;
