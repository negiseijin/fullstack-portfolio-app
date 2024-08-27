import type React from "react";
import { useState } from "react";

type Props = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

export function Image({ src, alt, width, height, className }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200" // プレースホルダーの色
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        // {...rest}
      />
    </div>
  );
}
