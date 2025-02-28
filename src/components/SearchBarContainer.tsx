import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FiAlignJustify } from "react-icons/fi";

interface SearchBarProps {
  initialFilters?: {
    city?: string;
    state?: string;
    country?: string; 
  };
}

const SearchBarContainer = ({ initialFilters }: SearchBarProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div className="container mx-auto md:px-2 w-[70%]">
      <div className="flex md:flex-col-reverse mt-2 gap-2">
        <div
          className={`
          overflow-hidden w-full transition-all duration-500 ease-in-out
          ${showSearchBar ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          <SearchBar initialFilters={initialFilters} />
        </div>
        <div className="md:w-full md:flex">
          <button
            onClick={() => setShowSearchBar(!showSearchBar)}
            className="font-semibold md:p-2 lg:p-4 md:ml-auto bg-gray-100 hover:bg-gray-200 border-2 border-gray-400 duration-200 transition-all rounded-full"
          >
            <FiAlignJustify />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBarContainer;