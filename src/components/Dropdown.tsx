import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Download, Search, X, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;

    return options.filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        option.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  // Reset highlighted index when filtered options change
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [filteredOptions]);

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
      event.stopPropagation();
    }

    const link = document.createElement("a");
    link.href = option.image;
    link.download = `${option.name.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSelectedDownload = () => {
    if (value) {
      handleDownload(value);
    }
  };

  const handleOptionSelect = (option: Option | null) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
      setHighlightedIndex(-1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const allItems = !searchTerm ? [null, ...filteredOptions] : filteredOptions;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === -1) return 0; // First press goes to index 0
          return prev < allItems.length - 1 ? prev + 1 : 0;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === -1) return allItems.length - 1; // First press goes to last item
          return prev > 0 ? prev - 1 : allItems.length - 1;
        });
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < allItems.length) {
          const selectedItem = allItems[highlightedIndex];
          handleOptionSelect(selectedItem);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
        break;
    }
  };

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && isOpen) {
      const optionElement = document.querySelector(
        `[data-option-index="${highlightedIndex}"]`
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="z-100">
      <label className="text-white font-medium">{label}</label>

      <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
        {/* Custom Trigger */}
        <button
          type="button"
          onClick={handleTriggerClick}
          className="w-full p-3 bg-transparent hover:bg-gray-700 transition-all duration-100 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
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
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Custom Dropdown Content */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-black border border-gray-600 rounded-lg shadow-lg max-h-[500px] overflow-hidden z-50">
            {/* Search Input */}
            <div className="p-3 border-b border-gray-600">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 text-white rounded border bg-black border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  autoFocus
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Options Container */}
            <div className="max-h-96 overflow-y-auto">
              {/* Clear Selection Option */}
              {!searchTerm && (
                <button
                  type="button"
                  data-option-index="0"
                  onClick={() => handleOptionSelect(null)}
                  className={`w-full px-4 py-2 text-left text-gray-400 focus:outline-none ${
                    highlightedIndex === 0 ? "bg-gray-600" : "hover:bg-gray-600"
                  }`}
                >
                  {placeholder}
                </button>
              )}

              {/* Filtered Options */}
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => {
                  const itemIndex = !searchTerm ? index + 1 : index;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      data-option-index={itemIndex}
                      onClick={() => handleOptionSelect(option)}
                      className={`w-full px-4 py-2 text-left focus:outline-none text-white flex items-center gap-2 ${
                        highlightedIndex === itemIndex
                          ? "bg-gray-800"
                          : "hover:bg-gray-800"
                      }`}
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
                  );
                })
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
        <Button
          type="button"
          onClick={handleSelectedDownload}
          className="w-full p-2 bg-blue-600 mt-4 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4" />
          Download {value.name}
        </Button>
      )}
    </div>
  );
};
