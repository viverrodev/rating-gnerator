import React from "react";

export type Rating = "S+" | "S" | "A" | "B" | "C" | "D" | "F";

interface RatingSelectorProps {
  selectedRating: Rating;
  onRatingChange: (rating: Rating) => void;
}

const ratings: Rating[] = ["S+", "S", "A", "B", "C", "D", "F"];

const getRatingColor = (rating: Rating): string => {
  switch (rating) {
    case "S+":
      return "text-pink-400 border-pink-400";
    case "S":
      return "text-purple-400 border-purple-400";
    case "A":
      return "text-blue-400 border-blue-400";
    case "B":
      return "text-green-400 border-green-400";
    case "C":
      return "text-yellow-400 border-yellow-400";
    case "D":
      return "text-orange-400 border-orange-400";
    case "F":
      return "text-red-400 border-red-400";
    default:
      return "text-green-400 border-green-400";
  }
};

export const RatingSelector: React.FC<RatingSelectorProps> = ({
  selectedRating,
  onRatingChange,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Background Rating
      </h3>

      <div className="flex flex-wrap gap-3">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => onRatingChange(rating)}
            className={`
              px-4 py-2 rounded-lg border-2 font-bold text-lg transition-all
              ${
                selectedRating === rating
                  ? `${getRatingColor(rating)} bg-gray-700 scale-110`
                  : "text-gray-400 border-gray-600 hover:border-gray-500"
              }
            `}
          >
            {rating}
          </button>
        ))}
      </div>
    </div>
  );
};
