import Image from "next/image";

const ResponsiveImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  objectFit = "cover",
  objectPosition = "center",
  priority = false,
  quality = 75,
  rounded = "none",
  fill = false,
  sizes,
  loading = "lazy",
  onLoad,
  onError,
  overlay,
  overlayClassName = "",
  overlayPosition = "bottom",
  ...props
}) => {
  // Rounded classes mapping
  const roundedClasses = {
    none: "",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  };

  // Overlay position classes
  const overlayPositionClasses = {
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  };

  const imageClasses = `${roundedClasses[rounded] || rounded} ${className}`;
  const defaultOverlayClasses = `absolute ${overlayPositionClasses[overlayPosition]} bg-gradient-to-t from-black/70 to-transparent p-4 text-white`;

  // Overlay element
  const overlayElement = overlay ? (
    <div className={`${defaultOverlayClasses} ${overlayClassName}`}>
      {overlay}
    </div>
  ) : null;

  // If fill mode is enabled
  if (fill) {
    return (
      <div className={`relative ${overlay ? className : ""}`}>
        <div
          className={`relative ${!overlay ? className : "w-full h-full"}`}
          {...props}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={imageClasses}
            style={{ objectFit, objectPosition }}
            priority={priority}
            quality={quality}
            sizes={sizes || "100vw"}
            loading={loading}
            onLoad={onLoad}
            onError={onError}
          />
        </div>
        {overlayElement}
      </div>
    );
  }

  // Standard mode with width and height
  if (overlay) {
    return (
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          style={{ objectFit, objectPosition }}
          priority={priority}
          quality={quality}
          sizes={sizes}
          loading={loading}
          onLoad={onLoad}
          onError={onError}
          {...props}
        />
        {overlayElement}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={imageClasses}
      style={{ objectFit, objectPosition }}
      priority={priority}
      quality={quality}
      sizes={sizes}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
      {...props}
    />
  );
};

export default ResponsiveImage;
