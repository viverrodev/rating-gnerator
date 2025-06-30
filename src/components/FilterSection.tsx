import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";

interface FilterSectionProps {
  selectedBrands: string[];
  selectedTypes: string[];
  onBrandChange: (brands: string[]) => void;
  onTypeChange: (types: string[]) => void;
  totalComponents: number;
  filteredComponents: number;
}

const brands = [
  { id: "nvidia", name: "NVIDIA", color: "bg-green-600" },
  { id: "amd", name: "AMD", color: "bg-red-600" },
  { id: "intel", name: "Intel", color: "bg-blue-600" },
];

const types = [
  { id: "gpu", name: "GPU", color: "bg-purple-600" },
  { id: "cpu", name: "CPU", color: "bg-orange-600" },
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedBrands,
  selectedTypes,
  onBrandChange,
  onTypeChange,
  totalComponents,
  filteredComponents,
}) => {
  const toggleBrand = (brandId: string) => {
    if (selectedBrands.includes(brandId)) {
      onBrandChange(selectedBrands.filter((id) => id !== brandId));
    } else {
      onBrandChange([...selectedBrands, brandId]);
    }
  };

  const toggleType = (typeId: string) => {
    if (selectedTypes.includes(typeId)) {
      onTypeChange(selectedTypes.filter((id) => id !== typeId));
    } else {
      onTypeChange([...selectedTypes, typeId]);
    }
  };

  const clearAllFilters = () => {
    onBrandChange([]);
    onTypeChange([]);
  };

  const hasActiveFilters =
    selectedBrands.length > 0 || selectedTypes.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300 font-medium">Filters</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">
            {filteredComponents} of {totalComponents} components
          </span>
        </div>
      </div>

      <div className="flex w-full justify-between items-center gap-4">
        <div className="flex items-center justify-center gap-10">
          {/* Brand Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-300">Brands</span>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => (
                <Badge
                  key={brand.id}
                  variant={
                    selectedBrands.includes(brand.id) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all hover:scale-105 p-3 ${
                    selectedBrands.includes(brand.id)
                      ? `${brand.color} text-white`
                      : "border-gray-600 text-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => toggleBrand(brand.id)}
                >
                  {brand.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-300">Types</span>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <Badge
                  key={type.id}
                  variant={
                    selectedTypes.includes(type.id) ? "default" : "outline"
                  }
                  className={`cursor-pointer transition-all hover:scale-105 p-3 ${
                    selectedTypes.includes(type.id)
                      ? `${type.color} text-white`
                      : "border-gray-600 text-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() => toggleType(type.id)}
                >
                  {type.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        {hasActiveFilters && (
          <Button
            onClick={clearAllFilters}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-black cursor-pointer"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
};
