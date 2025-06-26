import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search, X } from "lucide-react";

interface DropdownProps {
  label: string;
  options: Array<{ id: string; name: string; brand: string; image: string }>;
  value: any;
  onChange: (value: any) => void;
  placeholder: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleSelect = (option: any) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleOpen = () => {
    setIsOpen(true);
    setSearchTerm("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const getBrandIcon = (brand: string) => {
    if (brand === "intel") {
      return `/icons/${brand}.png`;
    } else if (brand === "amd") {
      return `/icons/${brand}.png`;
    }
    return `/icons/${brand}.svg`;
  };

  return (
    <div>
      <label className="text-white font-medium">{label}</label>

      <div className="relative z-100">
        {/* Dropdown Button */}
        <button
          onClick={handleOpen}
          className="w-full p-3 hover:bg-gray-700 transition-all duration-100 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {value ? (
              <>
                <Image
                  src={getBrandIcon(value.brand)}
                  alt={value.brand}
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                />
                <span>{value.name}</span>
              </>
            ) : (
              <span className="text-gray-400">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-4  border border-gray-600 rounded-lg bg-black shadow-lg">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-600">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-gray-600 text-white rounded border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {/* Clear Selection Option */}
              {!searchTerm && (
                <button
                  onClick={() => handleSelect(null)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-600 text-gray-400 border-b border-gray-600"
                >
                  {placeholder}
                </button>
              )}

              {/* Filtered Options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-600 text-white border-b border-gray-600 last:border-b-0 flex items-center gap-3"
                  >
                    <Image
                      src={getBrandIcon(option.brand)}
                      alt={option.brand}
                      width={20}
                      height={20}
                      className="flex-shrink-0"
                    />
                    <span>{option.name}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-400">
                  No results found for "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={handleClose} />}
    </div>
  );
};
