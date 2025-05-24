import React from 'react';
import './SearchFilters.css';

const SearchFilters = ({ filters, onFilterChange }) => {
  const categories = [
    'All',
    'Books',
    'Electronics',
    'Accessories',
    'Other'
  ];

  const universities = [
    'All',
    'Islamic University of Technology',
    'University of Dhaka',
    'Bangladesh University of Engineering and Technology',
    'Other Universities'
  ];

  return (
    <div className="search-filters bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          className="select select-bordered w-full"
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* University Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          University
        </label>
        <select
          className="select select-bordered w-full"
          value={filters.university}
          onChange={(e) => onFilterChange('university', e.target.value)}
        >
          {universities.map((university) => (
            <option key={university} value={university}>
              {university}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range ($)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="input input-bordered w-full"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            min="0"
          />
          <input
            type="number"
            placeholder="Max"
            className="input input-bordered w-full"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            min="0"
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        className="btn btn-outline btn-primary w-full mt-4"
        onClick={() => {
          onFilterChange('category', 'All');
          onFilterChange('university', 'All');
          onFilterChange('minPrice', '');
          onFilterChange('maxPrice', '');
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default SearchFilters; 