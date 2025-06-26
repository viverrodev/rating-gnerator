import React from "react";
import { Rating } from "./RatingSelector";

interface GradientBackgroundProps {
  rating: Rating;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const getGradientStyles = (rating: Rating): React.CSSProperties => {
  switch (rating) {
    case "S+":
      // Holographic/Iridescent - like a rainbow oil slick
      return {
        background:
          "linear-gradient(45deg, #ff0080,  #40e0d0, #ff8c00, #ff1493)",
      };

    case "S":
      // CS:GO Marble Fade inspired
      return {
        background:
          "linear-gradient(135deg, #FF4500 0%, #FF6347 15%, #FF69B4 30%, #9370DB 45%, #4169E1 60%, #1E90FF 75%, #00BFFF 90%, #87CEEB 100%)",
      };

    case "A":
      return {
        background:
          "linear-gradient(135deg, #0077b6, #0096c7, #00b4d8, #90e0ef)",
      };

    case "B":
      return {
        background:
          "linear-gradient(135deg, #2d6a4f, #40916c, #52b788, #74c69d)",
      };

    case "C":
      return {
        background:
          "linear-gradient(135deg, #ff8500, #ffb700, #ffd60a, #fff3b0)",
      };

    case "D":
      return {
        background:
          "linear-gradient(135deg, #d00000, #e85d04, #f48c06, #ffba08)",
      };

    case "F":
      return {
        background: "linear-gradient(135deg, #641220, #85182a, #a4161a)",
      };

    default:
      return {
        background:
          "linear-gradient(135deg, #2d6a4f, #40916c, #52b788, #74c69d)",
      };
  }
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  rating,
  children,
  className = "",
  style,
}) => {
  const gradientStyles = getGradientStyles(rating);

  return (
    <div className={className} style={{ ...gradientStyles, ...style }}>
      {children}
    </div>
  );
};
