import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'

const SearchBar = ({ searchQuery, onSearchChange, onToggleFilters }) => {
  const [isFocused, setIsFocused] = useState(false)

  const suggestions = [
    'Pasta', 'Chicken', 'Vegetarian', 'Quick meals', 'Desserts', 'Healthy'
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <div className="glass-strong rounded-2xl p-6">
        <div className="relative">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                placeholder="Search recipes, ingredients, or cuisines..."
                className="w-full pl-12 pr-12 py-4 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-food-400 focus:border-transparent transition-all placeholder-gray-500"
              />
              {searchQuery && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onSearchChange('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gray-400 hover:bg-gray-500 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </motion.button>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleFilters}
              className="gradient-food p-4 rounded-xl text-white hover:shadow-lg transition-shadow"
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Search Suggestions */}
          {isFocused && !searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl p-4 z-10"
            >
              <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSearchChange(suggestion)}
                    className="px-3 py-1 bg-white/50 hover:bg-white/70 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchBar
