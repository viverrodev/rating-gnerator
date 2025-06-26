import React from "react";

interface ImageSizeControlsProps {
  cpuSize: number;
  gpuSize: number;
  cpuRotation: number;
  gpuRotation: number;
  cpuPosition: { top: number; left: number; right: number; bottom: number };
  gpuPosition: { top: number; left: number; right: number; bottom: number };
  onCpuSizeChange: (size: number) => void;
  onGpuSizeChange: (size: number) => void;
  onCpuRotationChange: (rotation: number) => void;
  onGpuRotationChange: (rotation: number) => void;
  onCpuPositionChange: (position: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  }) => void;
  onGpuPositionChange: (position: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  }) => void;
}

export const ImageSizeControls: React.FC<ImageSizeControlsProps> = ({
  cpuSize,
  gpuSize,
  cpuRotation,
  gpuRotation,
  cpuPosition,
  gpuPosition,
  onCpuSizeChange,
  onGpuSizeChange,
  onCpuRotationChange,
  onGpuRotationChange,
  onCpuPositionChange,
  onGpuPositionChange,
}) => {
  const sizes = {
    max: 1000,
    min: -1000,
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CPU Controls */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-blue-400">CPU Controls</h4>

          {/* CPU Size */}
          <div className="space-y-2">
            <label className="text-white font-medium">Size</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={sizes.min}
                max={sizes.max}
                value={cpuSize}
                onChange={(e) => onCpuSizeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                min={sizes.min}
                max={sizes.max}
                value={cpuSize}
                onChange={(e) => onCpuSizeChange(Number(e.target.value))}
                className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
              />
              <span className="text-gray-400 text-sm">px</span>
            </div>
          </div>

          {/* CPU Rotation */}
          <div className="space-y-2">
            <label className="text-white font-medium">Rotation</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={sizes.min}
                max={sizes.max}
                value={cpuRotation}
                onChange={(e) => onCpuRotationChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                min={sizes.min}
                max={sizes.max}
                value={cpuRotation}
                onChange={(e) => onCpuRotationChange(Number(e.target.value))}
                className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
              />
              <span className="text-gray-400 text-sm">°</span>
            </div>
          </div>

          {/* CPU Position */}
          <div className="space-y-3">
            <label className="text-white font-medium">Position</label>

            {/* Top */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Top</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.top}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      top: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.top}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      top: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Left */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Left</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.left}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      left: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.left}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      left: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Right</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.right}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      right: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.right}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      right: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Bottom */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Bottom</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.bottom}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      bottom: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={cpuPosition.bottom}
                  onChange={(e) =>
                    onCpuPositionChange({
                      ...cpuPosition,
                      bottom: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>
          </div>
        </div>

        {/* GPU Controls */}
        <div className="space-y-4">
          <h4 className="text-md font-semibold text-green-400">GPU Controls</h4>

          {/* GPU Size */}
          <div className="space-y-2">
            <label className="text-white font-medium">Size</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={sizes.min}
                max={sizes.max}
                value={gpuSize}
                onChange={(e) => onGpuSizeChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                min={sizes.min}
                max={sizes.max}
                value={gpuSize}
                onChange={(e) => onGpuSizeChange(Number(e.target.value))}
                className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
              />
              <span className="text-gray-400 text-sm">px</span>
            </div>
          </div>

          {/* GPU Rotation */}
          <div className="space-y-2">
            <label className="text-white font-medium">Rotation</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={sizes.min}
                max={sizes.max}
                value={gpuRotation}
                onChange={(e) => onGpuRotationChange(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <input
                type="number"
                min={sizes.min}
                max={sizes.max}
                value={gpuRotation}
                onChange={(e) => onGpuRotationChange(Number(e.target.value))}
                className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
              />
              <span className="text-gray-400 text-sm">°</span>
            </div>
          </div>

          {/* GPU Position */}
          <div className="space-y-3">
            <label className="text-white font-medium">Position</label>

            {/* Top */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Top</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.top}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      top: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.top}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      top: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Left */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Left</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.left}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      left: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.left}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      left: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Right</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.right}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      right: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.right}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      right: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>

            {/* Bottom */}
            <div className="space-y-1">
              <label className="text-xs text-gray-400">Bottom</label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.bottom}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      bottom: Number(e.target.value),
                    })
                  }
                  className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="number"
                  min={sizes.min}
                  max={sizes.max}
                  value={gpuPosition.bottom}
                  onChange={(e) =>
                    onGpuPositionChange({
                      ...gpuPosition,
                      bottom: Number(e.target.value),
                    })
                  }
                  className="w-16 p-1 bg-gray-700 text-white rounded border border-gray-600 text-sm"
                />
                <span className="text-gray-400 text-xs">px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
