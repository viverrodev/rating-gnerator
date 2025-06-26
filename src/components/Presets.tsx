import React from "react";

export interface PresetData {
  cpuSize: number;
  gpuSize: number;
  cpuRotation: number;
  gpuRotation: number;
  cpuPosition: { top: number; left: number; right: number; bottom: number };
  gpuPosition: { top: number; left: number; right: number; bottom: number };
}

interface PresetsProps {
  onPresetSelect: (preset: PresetData, presetName: string) => void;
  activePreset: string | null;
}

const presets: { name: string; data: PresetData }[] = [
  {
    name: "Default",
    data: {
      cpuSize: 520,
      gpuSize: 520,
      cpuRotation: -2,
      gpuRotation: 7,
      cpuPosition: { top: 33, left: 50, right: 0, bottom: 0 },
      gpuPosition: { top: 43, left: 410, right: 96, bottom: 19 },
    },
  },
  {
    name: "Bigger",
    data: {
      cpuSize: 614,
      gpuSize: 614,
      cpuRotation: -8,
      gpuRotation: 354,
      cpuPosition: { top: -20, left: -53, right: 0, bottom: 0 },
      gpuPosition: { top: 19, left: 376, right: 116, bottom: 19 },
    },
  },
  {
    name: "Close Bigger",
    data: {
      cpuSize: 614,
      gpuSize: 614,
      cpuRotation: -8,
      gpuRotation: 354,
      cpuPosition: { top: -20, left: -53, right: 0, bottom: 0 },
      gpuPosition: { top: 19, left: 300, right: 116, bottom: 19 },
    },
  },
];

export const Presets: React.FC<PresetsProps> = ({
  onPresetSelect,
  activePreset,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-white mb-4">Presets</h3>

      <div className="grid grid-cols-3 gap-3">
        {presets.map((preset) => {
          const isActive = activePreset === preset.name;
          return (
            <button
              key={preset.name}
              onClick={() => onPresetSelect(preset.data, preset.name)}
              className={`px-4 py-3 rounded-lg transition-all font-medium ${
                isActive
                  ? "bg-blue-600 text-white border-2 border-blue-400 shadow-lg scale-105"
                  : "bg-gray-700 hover:bg-gray-600 text-white border-2 border-transparent"
              }`}
            >
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
