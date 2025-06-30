import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Component } from "./LibraryPage";

interface ComponentCardProps {
  component: Component;
  onCopyToClipboard: () => void;
  onDownload: () => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({
  component,
  onCopyToClipboard,
  onDownload,
}) => {
  const getBrandIcon = (brand: string) => {
    if (brand === "intel") {
      return `/icons/${brand}.png`;
    } else if (brand === "amd") {
      return `/icons/${brand}.png`;
    }
    return `/icons/${brand}.svg`;
  };

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case "nvidia":
        return "border-green-500/20 bg-green-500/5";
      case "amd":
        return "border-red-500/20 bg-red-500/5";
      case "intel":
        return "border-blue-500/20 bg-blue-500/5";
      default:
        return "border-gray-500/20 bg-gray-500/5";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "gpu":
        return "bg-purple-600";
      case "cpu":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("[data-download-button]")) {
      return;
    }
    onCopyToClipboard();
  };

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
        relative group cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 
        hover:scale-105
        ${getBrandColor(component.brand)}
      `}
    >
      {/* Type Badge */}
      <div
        className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium text-white ${getTypeColor(
          component.type
        )}`}
      >
        {component.type.toUpperCase()}
      </div>

      {/* Download Button */}
      <Button
        onClick={handleDownloadClick}
        size="icon"
        variant="ghost"
        data-download-button
        className="absolute z-100 top-3 right-3 opacity-0 group-hover:opacity-100  cursor-pointer trasnition-all duration-100 text-white border-gray-600"
      >
        <Download className="w-4 h-4" />
      </Button>

      {/* Component Image */}
      <div className="flex justify-center items-center h-32 mb-4 mt-6">
        <Image
          src={component.image}
          alt={component.name}
          width={120}
          height={120}
          className="object-contain max-h-full max-w-full"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder-component.png"; // Fallback image
          }}
        />
      </div>

      {/* Component Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Image
            src={getBrandIcon(component.brand)}
            alt={component.brand}
            width={16}
            height={16}
            className="flex-shrink-0"
          />
          <span className="text-xs text-gray-400 uppercase font-medium">
            {component.brand}
          </span>
        </div>

        <h3 className="text-sm font-medium text-white leading-tight">
          {component.name}
        </h3>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
        <span className="text-white font-medium bg-black/70 px-3 py-1 rounded-md text-sm">
          Click to copy
        </span>
      </div>
    </div>
  );
};
