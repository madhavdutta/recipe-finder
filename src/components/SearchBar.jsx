import React from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import PandaIcon from './PandaIcon'

const SearchBar = ({ searchQuery, onSearchChange, onToggleFilters }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="relative"
    >
      <div className="glass rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for recipes, ingredients, or cuisines..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-food-400 focus:border-transparent placeholder-gray-500 text-gray-800 font-medium"
            />
            {searchQuery && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <PandaIcon className="w-5 h-5 text-food-500" />
              </motion.div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleFilters}
            className="glass-strong p-4 rounded-xl hover:bg-white/20 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5 text-gray-700" />
          </motion.button>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {['Italian', 'Quick & Easy', 'Vegetarian', 'Desserts'].map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSearchChange(tag)}
              className="px-4 py-2 bg-white/30 hover:bg-white/40 rounded-full text-sm font-medium text-gray-700 transition-colors"
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default SearchBar
