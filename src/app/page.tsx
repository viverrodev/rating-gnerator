"use client";

import React, { useState } from "react";
import {
  Dropdown,
  ImagePreview,
  ImageSizeControls,
  RatingSelector,
  GradientBackground,
  Presets,
  Rating,
  PresetData,
} from "@/components";
import { cpuData, gpuData } from "@/data";

interface ComponentOption {
  id: string;
  name: string;
  brand: string;
  image: string;
}

const App = () => {
  const [selectedCPU, setSelectedCPU] = useState<ComponentOption | null>(null);
  const [selectedGPU, setSelectedGPU] = useState<ComponentOption | null>(null);

  const [cpuImageSize, setCpuImageSize] = useState(520);
  const [gpuImageSize, setGpuImageSize] = useState(520);

  const [cpuRotation, setCpuRotation] = useState(-2);
  const [gpuRotation, setGpuRotation] = useState(7);

  const [cpuPosition, setCpuPosition] = useState({
    top: 33,
    left: 50,
    right: 0,
    bottom: 0,
  });
  const [gpuPosition, setGpuPosition] = useState({
    top: 43,
    left: 410,
    right: 96,
    bottom: 19,
  });

  // Rating state - default to B tier
  const [selectedRating, setSelectedRating] = useState<Rating>("B");

  // Active preset state - default starts as "Default"
  const [activePreset, setActivePreset] = useState<string | null>("Default");

  // Apply preset function
  const applyPreset = (preset: PresetData, presetName: string) => {
    setCpuImageSize(preset.cpuSize);
    setGpuImageSize(preset.gpuSize);
    setCpuRotation(preset.cpuRotation);
    setGpuRotation(preset.gpuRotation);
    setCpuPosition(preset.cpuPosition);
    setGpuPosition(preset.gpuPosition);
    setActivePreset(presetName);
  };

  // Function to clear active preset when manual changes are made
  const clearActivePreset = () => {
    setActivePreset(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex gap-8 w-full">
        <div className="w-full">
          {/* Rating Selector */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Dropdown
              label="Select CPU"
              options={cpuData}
              value={selectedCPU}
              onChange={setSelectedCPU}
              placeholder="Choose a CPU..."
            />

            <Dropdown
              label="Select GPU"
              options={gpuData}
              value={selectedGPU}
              onChange={setSelectedGPU}
              placeholder="Choose a GPU..."
            />
          </div>

          {/* Preview Box with Gradient Background */}
          {(selectedCPU || selectedGPU) && (
            <GradientBackground
              rating={selectedRating}
              className="rounded-lg shadow-xl relative"
              style={{ minHeight: "600px" }}
            >
              {selectedCPU && (
                <ImagePreview
                  item={selectedCPU}
                  size={cpuImageSize}
                  rotation={cpuRotation}
                  position={cpuPosition}
                />
              )}

              {selectedGPU && (
                <ImagePreview
                  item={selectedGPU}
                  size={gpuImageSize}
                  rotation={gpuRotation}
                  position={gpuPosition}
                />
              )}
            </GradientBackground>
          )}
        </div>

        {/* RIGHT SIDE - Image Controls */}
        <div className="w-full">
          {/* Presets */}
          <RatingSelector
            selectedRating={selectedRating}
            onRatingChange={setSelectedRating}
          />
          <ImageSizeControls
            cpuSize={cpuImageSize}
            gpuSize={gpuImageSize}
            cpuRotation={cpuRotation}
            gpuRotation={gpuRotation}
            cpuPosition={cpuPosition}
            gpuPosition={gpuPosition}
            onCpuSizeChange={(size) => {
              setCpuImageSize(size);
              clearActivePreset();
            }}
            onGpuSizeChange={(size) => {
              setGpuImageSize(size);
              clearActivePreset();
            }}
            onCpuRotationChange={(rotation) => {
              setCpuRotation(rotation);
              clearActivePreset();
            }}
            onGpuRotationChange={(rotation) => {
              setGpuRotation(rotation);
              clearActivePreset();
            }}
            onCpuPositionChange={(position) => {
              setCpuPosition(position);
              clearActivePreset();
            }}
            onGpuPositionChange={(position) => {
              setGpuPosition(position);
              clearActivePreset();
            }}
          />
          <Presets onPresetSelect={applyPreset} activePreset={activePreset} />
        </div>
      </div>
    </div>
  );
};

export default App;
