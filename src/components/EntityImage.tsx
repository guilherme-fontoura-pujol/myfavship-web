import { useState } from "react";
import { getImageUrl } from "../utils/getImageUrl";

interface EntityImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
}

export function EntityImage({
  src,
  alt,
  className,
}: EntityImageProps) {
  const [hasError, setHasError] = useState(false);
  const imageUrl = getImageUrl(src);

  if (!imageUrl || hasError) {
    return (
      <div
        className={`${className ?? ""} image-placeholder`}
        aria-label={`Sem imagem para ${alt}`}
      >
        <span>{alt.charAt(0).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={imageUrl}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}