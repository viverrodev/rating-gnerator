"use client";

import React, { useState, useMemo } from "react";
import { SearchBar } from "./SearchBar";
import { FilterSection } from "./FilterSection";
import { ComponentCard } from "./ComponentCard";
import { gpuData } from "@/data/gpus";
import { cpuData } from "@/data/cpus";
import { toast } from "sonner";

// Combine GPU and CPU data with type field
const allComponents = [
  ...gpuData.map((gpu) => ({ ...gpu, type: "gpu" as const })),
  ...cpuData.map((cpu) => ({ ...cpu, type: "cpu" as const })),
];

export type Component = (typeof allComponents)[0];

export const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Filter components based on search term, brands, and types
  const filteredComponents = useMemo(() => {
    return allComponents.filter((component) => {
      const matchesSearch = component.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(component.brand);
      const matchesType =
        selectedTypes.length === 0 || selectedTypes.includes(component.type);

      return matchesSearch && matchesBrand && matchesType;
    });
  }, [searchTerm, selectedBrands, selectedTypes]);

  const handleCopyToClipboard = async (component: Component) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(component.image);
      const blob = await response.blob();

      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);

      toast.success("Image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image:", error);
      toast.error("Failed to copy image to clipboard");
    }
  };

  const handleDownload = (component: Component) => {
    const link = document.createElement("a");
    link.href = component.image;
    link.download = `${component.name.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("Download started!");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Component Library</h1>
          <p className="text-gray-400">
            Browse and download high-quality images of CPUs and GPUs
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

          <FilterSection
            selectedBrands={selectedBrands}
            selectedTypes={selectedTypes}
            onBrandChange={setSelectedBrands}
            onTypeChange={setSelectedTypes}
            totalComponents={allComponents.length}
            filteredComponents={filteredComponents.length}
          />
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredComponents.map((component) => (
            <ComponentCard
              key={component.id}
              component={component}
              onCopyToClipboard={() => handleCopyToClipboard(component)}
              onDownload={() => handleDownload(component)}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No components found matching your criteria
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
