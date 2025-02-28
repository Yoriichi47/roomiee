"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  initialFilters?: {
    city?: string;
    state?: string;
    country?: string;
  };
}

const SearchBar: React.FC<SearchBarProps> = ({ initialFilters = {} }) => {
  const router = useRouter();
  const [filters, setFilters] = useState({
    city: initialFilters.city || "",
    state: initialFilters.state || "",
    country: initialFilters.country || "",
  });

  useEffect(() => {
    setFilters({
      city: initialFilters.city || "",
      state: initialFilters.state || "",
      country: initialFilters.country || "",
    });
  }, [initialFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters({ ...filters, [name]: checked });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (filters.city) params.append("city", filters.city);
    if (filters.state) params.append("state", filters.state);
    if (filters.country) params.append("country", filters.country);

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-lg mx-auto">
      <div className="w-full max-w-4xl mx-auto md:p-3 lg:p-6 bg-white rounded-lg border-2 border-gray-200 shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col gap-3">
          <div className="flex flex-col md:gap-2 lg:gap-3">
            <div className="flex md:gap-2 lg:gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={filters.city}
                  onChange={handleInputChange}
                  className="w-full md:px-2 lg:px-4 md:py-1 lg:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={filters.state}
                  onChange={handleInputChange}
                  className="w-full md:px-2 lg:px-4 md:py-1 lg:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={filters.country}
                  onChange={handleInputChange}
                  className="w-full md:px-2 lg:px-4 md:py-1 lg:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <div className="ml-auto flex gap-3">
          <button
            onClick={() => setFilters({ city: "", state: "", country: "" })}
            type="submit"
            className="md:px-2 lg:px-4 md:py-1 lg:py-2 bg-white text-blue-600 rounded-md border-blue-600 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Reset
          </button>
          <button
            type="submit"
            className="md:px-2 lg:px-4 md:py-1 lg:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Search
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
