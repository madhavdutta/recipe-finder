import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import RecipeCard from './RecipeCard'

const RecipeGrid = ({ recipes, favorites, onRecipeClick, onToggleFavorite }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  if (recipes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto">
          <div className="w-16 h-16 gradient-food rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
          <p className="text-gray-600">Try adjusting your search or filters to find more recipes.</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {recipes.map((recipe, index) => (
        <motion.div
          key={recipe.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <RecipeCard
            recipe={recipe}
            isFavorite={favorites.has(recipe.id)}
            onClick={() => onRecipeClick(recipe)}
            onToggleFavorite={() => onToggleFavorite(recipe.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default RecipeGrid
