import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import TaskCard from "../TaskCard/TaskCard";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SearchFilters from "../SearchFilters/SearchFilters";

const BrowseTasks = () => {
  const products = useLoaderData();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: 'All',
    university: 'All',
    minPrice: '',
    maxPrice: ''
  });

  // Apply filters whenever filters state changes
  useEffect(() => {
    let filtered = [...products];

    // Apply search query filter
    if (filters.searchQuery) {
      const searchTerm = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }

    // Apply university filter
    if (filters.university !== 'All') {
      filtered = filtered.filter(product => 
        product.university === filters.university
      );
    }

    // Apply price range filter
    if (filters.minPrice !== '') {
      filtered = filtered.filter(product => 
        parseFloat(product.price) >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice !== '') {
      filtered = filtered.filter(product => 
        parseFloat(product.price) <= parseFloat(filters.maxPrice)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <>
      {/* Centered Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search listings..."
              className={`input w-full pl-10 h-12 text-lg border-2 focus:outline-none focus:border-primary bg-base-100 ${
                isSearchFocused ? 'border-primary' : 'border-gray-200'
              }`}
              value={filters.searchQuery || ''}
              onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            {!isSearchFocused && (
              <FaSearch 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary transition-opacity duration-200"
                size={20}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <div className="md:col-span-1">
            <SearchFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </div>

          {/* Products grid */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <TaskCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center bg-secondary rounded-xl py-24 gap-10">
                <p className="font-extrabold text-3xl text-center px-4">
                  {filters.searchQuery 
                    ? `No items found matching "${filters.searchQuery}"`
                    : "No products match your filters..."}
                </p>
                <BsFillHeartbreakFill size={60} className="text-primary" />
                <button
                  onClick={() => setFilters({
                    searchQuery: '',
                    category: 'All',
                    university: 'All',
                    minPrice: '',
                    maxPrice: ''
                  })}
                  className="btn btn-primary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseTasks;
