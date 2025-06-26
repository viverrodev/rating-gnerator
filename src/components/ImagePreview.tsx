"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImagePreviewProps {
  item: {
    id: string;
    name: string;
    brand: string;
    image: string;
  };
  type?: string;
  size?: number;
  rotation?: number;
  position?: { top: number; left: number; right: number; bottom: number };
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  item,
  size = 300,
  rotation = 0,
  position = { top: 50, left: 50, right: 0, bottom: 0 },
  type,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="absolute"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        right: `${position.right}px`,
        bottom: `${position.bottom}px`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div className="text-center">
        <div
          style={{ width: `${size}px`, height: `${size}px` }}
          className="rounded-lg mb-4 flex items-center justify-center"
        >
          {hasError ? (
            <div className="text-red-500 bg-black p-2 text-sm font-semibold">
              {type === "GPU" ? "GPU" : "CPU"} Image Not Found
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.name}
              width={size}
              height={size}
              className="object-contain"
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
