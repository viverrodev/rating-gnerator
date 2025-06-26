import React, { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search, X, Download } from "lucide-react";

interface Option {
  id: string;
  name: string;
  brand: string;
  image: string;
}

interface DropdownProps {
  label: string;
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
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

  const handleSelect = (option: Option | null) => {
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

  const handleDownload = (option: Option, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation(); // Prevent dropdown selection when clicking download in list
    }

    // Create a temporary anchor element to trigger download
    const link = document.createElement("a");
    link.href = option.image;
    link.download = `${option.name.replace(/\s+/g, "_")}.png`; // Replace spaces with underscores
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectedDownload = () => {
    if (value) {
      handleDownload(value);
    }
  };

  return (
    <div className="space-y-3">
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
            <div className="max-h-128 overflow-y-auto">
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
                  <div
                    key={option.id}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-600 text-white border-b border-gray-600 last:border-b-0"
                  >
                    <button
                      onClick={() => handleSelect(option)}
                      className="flex items-center gap-3 flex-1 text-left"
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

                    <button
                      onClick={(e) => handleDownload(option, e)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-500 rounded transition-colors ml-2"
                      title={`Download ${option.name}`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-400">
                  No results found for &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Download Selected Button */}
      {value && (
        <button
          onClick={handleSelectedDownload}
          className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download {value.name}
        </button>
      )}

      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-0" onClick={handleClose} />}
    </div>
  );
};
