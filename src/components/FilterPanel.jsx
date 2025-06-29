import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const FilterPanel = ({ activeFilters, onFilterChange }) => {
  const filterOptions = {
    cuisine: ['Italian', 'Asian', 'Mexican', 'Mediterranean', 'American', 'Indian'],
    diet: ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Low-Carb'],
    difficulty: ['Easy', 'Medium', 'Hard'],
    time: [
      { value: 'quick', label: 'Under 30 min' },
      { value: 'medium', label: '30-60 min' },
      { value: 'long', label: 'Over 1 hour' }
    ]
  }

  const updateFilter = (category, value) => {
    onFilterChange(prev => ({
      ...prev,
      [category]: prev[category] === value ? '' : value
    }))
  }

  const clearAllFilters = () => {
    onFilterChange({
      cuisine: '',
      diet: '',
      difficulty: '',
      time: ''
    })
  }

  const hasActiveFilters = Object.values(activeFilters).some(filter => filter !== '')

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-strong rounded-2xl p-6 mt-4"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        {hasActiveFilters && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFilters}
            className="text-sm text-food-600 hover:text-food-700 font-medium"
          >
            Clear All
          </motion.button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category}>
            <h4 className="text-sm font-medium text-gray-700 mb-3 capitalize">
              {category === 'time' ? 'Cooking Time' : category}
            </h4>
            <div className="space-y-2">
              {options.map((option) => {
                const value = typeof option === 'object' ? option.value : option
                const label = typeof option === 'object' ? option.label : option
                const isActive = activeFilters[category] === value

                return (
                  <motion.button
                    key={value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateFilter(category, value)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'gradient-food text-white shadow-md'
                        : 'bg-white/50 hover:bg-white/70 text-gray-700'
                    }`}
                  >
                    {label}
                  </motion.button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default FilterPanel
